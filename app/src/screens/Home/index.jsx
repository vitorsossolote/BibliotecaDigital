//Tela Home 

//Bibliotecas Utilizadas
import React, { useRef, useMemo, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    Image,
    Button,
    ButtonText,
    Pressable
} from "@gluestack-ui/themed";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MotiView } from 'moti';
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, } from "react-native"
import { AirbnbRating } from "react-native-ratings";
import { Heart } from "lucide-react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
//Componentes Utilizados
import MainHeader from "../../components/MainHeader/index";
import Carrosel from "../../components/Carrousel/index";
import Reservar from "../../components/ReservarNovamente/index";
import Section from "../../components/Section/index";
import TrendingBooks from "../../components/TrendingBooks/index";
import TrendingGenders from "../../components/TrendingGenders/index";
import Authors from "../../components/Authors/index";

//Imagens Utilizadas
import heartImage from "../../../assets/Heart.png";
import book from "../../../assets/book2.png"
import marca from "../../../assets/genero3.png"

//Inicio Do Codigo
function signOut() {
    auth().signOut()
}

export default function Home({navigation}) {
    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], []);
    const [selectedBook, setSelectedBook] = React.useState(null); // Estado para armazenar o livro selecionado

    const handleCloseAction = () => bottomSheetref.current?.close();
    const handleOpenPress = (bookData) => {
        setSelectedBook(bookData); // Armazena os dados do livro selecionado
        bottomSheetref.current?.expand();
        console.log(bookData.id)
    };

    const [isFavorited, setIsFavorited] = useState(false);

    const handlePress = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={{ backgroundColor: "#fafafa" }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MainHeader title="Inicio" />
                    <MotiView from={{ translateX: 200 }} animate={{ translateX: 0 }} transition={{ duration: 3000, type: "spring" }}>
                        <Carrosel onPress={handleOpenPress} />
                    </MotiView>
                                    <Button onPress={() => navigation.navigate("RegisterBooks")} style={{width:200,height:50,alignSelf:"center",backgroundColor:"#ee2d32" }}>
                                        <ButtonText>REGISTRAR BUK</ButtonText>
                                    </Button>
                    <MotiView from={{ translateX: -200 }} animate={{ translateX: 0 }} transition={{ duration: 3000, type: "spring" }}>
                        <Reservar onPress={() => console.log("teste")} />
                    </MotiView>
                    <MotiView from={{ translateY: 200 }} animate={{ translateY: 0 }} trainsition={{ duration: 3000, type: "timing" }}>
                        <Section title="Melhores da Semana" onPress={() => navigation.navigate("SearchScreen")} />
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
                    enablePanDownToClose={true}>
                    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                        {selectedBook && ( // Só renderiza se houver um livro selecionado
                            <>
                                <View style={styles.bookContainer}>
                                    <Image source={selectedBook.image} alt="livro" style={styles.bookStyle} resizeMode="contain" />
                                </View>
                                <View style={styles.detailContainer}>
                                    <View style={styles.headerContainer}>
                                        <Text style={styles.title}>{selectedBook.name}</Text>
                                        <Pressable size="md" bg="transparent" style={{ top: 7 }} onPress={handlePress}>
                                            {
                                                isFavorited ? (
                                                    <>
                                                        <MotiView from={{ rotateY: "0deg" }} animate={{ rotateY: "360deg" }}>
                                                            <Ionicons name="heart" size={26} color={"#ee2d32"} />
                                                        </MotiView>
                                                    </>
                                                ) :
                                                    <><MotiView from={{ rotateY: "360deg" }} animate={{ rotateY: "0deg" }}>
                                                        <Ionicons name="heart-outline" size={26} color={"#ee2d32"} />
                                                    </MotiView>
                                                    </>
                                            }

                                        </Pressable>
                                    </View>
                                    <View style={styles.genderContainer}>
                                        <Text style={styles.genderText}>Suspense</Text>
                                    </View>
                                    <Text style={styles.description}>{selectedBook.description}</Text>
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
                                    { color: selectedBook.status.toLowerCase() === 'disponivel' ? '#34A853' : '#ee2d32' }]}>
                                        {selectedBook.status}
                                    </Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        size="md"
                                        variant="solid"
                                        action="primary"
                                        isDisabled={selectedBook.status.toLowerCase() !== 'disponivel'}
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
});