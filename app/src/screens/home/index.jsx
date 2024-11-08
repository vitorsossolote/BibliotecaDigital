//Tela Home 

//Bibliotecas Utilizadas
import React, { useRef, useMemo } from "react";
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

//Componentes Utilizados
import MainHeader from "../../components/MainHeader/index";
import Carrosel from "../../components/Carrousel/index";
import Reservar from "../../components/ReservarNovamente/index";
import Section from "../../components/Section/index";
import TrendingBooks from "../../components/TrendingBooks/index";
import TrendingGenders from "../../components/TrendingGenders/index";
import Authors from "../../components/Authors/index";

//Imagens Utilizadas
import Heart from "../../../assets/Heart.png";
import book from "../../../assets/book2.png"
import marca from "../../../assets/genero3.png"

//Inicio Do Codigo
function signOut() {
    auth().signOut()
}

export default function Home({ navigation }) {
    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], [])

    const handleCloseAction = () => bottomSheetref.current?.close()
    const handleOpenPress = () => bottomSheetref.current?.expand();


    return (

        <GluestackUIProvider config={config}>
            <SafeAreaView style={{backgroundColor:"#fafafa"}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MainHeader title="Inicio" />
                    <MotiView from={{ translateX: 200 }} animate={{ translateX: 0 }} transition={{ duration: 3000, type: "spring" }}>
                        <Carrosel onPress={handleOpenPress} />
                    </MotiView>
                    <MotiView from={{ translateX: -200 }} animate={{ translateX: 0 }} transition={{ duration: 3000, type: "spring" }}>
                        <Reservar onPress={() => console.log("teste")} />
                    </MotiView>
                    <MotiView from={{ translateY: 200 }} animate={{ translateY: 0 }} trainsition={{ duration: 3000, type: "timing" }}>
                        <Section title="Melhores da Semana"  onPress={() => console.log("Clicou em ver todos")}/>
                        <TrendingBooks onPress={handleOpenPress} /> 
                    </MotiView>
                    <Section title="Melhores Generos" onPress={() => console.log("Clicou em ver todos")} />
                    <TrendingGenders />
                    <Section title="Autores" onPress={() => console.log("Clicou em ver todos")}/>
                    <Authors onPress1={() => navigation.navigate("AuthorsScreen")} onPress2={() => navigation.navigate("AuthorsScreen")} onPress3={() => navigation.navigate("AuthorsScreen")} onPress4={() => navigation.navigate("AuthorsScreen")}/>
                </ScrollView>

                {/* BottomSheet */}
                <BottomSheet
                    ref={bottomSheetref}
                    snapPoints={snapPoints}
                    index={-1}
                    enablePanDownToClose={true}>
                    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.bookContainer}>
                            <Image source={book} alt="livro" style={styles.bookStyle} resizeMode="contain" />
                        </View>
                        <View style={styles.detailContainer}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.title}>The Kite Runner</Text>
                                <Pressable
                                    size="md"
                                    bg="transparent"
                                >
                                    <Image source={Heart} alt="heart" resizeMode="contain" style={styles.icon} />
                                </Pressable>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image source={marca} alt="marca1" resizeMode="contain" style={styles.image} />
                            </View>
                            <Text style={styles.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga neque quis necessitatibus ipsam laudantium tempora sit quidem esse adipisci beatae.</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingTitle}>Avaliação</Text>
                            <AirbnbRating
                                count={5}
                                defaultRating={1}
                                size={20}
                                showRating={false}
                                unSelectedColor="#000"
                                starContainerStyle={styles.starRating}
                            />
                            <Text style={styles.status}>Disponivel</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                size="md"
                                variant="solid"
                                action="primary"
                                isDisabled={false}
                                isFocusVisible={false}
                                style={styles.buttonPrincipal}
                            >
                                <ButtonText style={styles.buttonPrincipalText}>Continuar com Empréstimo</ButtonText>
                            </Button>
                            <Button
                                size="md"
                                variant="solid"
                                action="primary"
                                isDisabled={false}
                                isFocusVisible={false}
                                style={styles.buttonSecondary}
                            >
                                <ButtonText style={styles.buttonSecondaryText}>Ver Livros</ButtonText>
                            </Button>
                        </View>
                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        </GluestackUIProvider>
    )
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
    imageContainer: {
        flex: 1,
        height: 30,
        width: 100,
        justifyContent: 'center',
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