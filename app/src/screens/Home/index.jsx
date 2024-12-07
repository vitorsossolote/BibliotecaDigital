import React, { useRef, useMemo, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    Image,
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
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MotiView } from 'moti';
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, ToastAndroid, } from "react-native"
import { AirbnbRating } from "react-native-ratings";
import { Heart } from "lucide-react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from "axios"
//Componentes Utilizados
import MainHeader from "../../components/MainHeader/index";
import Carrosel from "../../components/Carrousel/index";
import Reservar from "../../components/ReservarNovamente/index";
import Section from "../../components/Section/index";
import TrendingBooks from "../../components/TrendingBooks/index";
import TrendingGenders from "../../components/TrendingGenders/index";
import Authors from "../../components/Authors/index";
import { useAuth } from "../../contexts/AuthContext";
//Imagens Utilizadas
import heartImage from "../../../assets/Heart.png";
import book from "../../../assets/book2.png"
import marca from "../../../assets/genero3.png"

//Inicio Do Codigo
function signOut() {
    auth().signOut()
}

export default function Home({ navigation }) {
    const { user, addToFavorites, removeFromFavorites, checkFavoriteStatus, selectBookForLoan, livros, librarian, isLibrarianAuthenticated, buscarLivros } = useAuth();
    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], []);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

    const handleOpenPress = (livros) => {
        setSelectedBook(livros);
        const isBookFavorited = checkFavoriteStatus(livros.id);
        setIsFavorited(isBookFavorited);
        bottomSheetref.current?.expand();
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

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={{ backgroundColor: "#fafafa" }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MainHeader title="Inicio" />
                    <MotiView from={{ translateX: 50, opacity: 0, }} animate={{ translateX: 0, opacity: 1, }} transition={{ duration: 2000, type: "timing" }}>
                        <Carrosel onPress={handleOpenPress} />
                    </MotiView>

                    {/* Conditionally render Reservar component only for non-librarian users */}
                    {!isLibrarianAuthenticated() && (
                        <MotiView from={{ translateX: -50, opacity: 0, }} animate={{ translateX: 0, opacity: 1, }} transition={{ duration: 2000, type: "timing" }}>
                            <Reservar onPress={handleOpenPress} />
                        </MotiView>
                    )}

                    <MotiView from={{ translateY: 200, opacity: 0, }} animate={{ translateY: 0, opacity: 1 }} transition={{ delay: 1000, duration: 2000, type: "timing" }}>
                        <Section title="Novidades" onPress={() => navigation.navigate("SearchScreen")} />
                        <TrendingBooks onPress={handleOpenPress} />
                    </MotiView>
                    <Section title="Generos" onPress={() => navigation.navigate("SearchGenderScreen")} />
                    <TrendingGenders />
                    <Section title="Autores" onPress={() => navigation.navigate("SearchAuthorScreen")} />
                    <Authors onPress1={() => navigation.navigate("AuthorsScreen")} onPress2={() => navigation.navigate("AuthorsScreen")} onPress3={() => navigation.navigate("AuthorsScreen")} onPress4={() => navigation.navigate("AuthorsScreen")} />
                </ScrollView>

                <BottomSheet
                    ref={bottomSheetref}
                    snapPoints={snapPoints}
                    index={-1}
                    enablePanDownToClose={true}
                    animateOnMount={true}
                    animatedIndex={true}>
                    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                        {selectedBook && ( // Só renderiza se houver um livro selecionado
                            <>
                                <View style={styles.bookContainer}>
                                    <Image source={selectedBook.image} alt="livro" style={styles.bookStyle} />
                                </View>
                                <View style={styles.detailContainer}>
                                    <View style={styles.headerContainer}>
                                        <Text style={styles.title}>{selectedBook.titulo}</Text>
                                        {isLibrarianAuthenticated() ? (
                                            <><Text style={{ color: "#000", fontSize: 15, fontWeight: "semibold", top: 8 }}>Quantidade : {selectedBook.quantidade}</Text></>
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
                                    <Text style={[styles.status, { color: selectedBook.estado.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }]}>
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
                                            onPress={handleContinueToLoan}
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
        height: "100%",
        width: "100%",
        backgroundColor: '#f6f6',
        alignItems: "center"
    },
    //BottomSheetStyles
    bottomSheetContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
    },
    dragIndicator: {
        width: 50,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 10,
    },
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
});