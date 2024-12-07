import React, { useState, useEffect } from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    Image
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native"
import { MoveLeft } from "lucide-react-native";
import axios from 'axios';
// Componentes Utilizados
import MainHeader from "../../components/MainHeader";
import { useAuth } from '../../contexts/AuthContext'

export default function LoanHistory({ navigation }) {
    const { authData } = useAuth();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLoanHistory = async () => {
            if (!authData?.user?.rm) {
                setError('Usuário não autenticado');
                setLoading(false);
                return;
            }

            try {
                // Buscar todos os empréstimos pelo rm
                const loansResponse = await axios.get(`http://10.0.2.2:8085/api/emprestimo/listEmprestimo/${authData.user.rm}`);

                // Detalhes de cada livro emprestado
                const loansWithBookDetails = await Promise.all(
                    loansResponse.data.map(async (loan) => {
                        if (loan.livro_id) {
                            try {
                                // Fetch full book details using livro_id
                                const bookResponse = await axios.get(`http://10.0.2.2:8085/api/listBooks/${loan.livro_id}`);
                                return {
                                    ...loan,
                                    livro: bookResponse.data // Replace or augment existing book info
                                };
                            } catch (bookError) {
                                console.error(`Error fetching book details for loan ${loan.id}:`, bookError);
                                return loan; // Return original loan if book fetch fails
                            }
                        }
                        return loan;
                    })
                );

                // Ordenar empréstimos por data (menor primeiro)
                const sortedLoans = loansWithBookDetails.sort((a, b) =>
                    new Date(b.data_emprestimo) - new Date(a.data_emprestimo)
                );

                setLoans(sortedLoans);
                setLoading(false);
            } catch (err) {
                console.error('Erro ao buscar histórico de empréstimos:', err);
                setError('Não foi possível carregar o histórico de empréstimos');
                setLoading(false);
            }
        };

        fetchLoanHistory();
    }, [authData]);

    // Função para formatar a data
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Função para determinar a cor dos status
    const getStatusColor = (status) => {
        switch (status) {
            case 'concluído': return '#4CAF50';
            case 'atrasado': return '#ee2d32';
            case 'ativo': return '#000';
            default: return '#000';
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <MainHeader
                        title="Histórico de Empréstimo"
                        icon1={MoveLeft}
                        onPress={() => navigation.navigate("Profile")}
                        marginRight={10}
                    />
                </View>
                {loans.length === 0 ? (
                    <View style={styles.noLoansContainer}>
                        <Text style={styles.noLoansText}>Nenhum empréstimo encontrado</Text>
                    </View>
                ) : (
                    <View style={styles.contentContainer}>
                        {/* Empréstimo por meses */}
                        {Object.entries(
                            loans.reduce((acc, loan) => {
                                const monthYear = new Date(loan.data_emprestimo).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
                                if (!acc[monthYear]) acc[monthYear] = [];
                                acc[monthYear].push(loan);
                                return acc;
                            }, {})
                        ).map(([monthYear, monthLoans]) => (
                            <View key={monthYear} style={styles.loanContainer}>
                                <Text style={styles.monthText}>{monthYear}</Text>
                                <View style={styles.loanSection}>
                                    {monthLoans.map((loan, index) => (
                                        <React.Fragment key={loan.id}>
                                            <View style={styles.loanDetailsContainer}>
                                                <Image
                                                    source={{ uri: loan.image }}
                                                    style={styles.loanImage}
                                                />
                                                <View style={styles.loanDetailsTextContainer}>
                                                    <Text style={styles.loanDetailsText}>
                                                        {`Dia ${new Date(loan.data_emprestimo).getDate()} | ${loan.titulo}`}
                                                    </Text>
                                                    <View style={styles.loanStatus}>
                                                        <Text
                                                            style={[
                                                                styles.loanStatusText,
                                                                { color: getStatusColor(loan.estado) }
                                                            ]}
                                                        >
                                                            {loan.estado}
                                                        </Text>
                                                        <Text style={styles.loanItems}> • 1 item</Text>

                                                    </View>
                                                    <Text
                                                        style={{
                                                            color: loan.estado === 'concluído'
                                                                ? '#4CAF50' 
                                                                : '#ee2d32'
                                                        }}
                                                    >
                                                        {loan.estado === 'concluído'
                                                            ? 'Devolvido'
                                                            : `Devolver ${formatDate(loan.data_devolucao)}`
                                                        }
                                                    </Text>
                                                </View>
                                            </View>
                                            {index < monthLoans.length - 1 && (
                                                <View style={{ height: 1.5, width: "100%", backgroundColor: "#e6e6e6" }} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
        alignItems: "center"
    },
    headerContainer: {
        marginTop: 15,
    },
    contentContainer: {
        padding: 35
    },
    loanContainer: {

    },
    monthText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 20,
    },
    loanSection: {
        marginTop: 20,
        borderWidth: 1.5,
        borderColor: "#e6e6e6",
        borderRadius: 10,
        padding: 15,
        gap: 20
    },
    loanDetailsContainer: {
        flexDirection: 'row',
    },
    loanImage: {
        width: 80,
        height: 100,
        borderRadius: 10
    },
    loanDetailsTextContainer: {
        marginLeft: 20,
        gap: 8,
        top: 5,
    },
    loanStatus: {
        flexDirection: "row"
    },
    loanDetailsText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold"
    },
    loanStatusText: {
        color: "#34A853",
        fontWeight: "700"
    },
    loanItems: {
        fontWeight: "bold"
    },
    errorText: {
        textAlign: 'center',
        color: '#ee2d32',
        marginTop: 20,
        fontSize: 16,
    },
    noLoansContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    noLoansText: {
        fontSize: 18,
        color: '#888',
    },
});