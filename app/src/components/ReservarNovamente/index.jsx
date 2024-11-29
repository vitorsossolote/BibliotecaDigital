import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
    Button,
    ButtonText,
    Image,
    Pressable
} from "@gluestack-ui/themed"
import { SafeAreaView } from 'moti';
import { FlatList } from 'react-native-gesture-handler';
import { useAuth } from "../../contexts/AuthContext";

const { width: screenWidth } = Dimensions.get('window');

type Props = {
    onPress: (livro: any) => void; 
}

export default function Reservar({ onPress }: Props) {
    const { user, buscarUltimoEmprestimoLivro } = useAuth();
    const [latestLoanBook, setLatestLoanBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestLoanBook = async () => {
            try {
                setLoading(true);
                
                console.log('Usuário atual:', user);
                
                if (user && user.rm) {
                    console.log('Buscando último empréstimo para RM:', user.rm);
                    
                    const book = await buscarUltimoEmprestimoLivro(user.rm);
                    
                    console.log('Livro do último empréstimo:', book);
                    
                    if (book) {
                        setLatestLoanBook(book);
                    } else {
                        console.log('Nenhum livro de empréstimo encontrado');
                    }
                } else {
                    console.log('Usuário ou RM não disponível');
                }
            } catch (err) {
                console.error('Erro ao buscar último empréstimo:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestLoanBook();
    }, [user]);

    const RenderItem = ({item}) => {
        return (
            <View style={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Reservar Novamente?</Text>
                    <Button 
                        style={styles.Button}
                        size="md"
                        variant="solid"
                        action="primary"
                        onPress={() => onPress(item)}
                    >
                        <ButtonText>Reservar Agora</ButtonText>
                    </Button>
                </View>
                <View style={styles.imageContainer}>
                    <Pressable onPress={() => onPress(item)}>
                        <Image 
                            style={styles.Image} 
                            source={
                                item.image 
                                    ? { uri: item.image } 
                                    : require('../../../assets/book2.png')
                            } 
                            alt="Último Livro Emprestado" 
                        />
                    </Pressable>
                </View>
            </View>
        );
    };

    // Renderização condicional baseada no estado
    if (loading) {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>Carregando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>Erro ao buscar empréstimo</Text>
                <Text>{error}</Text>
            </View>
        );
    }

    if (!latestLoanBook) {
        return (
            <View style={styles.card}>
                <Text style={styles.title}>Nenhum empréstimo encontrado</Text>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <FlatList
                data={[latestLoanBook]} 
                renderItem={RenderItem}
                keyExtractor={(item) => item.emprestimo_id?.toString() || 'default'}
                ListEmptyComponent={() => (
                    <View style={styles.card}>
                        <Text style={styles.title}>Nenhum empréstimo encontrado</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    card: {
        width: screenWidth - 40,
        marginHorizontal: 20,
        height: 160,
        flexDirection: 'row',
        backgroundColor: "#f3f3f3",
        borderRadius: 20,
        marginBottom: 15,
        right: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        width: 240,
        marginLeft: 20,
        padding: 15,
        paddingLeft: 23,
    },
    title: {
        fontSize: 24,
        color: 'black',
        fontWeight: '700'
    },
    rating: {
        fontSize: 20,
        color: 'black',
    },
    Button: {
        backgroundColor: "#EE2D32",
        borderRadius: 25,
        marginTop: 20,
        width: 170,
    },
    imageContainer: {
        height: "100%",
        width: 145,
        right:10,
    },
    Image: {
        width: 110,
        height: 160,
        borderRadius: 10,
    },
});