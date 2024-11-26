import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    GluestackUIProvider,
    Image,
    SafeAreaView,
    ScrollView,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native"
import { MoveLeft, Search } from 'lucide-react-native'

// Componentes Utilizados
import MainHeader from "../../components/MainHeader";

export default function SearchGenderScreen({ route, navigation }) {
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Recupera o gênero inicial passado pela navegação
    const initialSelectedGenre = route.params?.initialSelectedGenre;

    // Carregar gêneros do banco de dados
    useEffect(() => {
        async function loadGenres() {
            try {
                const response = await axios.get("http://10.0.2.2:8085/api/generos");
                
                // Adiciona a opção "Todos" no início da lista
                const updatedGenres = [
                    { id_genero: null, nome_genero: "Todos" },
                    ...response.data
                ];
                setGenres(updatedGenres);

                // Define o gênero inicial se passado, caso contrário seleciona "Todos"
                let initialGenre;
                if (initialSelectedGenre) {
                    initialGenre = updatedGenres.find(
                        genre => genre.id_genero === initialSelectedGenre.id_genero
                    ) || updatedGenres[0];
                } else {
                    initialGenre = updatedGenres[0]; // "Todos" por padrão
                }
                
                // Força a atualização do estado do gênero selecionado
                setSelectedGenre(initialGenre);
                setLoading(false);
                setIsInitialLoad(false);
            } catch (error) {
                console.error("Erro ao buscar gêneros:", error);
                setLoading(false);
                setIsInitialLoad(false);
            }
        }
        loadGenres();
    }, [initialSelectedGenre]);
    const handleGenreSelect = (genre) => {
        setSelectedGenre(genre);
    };
    // Carregar livros quando o gênero é alterado
    useEffect(() => {
        // Evita carregamento duplicado durante a inicialização
        if (isInitialLoad) return;

        async function loadBooks() {
            setLoading(true);
            try {
                let response;
                // Se nenhum gênero ou "Todos" for selecionado
                if (!selectedGenre || selectedGenre.id_genero === null) {
                    response = await axios.get("http://10.0.2.2:8085/api/listBooks");
                } else {
                    // Busca livros de um gênero específico
                    response = await axios.get(`http://10.0.2.2:8085/api/ListBooks/genero/${selectedGenre.id_genero}`);
                }
                
                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
                setLoading(false);
            }
        }
        loadBooks();
    }, [selectedGenre, isInitialLoad]); // Adiciona isInitialLoad como dependência

    // Renderização condicional de carregamento
    if (loading && (!genres || genres.length === 0)) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#ee2d32" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <MainHeader 
                        title="Gêneros" 
                        icon1={MoveLeft} 
                        icon2={Search} 
                        onPress={() => navigation.navigate("Home")} 
                        onPress2={() => navigation.navigate("SearchScreen")}
                    />
                </View>
                <View style={styles.contentContainer}>
                    {/* Seção de Gêneros */}
                    <View style={styles.genderSection}>
                        <ScrollView horizontal={true} style={styles.genderContainer} showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: "row", gap: 15 }}>
                                {genres.map((genre) => (
                                    <TouchableOpacity 
                                        key={genre.id_genero} 
                                        style={
                                            selectedGenre?.id_genero === genre.id_genero 
                                                ? styles.selectedGenderContainer 
                                                : styles.genderTextContainer
                                        }
                                        onPress={() => handleGenreSelect(genre)}
                                    >
                                        <Text 
                                            style={
                                                selectedGenre?.id_genero === genre.id_genero 
                                                    ? styles.selectedGenderText 
                                                    : styles.unselectedGenderText
                                            }
                                        >
                                            {genre.nome_genero}
                                        </Text>
                                        {selectedGenre?.id_genero === genre.id_genero && (
                                            <View style={{ height: 3, backgroundColor: "#ee2d32", width: 30 }} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    {/* Seção de Livros */}
                    <View style={styles.bookSection}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#ee2d32" />
                        ) : (
                            <ScrollView>
                                <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                                    {books.map((book) => (
                                        <View key={book.id_livro} style={styles.bookVerticalContainer}>
                                            <View style={styles.bookContainer}>
                                                <Image 
                                                    source={{ uri: book.image }} 
                                                    style={styles.bookImage} 
                                                    resizeMode="cover"
                                                />
                                                <Text style={styles.bookTitle} numberOfLines={2}>
                                                    {book.titulo}
                                                </Text>
                                                <Text style={styles.bookStatus}>
                                                    {book.quantidade > 0 ? "Disponível" : "Indisponível"}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        width: "100%",
        marginTop: 15,
    },
    contentContainer: {
        marginLeft: 30,
        bottom: 10
    },
    genderSection: {
        marginTop: 40
    },
    genderContainer: {
        height: 30,
        flexDirection: "row",
    },
    selectedGenderContainer: {
        flexDirection: "column"
    },
    selectedGenderText: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
    },
    unselectedGenderText: {
        color: "#a6a6a6",
        fontSize: 18,
    },
    bookSection: {
        marginTop: 50
    },
    bookVerticalContainer: {
        width: "50%",
    },
    bookContainer: {
        backgroundColor: "#eed2",
        gap: 5,
        marginBottom: 10,
        padding: 5,
        borderRadius: 10,
    },
    bookImage: {
        width: 160,
        height: 160,
        borderRadius: 10
    },
    bookTitle: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 3
    },
    bookStatus: {
        color: "#34A853",
        fontSize: 16,
        fontWeight: 'bold'
    }
});