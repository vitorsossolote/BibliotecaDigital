import React, { useRef, useMemo, useState } from "react"
import { View, Text, Pressable, Button, ButtonText } from "@gluestack-ui/themed"
import { StyleSheet, SafeAreaView, Image, ScrollView, ToastAndroid } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MotiView } from 'moti'
import MainHeader from "../../components/MainHeader/index"
import { MoveLeft } from 'lucide-react-native'
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AirbnbRating } from "react-native-ratings";
import { useAuth } from "../../contexts/AuthContext";
import book1 from "../../../assets/book7.png";

export default function FavoritesScreen({ navigation }) {
    const { user, favorites, removeFromFavorites, addToFavorites } = useAuth();
    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], []);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    const checkFavoriteStatus = (bookId) => {
        return favorites.some(book => book.id === bookId);
    };
    
    const handleOpenPress = (book) => {
        setSelectedBook(book);
        setIsFavorited(checkFavoriteStatus(book.id));
        bottomSheetref.current?.expand();
    };

    const handleFavoritePress = () => {
        if (!user) {
            ToastAndroid.show("Por favor, faça login", ToastAndroid.SHORT);
            return;
        }

        if (!selectedBook) return;

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

    const renderFavoriteBooks = () => {
        return favorites.map((book) => (
            <View key={book.id} style={styles.contentContainer}>
                <View style={styles.favoriteBookContainer}>
                    <Pressable onPress={() => handleOpenPress(book)}>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: book.image}} style={styles.bookImage}/>
                        </View>
                    </Pressable>
                    <View style={styles.textContainer}>
                        <Text style={styles.bookTitle}>{book.titulo}</Text>
                        {/* <Text style={[styles.bookStatus, 
                            { color: book.estado.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }
                            ]}>{book.estado}{book.estado.toLowerCase() === 'd' ? 'isponivel' : 'mprestado'}</Text> */}
                    </View>
                    <View>
                        <Pressable
                            size="md"
                            bg="transparent"
                            onPress={() => removeFromFavorites(book.id)}
                            style={styles.iconContainer}
                        >
                            <MotiView from={{ rotateY: "0deg" }} animate={{ rotateY: "360deg" }}>
                                <Ionicons name="heart" size={30} color={"#ee2d32"} />
                            </MotiView>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.divider} />
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MainHeader
                    title="Seus Favoritos"
                    icon1={MoveLeft}
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
            <ScrollView>
                {favorites.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Você não tem livros favoritos</Text>
                    </View>
                ) : (
                    renderFavoriteBooks()
                )}
            </ScrollView>
            <BottomSheet
                ref={bottomSheetref}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose={true}>
                <BottomSheetScrollView contentContainerStyle={bottomSheetStyles.contentContainer}>
                    {selectedBook && (
                        <>
                            <View style={bottomSheetStyles.bookContainer}>
                                <Image 
                                    source={selectedBook.image ? { uri: selectedBook.image } : book1} 
                                    alt="livro" 
                                    style={bottomSheetStyles.bookStyle} 
                                    resizeMode="contain" 
                                />
                            </View>
                            <View style={bottomSheetStyles.detailContainer}>
                                <View style={bottomSheetStyles.headerContainer}>
                                    <Text style={bottomSheetStyles.title}>{selectedBook.titulo}</Text>
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
                                </View>
                                <View style={bottomSheetStyles.genderContainer}>
                                    <Text style={bottomSheetStyles.genderText}>Suspense</Text>
                                </View>
                                <Text style={bottomSheetStyles.description}>{selectedBook.descricao}</Text>
                            </View>
                            <View style={bottomSheetStyles.ratingContainer}>
                                <Text style={bottomSheetStyles.ratingTitle}>Avaliação</Text>
                                <AirbnbRating
                                    count={5}
                                    defaultRating={selectedBook.avaliacao || 0}
                                    size={20}
                                    showRating={false}
                                    unSelectedColor="#000"
                                    starContainerStyle={bottomSheetStyles.starRating}
                                    isDisabled={true}
                                />
                                {/* <Text style={[bottomSheetStyles.status,
                                    { color: selectedBook.estado.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }
                                ]}>
                                    {selectedBook.estado}
                                </Text> */}
                            </View>
                            <View style={bottomSheetStyles.buttonContainer}>
                                <Button
                                    size="md"
                                    variant="solid"
                                    action="primary"
                                    // isDisabled={selectedBook.estado.toLowerCase() !== 'd'}
                                    isFocusVisible={false}
                                    style={bottomSheetStyles.buttonPrincipal}
                                >
                                    <ButtonText style={bottomSheetStyles.buttonPrincipalText}>
                                        Continuar com Empréstimo
                                    </ButtonText>
                                </Button>
                                <Button
                                    size="md"
                                    variant="solid"
                                    action="primary"
                                    isDisabled={false}
                                    isFocusVisible={false}
                                    style={bottomSheetStyles.buttonSecondary}
                                >
                                    <ButtonText style={bottomSheetStyles.buttonSecondaryText}>
                                        Ver Livros
                                    </ButtonText>
                                </Button>
                            </View>
                        </>
                    )}
                </BottomSheetScrollView>
            </BottomSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        width: "100%",
        marginTop: 20,
    },
    contentContainer: {
        marginHorizontal: 20,
        padding: 10,
    },
    favoriteBookContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        height: 100,
    },
    imageContainer: {
        width: 80,
        height: 80
    },
    bookImage: {
        borderRadius: 15,
        width: 80,
        height: 80
    },
    textContainer: {
        gap: 6,
        width: "70%",
        marginLeft: 10,
        left: 10
    },
    bookTitle: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold"
    },
    bookStatus: {
        color: "#34A853",
        fontSize: 18,
        fontWeight: "semibold"
    },
    iconContainer: {
        alignSelf: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    }
  
});

const bottomSheetStyles = StyleSheet.create({
    //BottomSheetStyles
    bookContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    bookStyle: {
        width: 237,
        height: 310,
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