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
    RefreshControl
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path as needed
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoanManagement() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [sortCriteria, setSortCriteria] = useState({
        field: 'data_emprestimo', // default sort
        direction: 'desc' // default descending
    });

    const { authLibrarianData } = useAuth();

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://10.0.2.2:8085/api/emprestimo/listEmprestimo', {
                headers: {
                    Authorization: `Bearer ${authLibrarianData?.librarianToken}`
                }
            });
            
            // Sort loans based on current criteria
            const sortedLoans = sortLoans(response.data, sortCriteria);

            setLoans(sortedLoans);
            setError(null);
        } catch (err) {
            console.error('Erro ao buscar empréstimos:', err);
            setError('Não foi possível carregar os empréstimos');
            Alert.alert('Erro', 'Não foi possível carregar os empréstimos');
        } finally {
            setLoading(false);
        }
    };

    // Sorting function
    const sortLoans = (loansToSort, criteria) => {
        return [...loansToSort].sort((a, b) => {
            const valueA = new Date(a[criteria.field]);
            const valueB = new Date(b[criteria.field]);
            
            return criteria.direction === 'asc' 
                ? valueA - valueB 
                : valueB - valueA;
        });
    };

    // Update sorting and re-fetch
    const handleSorting = (field) => {
        const newDirection = 
            sortCriteria.field === field && sortCriteria.direction === 'desc' 
                ? 'asc' 
                : 'desc';

        const newSortCriteria = { field, direction: newDirection };
        
        setSortCriteria(newSortCriteria);
        
        // Re-sort existing loans
        const sortedLoans = sortLoans(loans, newSortCriteria);
        setLoans(sortedLoans);
        
        // Close modal
        setSortModalVisible(false);
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    const renderSortModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={sortModalVisible}
            onRequestClose={() => setSortModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Ordenar por</Text>
                    
                    {/* Sort by Loan Date */}
                    <TouchableOpacity 
                        style={styles.sortOption}
                        onPress={() => handleSorting('data_emprestimo')}
                    >
                        <Text style={styles.sortOptionText}>Data de Empréstimo</Text>
                        {sortCriteria.field === 'data_emprestimo' && (
                            <Icon 
                                name={sortCriteria.direction === 'asc' 
                                    ? 'arrow-upward' 
                                    : 'arrow-downward'
                                } 
                                size={20} 
                                color="#2196F3" 
                            />
                        )}
                    </TouchableOpacity>

                    {/* Sort by Return Date */}
                    <TouchableOpacity 
                        style={styles.sortOption}
                        onPress={() => handleSorting('data_devolucao')}
                    >
                        <Text style={styles.sortOptionText}>Data de Devolução</Text>
                        {sortCriteria.field === 'data_devolucao' && (
                            <Icon 
                                name={sortCriteria.direction === 'asc' 
                                    ? 'arrow-upward' 
                                    : 'arrow-downward'
                                } 
                                size={20} 
                                color="#2196F3" 
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.modalCloseButton}
                        onPress={() => setSortModalVisible(false)}
                    >
                        <Text style={styles.modalCloseButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
    const renderLoanItem = ({ item }) => {
        // Determine color based on loan state
        const getStateColor = (state) => {
            switch(state) {
                case 'ativo': return '#2196F3'; // Blue
                case 'concluído': return '#4CAF50'; // Green
                case 'atrasado': return '#F44336'; // Red
                default: return '#9E9E9E'; // Grey
            }
        };

        // Format date to Brazilian format
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('pt-BR');
        };

        return (
            <TouchableOpacity 
                style={styles.loanItem}
                onPress={() => {
                    // Optional: Navigate to loan details if needed
                    Alert.alert('Detalhes do Empréstimo', 
                        `ID: ${item.emprestimo_id}\n` +
                        `Livro ID: ${item.livro_id}\n` +
                        `Aluno RM: ${item.user_rm}\n` +
                        `Data Empréstimo: ${formatDate(item.data_emprestimo)}\n` +
                        `Data Devolução: ${formatDate(item.data_devolucao)}\n` +
                        `Estado: ${item.estado}`
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

    return (
        <View style={styles.container}>
            {/* Sorting Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Empréstimos Registrados</Text>
                <TouchableOpacity 
                    style={styles.sortButton}
                    onPress={() => setSortModalVisible(true)}
                >
                    <Icon name="sort" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Rest of the previous implementation */}
            {loading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Carregando empréstimos...</Text>
                </View>
            ) : error ? (
                <View style={styles.centered}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={fetchLoans} style={styles.retryButton}>
                        <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.listContainer}>
                    {loans.length === 0 ? (
                        <View style={styles.centered}>
                            <Text>Nenhum empréstimo encontrado</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={loans}
                            keyExtractor={(item) => item.emprestimo_id.toString()}
                            renderItem={renderLoanItem}
                            contentContainerStyle={styles.listContent}
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={fetchLoans}
                                />
                            }
                        />
                    )}
                </View>
            )}

            {renderSortModal()}
        </View>
    );
};

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
        backgroundColor: '#2196F3',
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
        color: '#2196F3',
        fontWeight: 'bold',
    },
});
