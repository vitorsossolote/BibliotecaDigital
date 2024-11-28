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
import { ScrollView, StyleSheet, Pressable, SafeAreaView,View,ToastAndroid} from "react-native"
import { MoveLeft } from "lucide-react-native"
import { AirbnbRating } from 'react-native-ratings';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import axios from 'axios';
import Heart from "../../../assets/Heart.png";
import { useAuth } from "../../contexts/AuthContext";
import { config } from "@gluestack-ui/config";

export default function AuthorsScreen({ route, navigation }) {
    const { user, addToFavorites, removeFromFavorites, checkFavoriteStatus, livros, librarian, isLibrarianAuthenticated, buscarLivros } = useAuth();
    const [isFavorited, setIsFavorited] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
    const { author,data } = route.params;

    // State to store author's books
    const [authorBooks, setAuthorBooks] = useState([]);

    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], [])

    // Fetch books for the specific author
    useEffect(() => {
        const fetchAuthorBooks = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:8085/api/ListBooks/autor/${author.id_autor}`);
                setAuthorBooks(response.data);
            } catch (error) {
                console.error("Erro ao buscar livros do autor:", error);
            }
        };

        fetchAuthorBooks();
    }, [author.id_autor]);

    const handleCloseAction = () => bottomSheetref.current?.close()

    // State for selected book in bottom sheet
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
            // Close the delete dialog
            setIsDeleteDialogVisible(false);

            // Make API call to delete the book
            const response = await axios.delete(`http://10.0.2.2:8085/api/deleteBook/${selectedBook.id}`);

            // Close bottom sheet
            bottomSheetref.current?.close();

            // Show success toast
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

    return (
        <GluestackUIProvider config={config}>
        <SafeAreaView style={{flex: 1, backgroundColor: "#fafafa"}}>
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
                            source={{ uri: author.image }} 
                            alt="autor" 
                            resizeMode="cover" 
                            style={styles.authorImage} 
                        />
                        <Text style={styles.authorGenderText}>{author.genero}</Text>
                        <Text style={styles.authorNameText}>{author.nome_autor}</Text>
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
                                                    resizeMode="contain" 
                                                    style={styles.bookImage} 
                                                />
                                            </Pressable>
                                            <Text style={styles.bookName}>{book.titulo}</Text>
                                            <Text style={styles.bookStatus}>
                                                {book.status ? 'D' : 'Indisponível'}
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
            {/* BottomSheet for Book Details */}
            <BottomSheet
                    ref={bottomSheetref}
                    snapPoints={snapPoints}
                    index={-1}
                    enablePanDownToClose={true}>
                    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                        {selectedBook && ( // Só renderiza se houver um livro selecionado
                            <>
                                <View style={styles.bookContainer}>
                                    <Image source={selectedBook.image} alt="livro" style={styles.bookStyle} resizeMode="contain" />
                                </View>
                                <View style={styles.detailContainer}>
                                    <View style={styles.headerContainer}>
                                        <Text style={styles.title}>{selectedBook.titulo}</Text>
                                        {isLibrarianAuthenticated() ? (
                                            <></>
                                        ) : (<Pressable
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
                                        </Pressable>)}
                                    </View>
                                    <View style={styles.genderContainer}>
                                        <Text style={styles.genderText}>{selectedBook.nome_genero}</Text>
                                    </View>
                                    <Text style={styles.description}>{selectedBook.descricao}</Text>
                                </View>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingTitle}>Avaliação</Text>
                                    <AirbnbRating
                                        count={5}
                                        defaultRating={selectedBook.rating || 1}
                                        size={20}
                                        showRating={false}
                                        unSelectedColor="#000"
                                        starContainerStyle={styles.starRating}
                                        isDisabled={true}
                                    />
                                    <Text style={[styles.status,
                                    { color: selectedBook.estado.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }]}>
                                        {selectedBook.estado}{selectedBook.estado.toLowerCase() === 'd' ? 'isponivel' : 'mprestado'}
                                    </Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    {isLibrarianAuthenticated() ? (
                                        <Button
                                            size="md"
                                            variant="solid"
                                            action="primary"
                                            isDisabled={false}
                                            isFocusVisible={false}
                                            style={styles.buttonPrincipal}
                                            onPress={confirmDeleteBook}
                                        >
                                            <ButtonText style={styles.buttonPrincipalText}>
                                                Excluir Livro
                                            </ButtonText>
                                        </Button>
                                    ) : (
                                        <Button
                                            size="md"
                                            variant="solid"
                                            action="primary"
                                            isDisabled={selectedBook.estado.toLowerCase() !== 'd'}
                                            isFocusVisible={false}
                                            style={styles.buttonPrincipal}
                                            onPress={() => navigation.navigate("EditBooks")}
                                        >
                                            <ButtonText style={styles.buttonPrincipalText}>
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
                                            style={styles.buttonSecondary}
                                            onPress={() => navigation.navigate("EditBooks", {
                                                bookData: selectedBook
                                            })}
                                        >
                                            <ButtonText style={styles.buttonSecondaryText}>
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
                                            style={styles.buttonSecondary}
                                            onPress={() => navigation.navigate("SearchScreen")}
                                        >
                                            <ButtonText style={styles.buttonSecondaryText}>
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
        height: 250,
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
        marginLeft: 28,
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