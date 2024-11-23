import React, { useRef, useMemo, useState } from "react"
import { View, Text, Pressable, Button, ButtonText } from "@gluestack-ui/themed"
import { StyleSheet, SafeAreaView, Image, ScrollView } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MotiView } from 'moti'
import MainHeader from "../../components/MainHeader/index"
import { MoveLeft } from 'lucide-react-native'
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AirbnbRating } from "react-native-ratings";
// Import your context
import { useAuth } from "../../contexts/AuthContext";
import book from "../../../assets/book7.png";

export default function FavoritesScreen({ navigation }) {
    const { user, favorites, removeFromFavorites, livros } = useAuth();
    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], []);
    const [book, setbook] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    
    const handleOpenPress = (livros) => {
        setbook(livros);

        // Check if book is already in favorites
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
                removeFromFavorites(livros.id);
                ToastAndroid.show("Removido dos favoritos", ToastAndroid.SHORT);
            } else {
                addToFavorites({
                    id: livros.id,
                    titulo: livros.titulo,
                    image: livros.image,
                    descricao: livros.descricao,
                    estado: livros.estado
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
        return favorites.map((livros) => (
            <View key={livros.id} style={styles.contentContainer}>
                <View style={styles.favoriteBookContainer}>
                    <Pressable onPress={handleOpenPress}>
                        <View style={styles.imageContainer}>
                            <Image source={book} style={styles.bookImage} />
                        </View>
                    </Pressable>
                    <View style={styles.textContainer}>
                        <Text style={styles.bookTitle}>{livros.titulo}</Text>
                        <Text style={[styles.bookStatus, 
                            { color: livros.estado.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }
                            ]}>{livros.estado}</Text>
                    </View>
                    <View>
                        <Pressable
                            size="md"
                            bg="transparent"
                            onPress={() => removeFromFavorites(livros.id)}
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
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    {livros && ( // Só renderiza se houver um livro selecionado
                        <>
                            <View style={styles.bookContainer}>
                                <Image source={livros.image ? { uri: livros.image } : book} alt="livro" style={styles.bookStyle} resizeMode="contain" />
                            </View>
                            <View style={styles.detailContainer}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.title}>{livros.titulo}</Text>
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
                                <View style={styles.genderContainer}>
                                    <Text style={styles.genderText}>Suspense</Text>
                                </View>
                                <Text style={styles.description}>{livros.descricao}</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingTitle}>Avaliação</Text>
                                <AirbnbRating
                                    count={5}
                                    defaultRating={livros.rating || 0}
                                    size={20}
                                    showRating={false}
                                    unSelectedColor="#000"
                                    starContainerStyle={styles.starRating}
                                    isDisabled={true}
                                />
                                <Text style={[styles.status,
                                // { color: book.status.toLowerCase() === 'disponivel' ? '#34A853' : '#ee2d32' }
                                ]}>
                                    {livros.estado}
                                </Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    size="md"
                                    variant="solid"
                                    action="primary"
                                    // isDisabled={book.status.toLowerCase() !== 'disponivel'}
                                    isFocusVisible={false}
                                    style={styles.buttonPrincipal}
                                >
                                    <ButtonText style={styles.buttonPrincipalText}>
                                        Continuar com Empréstimo
                                    </ButtonText>
                                </Button>
                                <Button
                                    size="md"
                                    variant="solid"
                                    action="primary"
                                    isDisabled={false}
                                    isFocusVisible={false}
                                    style={styles.buttonSecondary}
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
        padding: 20,
    },
    favoriteBookContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
    },
    imageContainer: {
        right: 15,
    },
    bookImage: {
        borderRadius: 15,
    },
    textContainer: {
        gap: 6,
        width: "70%"
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