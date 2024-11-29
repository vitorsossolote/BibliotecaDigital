import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    StyleSheet, 
    TouchableOpacity, 
    ActivityIndicator, 
    Alert,
    Modal,
    TextInput
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoanManagement() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [stateUpdateModalVisible, setStateUpdateModalVisible] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);

    const { authLibrarianData } = useAuth();

    // Update loan state and rating
    const updateLoanStateAndRating = async (novoEstado, avaliacao = null) => {
        if (!selectedLoan) {
            Alert.alert('Erro', 'Nenhum empréstimo selecionado');
            return;
        }

        // Validation for rating when concluding loan
        if (novoEstado === 'concluído' && (!avaliacao || avaliacao < 1 || avaliacao > 5)) {
            Alert.alert('Erro', 'Por favor, insira uma avaliação válida entre 1 e 5');
            return;
        }

        try {
            const response = await axios.put(
                `http://10.0.2.2:8085/api/emprestimo/${selectedLoan.emprestimo_id}/atualizarEstado`, 
                { 
                    novo_estado: novoEstado,
                    avaliacao: novoEstado === 'concluído' ? avaliacao : undefined
                },
                {
                    headers: {
                        Authorization: `Bearer ${authLibrarianData?.librarianToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Update local state
            const updatedLoans = loans.map(loan => 
                loan.emprestimo_id === selectedLoan.emprestimo_id 
                    ? { ...loan, estado: novoEstado } 
                    : loan
            );
            
            setLoans(updatedLoans);
            
            // Close modals and reset
            setStateUpdateModalVisible(false);
            setRatingModalVisible(false);
            setSelectedLoan(null);

            Alert.alert('Sucesso', response.data.msg);
        } catch (err) {
            console.error('Erro ao atualizar estado:', err.response?.data || err);
            Alert.alert(
                'Erro', 
                err.response?.data?.msg || 'Não foi possível atualizar o estado do empréstimo'
            );
        }
    };

    const renderStateUpdateModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={stateUpdateModalVisible}
            onRequestClose={() => setStateUpdateModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Atualizar Estado do Empréstimo</Text>
                    
                    {['ativo', 'concluído', 'atrasado'].map(estado => (
                        <TouchableOpacity 
                            key={estado}
                            style={styles.sortOption}
                            onPress={() => {
                                // If concluding loan, show rating modal
                                if (estado === 'concluído') {
                                    setStateUpdateModalVisible(false);
                                    setRatingModalVisible(true);
                                } else {
                                    updateLoanStateAndRating(estado);
                                }
                            }}
                        >
                            <Text style={styles.sortOptionText}>{estado}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity 
                        style={styles.modalCloseButton}
                        onPress={() => setStateUpdateModalVisible(false)}
                    >
                        <Text style={styles.modalCloseButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    const renderRatingModal = () => {
        const [rating, setRating] = useState('');

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={ratingModalVisible}
                onRequestClose={() => setRatingModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Avaliar Empréstimo</Text>
                        
                        <TextInput 
                            style={styles.ratingInput}
                            placeholder="Insira a avaliação (1-5)"
                            keyboardType="numeric"
                            value={rating}
                            onChangeText={setRating}
                            maxLength={1}
                        />

                        <TouchableOpacity 
                            style={styles.modalSubmitButton}
                            onPress={() => {
                                const ratingValue = parseInt(rating);
                                if (ratingValue >= 1 && ratingValue <= 5) {
                                    updateLoanStateAndRating('concluído', ratingValue);
                                } else {
                                    Alert.alert('Erro', 'Por favor, insira uma avaliação entre 1 e 5');
                                }
                            }}
                        >
                            <Text style={styles.modalCloseButtonText}>Adicionar Avaliação</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.modalCloseButton}
                            onPress={() => setRatingModalVisible(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    const renderLoanItem = ({ item }) => {
        const getStateColor = (state) => {
            switch(state) {
                case 'ativo': return '#2196F3';
                case 'concluído': return '#4CAF50';
                case 'atrasado': return '#F44336';
                default: return '#9E9E9E';
            }
        };

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('pt-BR');
        };

        return (
            <TouchableOpacity 
                style={styles.loanItem}
                onPress={() => {
                    setSelectedLoan(item);
                    Alert.alert(
                        'Opções do Empréstimo',
                        'Escolha uma ação:',
                        [
                            {
                                text: 'Atualizar Estado',
                                onPress: () => setStateUpdateModalVisible(true)
                            },
                            { text: 'Cancelar', style: 'cancel' }
                        ]
                    );
                }}
            >
                <View style={styles.loanHeader}>
                    <Text style={styles.loanId}>Empréstimo #{item.emprestimo_id}</Text>
                    <View 
                        style={[
                            styles.stateIndicator, 
                            { backgroundColor: getStateColor(item.estado) }
                        ]}
                    >
                        <Text style={styles.stateText}>{item.estado}</Text>
                    </View>
                </View>
                <View style={styles.loanDetails}>
                    <Text>Livro ID: {item.livro_id}</Text>
                    <Text>Aluno RM: {item.user_rm}</Text>
                    <Text>Empréstimo: {formatDate(item.data_emprestimo)}</Text>
                    <Text>Devolução: {formatDate(item.data_devolucao)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    // Fetch loans on component mount
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://10.0.2.2:8085/api/emprestimo/listEmprestimo', {
                    headers: {
                        Authorization: `Bearer ${authLibrarianData?.librarianToken}`
                    }
                });
                
                setLoans(response.data);
                setError(null);
            } catch (err) {
                console.error('Erro ao buscar empréstimos:', err);
                setError('Não foi possível carregar os empréstimos');
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    // Rendering logic
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empréstimos Registrados</Text>

            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Carregando empréstimos...</Text>
                </View>
            ) : error ? (
                <View style={styles.centered}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : (
                <FlatList
                    data={loans}
                    keyExtractor={(item) => item.emprestimo_id.toString()}
                    renderItem={renderLoanItem}
                    contentContainerStyle={styles.listContent}
                />
            )}

            {renderStateUpdateModal()}
            {renderRatingModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    },
    loanItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    loanHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    loanId: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    stateIndicator: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    stateText: {
        color: 'white',
        fontSize: 12,
        textTransform: 'capitalize',
    },
    loanDetails: {
        marginTop: 5,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    retryButton: {
        backgroundColor: '#ee2d32',
        padding: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    sortButton: {
        padding: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    sortOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    sortOptionText: {
        fontSize: 16,
    },
    modalCloseButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },
    modalCloseButtonText: {
        textAlign: 'center',
        color: '#ee2d32',
        fontWeight: 'bold',
    },
    ratingInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 5,
        padding: 10,
        marginVertical: 15,
        textAlign: 'center',
        fontSize: 16,
    },
    modalSubmitButton: {
        backgroundColor: '#ee2d32',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});
