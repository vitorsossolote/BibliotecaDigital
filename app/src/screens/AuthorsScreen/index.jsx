import React, { useState, useEffect, useRef, useMemo } from "react";
import {
    GluestackUIProvider,
    Image,
    Button,
    ButtonText,
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Text
} from "@gluestack-ui/themed";
import { ScrollView, StyleSheet, Pressable, SafeAreaView, View, ToastAndroid } from "react-native"
import { MoveLeft, Pencil, Trash2 } from "lucide-react-native"
import { AirbnbRating } from 'react-native-ratings';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MotiView from "moti";
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import Heart from "../../../assets/Heart.png";
import { useAuth } from "../../contexts/AuthContext";
import { config } from "@gluestack-ui/config";
import anonimo from "../../../assets/anonimo.png"

export default function AuthorsScreen({ route, navigation }) {
    const { user, addToFavorites, removeFromFavorites, checkFavoriteStatus, livros, librarian, isLibrarianAuthenticated, buscarLivros, fetchAuthorBooks } = useAuth();
    const [isFavorited, setIsFavorited] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
    const { author, data } = route.params;

    const handleEditAuthor = () => {
        // Navegar para tela de edição de autor
        navigation.navigate("EditAuthor", { author });
    };
    // Estado para buscar livros de determinado autor
    const [authorBooks, setAuthorBooks] = useState([]);

    const confirmDeleteAuthor = () => {
        setIsDeleteAuthorDialogVisible(true);
    };

    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], [])

    //Função para carregar livros do autor
    useEffect(() => {
        const loadAuthorBooks = async () => {
            try {
                const books = await fetchAuthorBooks(author.id_autor);
                setAuthorBooks(books);
            } catch (error) {
                console.error("Erro ao carregar livros do autor:", error);
            }
        };

        loadAuthorBooks();
    }, [author.id_autor, livros]);

    const handleCloseAction = () => bottomSheetref.current?.close()

    // Estado para livro selecionado
    const [selectedBook, setSelectedBook] = useState(null);

    const handleOpenPress = (livros) => {
        setSelectedBook(livros);
        const isBookFavorited = checkFavoriteStatus(livros.id);
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
                removeFromFavorites(selectedBook.id);
                ToastAndroid.show("Removido dos favoritos", ToastAndroid.SHORT);
            } else {
                addToFavorites({
                    id: selectedBook.id,
                    titulo: selectedBook.titulo,
                    image: selectedBook.image,
                    descricao: selectedBook.descricao,
                    estado: selectedBook.estado
                });
                ToastAndroid.show("Adicionado aos favoritos", ToastAndroid.SHORT);
            }

            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error("Erro ao gerenciar favoritos:", error);
            ToastAndroid.show("Erro ao gerenciar favoritos", ToastAndroid.SHORT);
        }
    };

    const handleDeleteBook = async () => {
        if (!selectedBook) return;

        try {
            setIsDeleteDialogVisible(false);

            // Call da api para deletar livro
            const response = await axios.delete(`http://10.0.2.2:8085/api/deleteBook/${selectedBook.id}`);

            // Fechar bottomSheet
            bottomSheetref.current?.close();

            // Toast de sucesso
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

    const handleContinueToLoan = () => {
        // Verifica se o usuário está logado
        if (!user) {
            ToastAndroid.show("Por favor, faça login", ToastAndroid.SHORT);
            return;
        }

        // Verifica se o livro está disponível
        if (selectedBook.estado.toLowerCase() !== 'd') {
            ToastAndroid.show("Livro não disponível para empréstimo", ToastAndroid.SHORT);
            return;
        }

        // Seleciona o livro para empréstimo no contexto
        selectBookForLoan(selectedBook);
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Pressable onPress={() => navigation.goBack()}>
                                <MoveLeft color={"#000"} size={35} />
                            </Pressable>
                            <Text style={styles.headerText}>Autores</Text>
                        </View>
                        <View style={styles.authorContentContainer}>
                            <Image
                                source={author.image ? { uri: author.image } : anonimo}
                                alt="autor"
                                resizeMode="cover"
                                style={styles.authorImage}
                            />
                            <Text style={styles.authorGenderText}>{author.genero}</Text>
                            <Text style={styles.authorNameText}>{author.nome_autor}</Text>
                            {isLibrarianAuthenticated() && (
                                <View style={styles.headerActions}>
                                    <Pressable onPress={handleEditAuthor} style={styles.headerActionButton}>
                                        <Pencil color={"#000"} size={24} />
                                    </Pressable>
                                    <Pressable onPress={confirmDeleteAuthor} style={styles.headerActionButton}>
                                        <Trash2 color={"#ee2d32"} size={24} />
                                    </Pressable>
                                </View>
                            )}
                        </View>
                        <View style={styles.aboutContainer}>
                            <Text style={styles.aboutHeader}>Sobre</Text>
                            <Text style={styles.desc}>{author.sobre || 'Biografia não disponível'}</Text>
                        </View>
                        <View style={styles.bookContainer}>
                            <Text style={styles.bookHeader}>Livros</Text>
                            <View style={{ flexDirection: "column", gap: 30 }}>
                                {authorBooks.length > 0 ? (
                                    <View style={styles.bookGaleryContainer}>
                                        {authorBooks.map((book, index) => (
                                            <View key={index} style={styles.bookContent}>
                                                <Pressable onPress={() => handleOpenPress(book)}>
                                                    <Image
                                                        source={{ uri: book.image }}
                                                        alt="livro"
                                                        style={styles.bookImage}
                                                    />
                                                </Pressable>
                                                <Text style={styles.bookName}>{book.titulo}</Text>
                                                <Text style={[styles.bookStatus, { color: book.estado.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }]}>
                                                    {book.estado}{book.estado.toLowerCase() === 'd' ? 'isponivel' : 'mprestado'}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <Text style={styles.desc}>Nenhum livro encontrado para este autor.</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/* BottomSheet */}
                <BottomSheet
                    ref={bottomSheetref}
                    snapPoints={snapPoints}
                    index={-1}
                    enablePanDownToClose={true}>
                    <BottomSheetScrollView contentContainerStyle={bottomSheetStyles.contentContainer}>
                        {selectedBook && (
                            <>
                                <View style={bottomSheetStyles.bookContainer}>
                                    {selectedBook.image && (
                                        <Image
                                            source={{ uri: selectedBook.image }}
                                            alt="livro"
                                            style={bottomSheetStyles.bookStyle}
                                            resizeMode="contain"
                                        />
                                    )}
                                </View>
                                <View style={bottomSheetStyles.detailContainer}>
                                    <View style={bottomSheetStyles.headerContainer}>
                                        <Text style={bottomSheetStyles.title}>{selectedBook.titulo}</Text>
                                        {isLibrarianAuthenticated() ? (
                                            <Text style={{ color: "#fff" }}>a</Text>
                                        ) : (
                                            <Pressable
                                                size="md"
                                                bg="transparent"
                                                style={{ top: 7 }}
                                                onPress={handleFavoritePress}
                                            >
                                                {isFavorited ? (
                                                    <Ionicons name="heart" size={26} color={"#ee2d32"} />
                                                ) : (
                                                    <Ionicons name="heart-outline" size={26} color={"#ee2d32"} />
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
                                    { color: selectedBook.estado.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }]}>
                                        {selectedBook.estado}{selectedBook.estado.toLowerCase() === 'd' ? 'isponivel' : 'mprestado'}
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
                                            isFocusVisible={false}
                                            style={bottomSheetStyles.buttonPrincipal}
                                            onPress={() => navigation.navigate("EditBooks")}
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
                                            onPress={handleContinueToLoan}
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
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    header: {
        alignSelf: "flex-start",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        top: 10,
    },
    headerText: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold",
        left: 100
    },
    authorContentContainer: {
        alignSelf: "center",
        flexDirection: "column",
        top: 30,
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    },
    authorImage: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    authorGenderText: {
        fontSize: 20,
        color: "#000",
        fontWeight: "500",
    },
    authorNameText: {
        color: "#000",
        fontSize: 26,
        fontWeight: "bold"
    },
    aboutContainer: {
        left: 30,
        top: 50,
        width: "85%",
        gap: 8
    },
    aboutHeader: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold"
    },
    desc: {
        color: "#7A7A7A",
        fontSize: 18,
        fontWeight: "500"
    },
    bookContainer: {
        left: 30,
        top: 70,
        width: "85%",
        gap: 8,
    },
    bookHeader: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",
    },
    bookGaleryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
    },
    bookContent: {
        width: "45%",
        marginBottom: 20,
    },
    bookImage: {
        width: 210,
        height: 200,
        borderRadius: 20,
    },
    bookName: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10
    },
    bookStatus: {
        fontSize: 16,
        color: "#34A853",
        fontWeight: "bold",
    },
    header: {
        alignSelf: "flex-start",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        top: 10,
        justifyContent: "space-between"
    },
    headerActions: {
        flexDirection: "row",
        gap: 15
    },
    headerActionButton: {
        padding: 5
    },
});

const bottomSheetStyles = StyleSheet.create({
    bookContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    bookStyle: {
        width: 237,
        height: 310,
    },
    detailContainer: {
        paddingHorizontal: 25,
        gap: 15,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
        flex: 1,
    },
    icon: {
        height: 24,
        width: 24,
        marginLeft: 10,
    },
    description: {
        fontSize: 16,
        color: "#7A7A7A",
    },
    ratingContainer: {
        paddingHorizontal: 22,
        gap: 10,
    },
    ratingTitle: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    },
    starRating: {
        justifyContent: "flex-start",
        right: 120
    },
    status: {
        fontSize: 18,
        color: "#34A853",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        padding: 10,
        marginTop: 10,
        gap: 15,
        justifyContent: "center",
    },
    buttonPrincipal: {
        backgroundColor: "#ee2d32",
        width: 250,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonSecondary: {
        backgroundColor: "#EBF2EF",
        width: 115,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonPrincipalText: {
        color: "white",
        fontWeight: "bold",
    },
    buttonSecondaryText: {
        color: "#54408C",
        fontWeight: 'bold',
    },
});