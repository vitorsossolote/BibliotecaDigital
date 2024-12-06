import React, { useEffect, useRef, useMemo, useState } from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    Image,
    Button,
    ButtonText
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Pressable, StyleSheet, Text, View, ActivityIndicator, ToastAndroid } from "react-native"
import { AirbnbRating } from "react-native-ratings";
import { ArrowLeft } from "lucide-react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MotiView } from "moti";
import Ionicons from 'react-native-vector-icons/Ionicons'
//Componentes Utilizados
import MainHeader from "../../components/MainHeader";
import { useAuth } from "../../contexts/AuthContext";

export default function MostViewedBooks({ navigation }) {
    const { 
        user, 
        addToFavorites, 
        removeFromFavorites, 
        checkFavoriteStatus, 
        selectBookForLoan, 
        LivrosMaisEmprestados, 
        loading, 
        error,
        isLibrarianAuthenticated
    } = useAuth();

    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], []);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleOpenPress = (livro) => {
        setSelectedBook(livro);
        const isBookFavorited = checkFavoriteStatus(livro.livro_id);
        setIsFavorited(isBookFavorited);
        bottomSheetref.current?.expand();
    };

    const handleContinueToLoan = () => {
        if (!user) {
            ToastAndroid.show("Por favor, faça login", ToastAndroid.SHORT);
            return;
        }

        selectBookForLoan(selectedBook);
        navigation.navigate("LoanScreen");
    };

    const handleFavoritePress = () => {
        if (!user) {
            ToastAndroid.show("Por favor, faça login", ToastAndroid.SHORT);
            return;
        }

        try {
            if (isFavorited) {
                removeFromFavorites(selectedBook.livro_id);
                ToastAndroid.show("Removido dos favoritos", ToastAndroid.SHORT);
            } else {
                addToFavorites({
                    id: selectedBook.livro_id,
                    titulo: selectedBook.titulo,
                    image: selectedBook.image,
                    descricao: selectedBook.descricao,
                    estado: selectedBook.quantidade > 0 ? 'Disponível' : 'Emprestado'
                });
                ToastAndroid.show("Adicionado aos favoritos", ToastAndroid.SHORT);
            }

            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error("Erro ao gerenciar favoritos:", error);
            ToastAndroid.show("Erro ao gerenciar favoritos", ToastAndroid.SHORT);
        }
    };

    const renderBookItem = (livro) => (
        <Pressable 
            style={styles.bookContainer} 
            key={livro.livro_id}
            onPress={() => handleOpenPress(livro)}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: livro.image }} 
                    alt={livro.titulo} 
                    style={styles.bookImage} 
                />
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.bookTitle}>{livro.titulo}</Text>
                <AirbnbRating
                    count={5}
                    defaultRating={livro.avaliacao}
                    size={20}
                    showRating={false}
                    unSelectedColor="#000"
                    starContainerStyle={styles.starRating}
                    isDisabled={true}
                />
                <Text style={styles.loanTimesText}>
                    Vezes emprestado: {livro.emprestimos_count || 0}
                </Text>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Status: </Text>
                    <Text style={[styles.availabilityText,{color: livro.quantidade > 0 ? "#34a853": "#ee2d32"}]}>
                        {livro.quantidade > 0 ? 'Disponível' : 'Emprestado'}
                    </Text>
                </View>
            </View>
        </Pressable>
    );

    const confirmDeleteBook = () => {
        ToastAndroid.show("Funcionalidade de exclusão em desenvolvimento", ToastAndroid.SHORT);
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <MainHeader 
                            title="Livros mais vistos" 
                            icon1={ArrowLeft} 
                            onPress={() => navigation.goBack()} 
                        />
                        <View style={styles.booksSection}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : error ? (
                                <Text style={styles.errorText}>
                                    {error || 'Erro ao carregar livros'}
                                </Text>
                            ) : (
                                LivrosMaisEmprestados.length > 0 ? (
                                    LivrosMaisEmprestados.map(renderBookItem)
                                ) : (
                                    <Text style={styles.noDataText}>
                                        Nenhum livro encontrado
                                    </Text>
                                )
                            )}
                        </View>
                    </View>
                </ScrollView>
                <BottomSheet
                    ref={bottomSheetref}
                    snapPoints={snapPoints}
                    index={-1}
                    enablePanDownToClose={true}>
                    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                        {selectedBook && (
                            <>
                                <View style={styles.bottomSheetBookContainer}>
                                    <Image 
                                        source={{uri: selectedBook.image}} 
                                        alt={selectedBook.titulo} 
                                        style={styles.bookStyle} 
                                        resizeMode="contain" 
                                    />
                                </View>
                                <View style={styles.detailContainer}>
                                    <View style={styles.headerContainer}>
                                        <Text style={styles.title}>{selectedBook.titulo}</Text>
                                        <Pressable
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
                                        defaultRating={selectedBook.avaliacao || 1}
                                        size={20}
                                        showRating={false}
                                        unSelectedColor="#000"
                                        starContainerStyle={styles.starRating}
                                        isDisabled={true}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                        <Button
                                            size="md"
                                            variant="solid"
                                            action="primary"
                                            style={styles.buttonPrincipal}
                                            onPress={handleContinueToLoan}
                                        >
                                            <ButtonText style={styles.buttonPrincipalText}>
                                                Continuar com Empréstimo
                                            </ButtonText>
                                        </Button>
                                        <Button
                                            size="md"
                                            variant="solid"
                                            action="primary"
                                            style={styles.buttonSecondary}
                                            onPress={() => navigation.navigate("SearchScreen")}
                                        >
                                            <ButtonText style={styles.buttonSecondaryText}>
                                                Ver Livros
                                            </ButtonText>
                                        </Button>
                                    
                                </View>
                            </>
                        )}
                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        </GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
        alignItems: "center"
    },
    searchbarContainer: {
        borderRadius: 10,
        width: 320,
        height: 50,
        alignSelf: "center",
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        paddingLeft: 10,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    inputSlot: {
        marginRight: 20
    },
    searchText: {
        fontSize: 18,
        top: 1
    },
    booksSection: {
        width: "85%",
        marginTop: 20,
        borderWidth:1,
        borderColor:"#e6e6e6",
        borderRadius:30,
        height:170
    },
    bookContainer: {
        flexDirection: "row",
        height: 180,
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    imageContainer: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginRight:7,
    },
    bookImage: {
        width: 120,
        height: "95%",
        borderRadius: 20,
    },
    infoSection: {
        flexDirection: "column",
        marginTop: 7,
        alignItems: "flex-start",
        marginLeft:7,
    },
    bookTitle: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",
    },
    starRating: {
        marginTop: 10,
        marginBottom: 10,
    },
    loanTimesText: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold"
    },
    statusContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    statusText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "semibold"
    },
    availabilityText: {
        fontSize: 16,
        fontWeight: "semibold"
    },
    //BottomSheet Styles
    bottomSheetBookContainer: {
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