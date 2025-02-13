import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from 'axios';
import {
    GluestackUIProvider,
    Image,
    SafeAreaView,
    ScrollView,
    Button,
    ButtonText,
    Pressable,
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ToastAndroid } from "react-native"
import { MoveLeft, Search } from 'lucide-react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MotiView } from 'moti';
import { AirbnbRating } from "react-native-ratings";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

// Componentes Utilizados
import MainHeader from "../../components/MainHeader";
import { useAuth } from "../../contexts/AuthContext";

export default function SearchGenderScreen({ route, navigation }) {
    const { user, addToFavorites, removeFromFavorites, checkFavoriteStatus, isLibrarianAuthenticated, selectBookForLoan } = useAuth();
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

    // BottomSheet states
    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], []);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    // Recupera o gênero inicial passado pela navegação
    const initialSelectedGenre = route.params?.initialSelectedGenre;

    const handleContinueToLoan = () => {
        // Verifica se o usuário está logado
        if (!user) {
            ToastAndroid.show("Por favor, faça login", ToastAndroid.SHORT);
            return;
        }

        // Verifica se o livro está disponível
        if (selectedBook.quantidade <= 0) {
            ToastAndroid.show("Livro não disponível para empréstimo", ToastAndroid.SHORT);
            return;
        }

        // Seleciona o livro para empréstimo no contexto
        selectBookForLoan(selectedBook);

        // Navega para a próxima tela de empréstimo
        navigation.navigate("LoanScreen");
    };

    const handleDeleteBook = async () => {
        if (!selectedBook) return;

        try {
            setIsDeleteDialogVisible(false);

            const response = await axios.delete(`http://10.0.2.2:8085/api/deleteBook/${selectedBook.id}`);

            bottomSheetref.current?.close();

            ToastAndroid.show("Livro excluído com sucesso", ToastAndroid.SHORT);

            await buscarLivros();
        } catch (error) {
            console.error("Erro ao excluir livro:", error);
            ToastAndroid.show("Erro ao excluir livro", ToastAndroid.SHORT);
        }
    };

    const confirmDeleteBook = () => {
        setIsDeleteDialogVisible(true);
    };

    // Carregar gêneros do banco de dados
    useEffect(() => {
        async function loadGenres() {
            try {
                const response = await axios.get("http://10.0.2.2:8085/api/generos");

                const updatedGenres = [
                    { id_genero: null, nome_genero: "Todos" },
                    ...response.data
                ];
                setGenres(updatedGenres);

                let initialGenre;
                if (initialSelectedGenre) {
                    initialGenre = updatedGenres.find(
                        genre => genre.id_genero === initialSelectedGenre.id_genero
                    ) || updatedGenres[0];
                } else {
                    initialGenre = updatedGenres[0];
                }

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
                    // Busca livros de um gênero específico usando o nome do gênero
                    response = await axios.get(`http://10.0.2.2:8085/api/ListBooksByGender/${selectedGenre.nome_genero}`);
                }

                setBooks(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar livros:", error);
                setLoading(false);
            }
        }
        loadBooks();
    }, [selectedGenre, isInitialLoad]);

    const handleOpenPress = (book) => {
        setSelectedBook(book);
        const isBookFavorited = checkFavoriteStatus(book.id_livro);
        setIsFavorited(isBookFavorited);
        bottomSheetref.current?.expand();
    };

    const handleFavoritePress = () => {
        if (!user) {
            ToastAndroid.show("Por favor, faça login", ToastAndroid.SHORT);
            return;
        }

        try {
            if (isFavorited) {
                removeFromFavorites(selectedBook.id_livro);
                ToastAndroid.show("Removido dos favoritos", ToastAndroid.SHORT);
            } else {
                addToFavorites({
                    id: selectedBook.id_livro,
                    titulo: selectedBook.titulo,
                    image: selectedBook.image,
                    descricao: selectedBook.descricao,
                    estado: selectedBook.quantidade > 0 ? 'D' : 'I'
                });
                ToastAndroid.show("Adicionado aos favoritos", ToastAndroid.SHORT);
            }

            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error("Erro ao gerenciar favoritos:", error);
            ToastAndroid.show("Erro ao gerenciar favoritos", ToastAndroid.SHORT);
        }
    };

    // Renderização condicional de carregamento
    if (loading && (!genres || genres.length === 0)) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#ee2d32" />
            </SafeAreaView>
        );
    }

    return (
        <GluestackUIProvider config={config}>
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
                                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                        {books.map((book) => (
                                            <TouchableOpacity
                                                key={book.id_livro}
                                                style={styles.bookVerticalContainer}
                                                onPress={() => handleOpenPress(book)}
                                            >
                                                <View style={styles.bookContainer}>
                                                    <Image
                                                        source={{ uri: book.image }}
                                                        style={styles.bookImage}
                                                    />
                                                    <Text style={styles.bookTitle} numberOfLines={2}>
                                                        {book.titulo}
                                                    </Text>
                                                    <Text style={[styles.bookStatus, { color: book.estado.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }]}>
                                                        {book.estado}{book.estado.toLowerCase() === 'd' ? 'isponivel' : 'mprestado'}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            )}
                        </View>
                    </View>
                </ScrollView>

                <BottomSheet
                    ref={bottomSheetref}
                    snapPoints={snapPoints}
                    index={-1}
                    enablePanDownToClose={true}>
                    <BottomSheetScrollView contentContainerStyle={bottomSheetStyles.contentContainer}>
                        {selectedBook && ( // Só renderiza se houver um livro selecionado
                            <>
                                <View style={bottomSheetStyles.bookContainer}>
                                    <Image source={{ uri: selectedBook.image }} alt="livro" style={bottomSheetStyles.bookStyle} />
                                </View>
                                <View style={bottomSheetStyles.detailContainer}>
                                    <View style={bottomSheetStyles.headerContainer}>
                                        <Text style={bottomSheetStyles.title}>{selectedBook.titulo}</Text>
                                        {isLibrarianAuthenticated() ? (
                                            <></>
                                        ) : (
                                            <Pressable
                                                size="md"
                                                bg="transparent"
                                                style={{ top: 7 }}
                                                onPress={handleFavoritePress}
                                            >
                                                {isFavorited ? (
                                                    <MotiView from={{ rotateY: "0deg" }} animate={{ rotateY: "360deg" }}>
                                                        <Ionicons name="heart" size={26} color={"#ee2d32"} />
                                                    </MotiView>
                                                ) : (
                                                    <MotiView from={{ rotateY: "360deg" }} animate={{ rotateY: "0deg" }}>
                                                        <Ionicons name="heart-outline" size={26} color={"#ee2d32"} />
                                                    </MotiView>
                                                )}
                                            </Pressable>
                                        )}
                                    </View>
                                    <View style={bottomSheetStyles.genderContainer}>
                                        <Text style={bottomSheetStyles.genderText}>{selectedBook.nome_genero}</Text>
                                    </View>
                                    <Text style={bottomSheetStyles.description}>{selectedBook.descricao}</Text>
                                </View>
                                <View style={bottomSheetStyles.ratingContainer}>
                                    <Text style={bottomSheetStyles.ratingTitle}>Avaliação</Text>
                                    <AirbnbRating
                                        count={5}
                                        defaultRating={selectedBook.rating || 1}
                                        size={20}
                                        showRating={false}
                                        unSelectedColor="#000"
                                        starContainerStyle={bottomSheetStyles.starRating}
                                        isDisabled={true}
                                    />
                                    <Text style={[bottomSheetStyles.status,
                                    { color: selectedBook.quantidade > 0 ? '#34A853' : '#ee2d32' }]}>
                                        {selectedBook.quantidade > 0 ? 'Disponível' : 'Emprestado'}
                                    </Text>
                                </View>
                                <View style={bottomSheetStyles.buttonContainer}>
                                    {isLibrarianAuthenticated() ? (
                                        <Button
                                            size="md"
                                            variant="solid"
                                            action="primary"
                                            isDisabled={false}
                                            isFocusVisible={false}
                                            style={bottomSheetStyles.buttonPrincipal}
                                            onPress={confirmDeleteBook}
                                        >
                                            <ButtonText style={bottomSheetStyles.buttonPrincipalText}>
                                                Excluir Livro
                                            </ButtonText>
                                        </Button>
                                    ) : (
                                        <Button
                                            size="md"
                                            variant="solid"
                                            action="primary"
                                            isDisabled={selectedBook.quantidade <= 0}
                                            isFocusVisible={false}
                                            style={bottomSheetStyles.buttonPrincipal}
                                            onPress={handleContinueToLoan}
                                        >
                                            <ButtonText style={bottomSheetStyles.buttonPrincipalText}>
                                                Continuar com Empréstimo
                                            </ButtonText>
                                        </Button>
                                    )}
                                    {isLibrarianAuthenticated() ? (
                                        <Button
                                            size="md"
                                            variant="solid"
                                            action="primary"
                                            isDisabled={false}
                                            isFocusVisible={false}
                                            style={bottomSheetStyles.buttonSecondary}
                                            onPress={() => navigation.navigate("EditBooks", {
                                                bookData: selectedBook
                                            })}
                                        >
                                            <ButtonText style={bottomSheetStyles.buttonSecondaryText}>
                                                Editar Livro
                                            </ButtonText>
                                        </Button>
                                    ) : (
                                        <Button
                                            size="md"
                                            variant="solid"
                                            action="primary"
                                            isDisabled={false}
                                            isFocusVisible={false}
                                            style={bottomSheetStyles.buttonSecondary}
                                            onPress={() => navigation.navigate("SearchScreen")}
                                        >
                                            <ButtonText style={bottomSheetStyles.buttonSecondaryText}>
                                                Ver Livros
                                            </ButtonText>
                                        </Button>
                                    )}
                                </View>
                            </>
                        )}
                    </BottomSheetScrollView>
                </BottomSheet>
                <AlertDialog
                    isOpen={isDeleteDialogVisible}
                    onClose={() => setIsDeleteDialogVisible(false)}
                >
                    <AlertDialogBackdrop />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <Text style={styles.alertTitle}>Excluir Livro</Text>
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            <Text style={styles.alertText}>
                                Tem certeza que deseja excluir o livro "{selectedBook?.titulo}"?
                                Esta ação não pode ser desfeita.
                            </Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                variant="outline"
                                action="secondary"
                                onPress={() => setIsDeleteDialogVisible(false)}
                                style={styles.alertCancelButton}
                            >
                                <ButtonText style={styles.alertCancelButtonText}>Cancelar</ButtonText>
                            </Button>
                            <Button
                                variant="solid"
                                action="negative"
                                onPress={handleDeleteBook}
                                style={styles.alertDeleteButton}
                            >
                                <ButtonText style={styles.alertDeleteButtonText}>Excluir</ButtonText>
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SafeAreaView>
        </GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
    // Mantém os estilos anteriores e adiciona alguns novos para o BottomSheet
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
        marginTop: 40,
        width: "100%",
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
        height: 210,
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
    },
})

const bottomSheetStyles = StyleSheet.create({

    bookContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    bookStyle: {
        width: 237,
        height: 310,
        borderRadius: 20,
    },
    detailContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
        paddingHorizontal: 25,
        gap: 15,
    },
    headerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 30,
    },
    title: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    },
    icon: {
        height: 24,
        width: 24,
        marginTop: 7,
    },
    description: {
        fontSize: 16,
    },
    genderContainer: {
        height: 50,
        width: 130,
        justifyContent: 'center',
    },
    genderText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 5,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        color: '#2c3e50',
        letterSpacing: 3,
        textShadowColor: 'rgba(44, 62, 80, 0.5)',
    },
    image: {
        width: 100,
        height: 24,
    },
    ratingContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
        paddingHorizontal: 22,
        gap: 10,
        width: 160,
    },
    ratingTitle: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    },
    starRating: {
        flex: 1,
        justifyContent: "flex-start",
        marginLeft: 28,
        gap: 4,
    },
    status: {
        fontSize: 18,
        color: "#34A853",
        fontWeight: "bold",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        marginTop: 10,
        gap: 15,
    },
    buttonPrincipal: {
        backgroundColor: "#ee2d32",
        width: 250,
        height: 50,
        borderRadius: 25,
    },
    buttonSecondary: {
        backgroundColor: "#EBF2EF",
        width: 115,
        height: 50,
        borderRadius: 25,
        paddingLeft: 15,
    },
    buttonPrincipalText: {
        fontWeight: "bold",
    },
    buttonSecondaryText: {
        color: "#54408C",
        fontWeight: 'bold',
    },
})