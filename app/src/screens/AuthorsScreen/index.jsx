import React, { useRef, useMemo } from "react";
import { View, Text, Image, Button, ButtonText } from "@gluestack-ui/themed"
import { ScrollView, StyleSheet, Pressable, SafeAreaView } from "react-native"
import { BookImage, MoveLeft } from "lucide-react-native"
import { Rating, AirbnbRating } from 'react-native-ratings';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";


import autor1 from "../../../assets/autor1.png"
import book5 from "../../../assets/book5.png"
import book6 from "../../../assets/book6.png"
import book7 from "../../../assets/book7.png"
import book8 from "../../../assets/book8.png"
import Heart from "../../../assets/Heart.png";
import book from "../../../assets/book2.png"
import marca from "../../../assets/genero3.png"



export default function AuthorsScreen({ navigation }) {
    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], [])

    const handleCloseAction = () => bottomSheetref.current?.close()
    const handleOpenPress = () => bottomSheetref.current?.expand();

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable onPress={() => navigation.navigate("Home")}>
                            <MoveLeft color={"#000"} size={35} />
                        </Pressable>
                        <Text style={styles.headerText}>Autores</Text>
                    </View>
                    <View style={styles.authorContentContainer}>
                        <Image source={autor1} alt="autor" resizeMode="container" style={styles.authorImage} />
                        <Text style={styles.authorGenderText}>Suspense</Text>
                        <Text style={styles.authorNameText}>Tess Gunty</Text>
                        <View style={styles.ratingContainer}>
                            <AirbnbRating
                                count={5}
                                defaultRating={4}
                                size={35}
                                showRating={false}
                                unSelectedColor="#000"
                                starContainerStyle={styles.starRating}
                                readonly={true}
                            />
                            <Text style={styles.ratingNumber}>(4.0)</Text>
                        </View>
                    </View>
                    <View style={styles.aboutContainer}>
                        <Text style={styles.aboutHeader}>Sobre</Text>
                        <Text style={styles.desc}>Gunty was born and raised in South Bend, Indiana.She graduated from the University of Notre Dame with a Bachelor of Arts in English and from New York University.</Text>
                    </View>
                    <View style={styles.bookContainer}>
                        <Text style={styles.bookHeader}>Livros</Text>
                        <View style={{ flexDirection: "column", gap: 30 }}>
                            <View style={styles.bookGaleryContainer}>
                                <View style={styles.bookContent}>
                                    <Pressable onPress={handleOpenPress}>
                                        <Image source={book5} alt="livro" resizeMode="contain" style={styles.bookImage} />
                                    </Pressable>
                                    <Text style={styles.bookName}>The Da vinci Code</Text>
                                    <Text style={styles.bookStatus}>Disponivel</Text>
                                </View>
                                <View style={styles.bookContent}>
                                    <Pressable onPress={handleOpenPress}>
                                        <Image source={book6} alt="livro" resizeMode="contain" style={styles.bookImage} />
                                    </Pressable>
                                    <Text style={styles.bookName}>Carrie Fisher</Text>
                                    <Text style={styles.bookStatus}>Disponivel</Text>
                                </View>
                            </View>
                            <View style={styles.bookGaleryContainer}>
                                <View style={styles.bookContent}>
                                    <Pressable onPress={handleOpenPress}>
                                        <Image source={book7} alt="livro" resizeMode="contain" style={styles.bookImage} />
                                    </Pressable>
                                    <Text style={styles.bookName}>The Good Sister</Text>
                                    <Text style={styles.bookStatus}>Disponivel</Text>
                                </View>
                                <View style={styles.bookContent}>
                                    <Pressable onPress={handleOpenPress}>
                                        <Image source={book8} alt="livro" resizeMode="contain" style={styles.bookImage} />
                                    </Pressable>
                                    <Text style={styles.bookName}>The Waiting</Text>
                                    <Text style={styles.bookStatus}>Disponivel</Text>
                                </View>
                            </View>
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
                <BottomSheetScrollView>
                    <View style={bottomSheetStyles.bookContainer}>
                        <Image source={book} alt="livro" style={bottomSheetStyles.bookStyle} resizeMode="contain" />
                    </View>
                    <View style={bottomSheetStyles.detailContainer}>
                        <View style={bottomSheetStyles.headerContainer}>
                            <Text style={bottomSheetStyles.title}>The Kite Runner</Text>
                            <Pressable
                                size="md"
                                bg="transparent"
                            >
                                <Image source={Heart} alt="heart" resizeMode="contain" style={bottomSheetStyles.icon} />
                            </Pressable>
                        </View>
                        <View style={bottomSheetStyles.imageContainer}>
                            <Image source={marca} alt="marca1" resizeMode="contain" style={bottomSheetStyles.image} />
                        </View>
                        <Text style={bottomSheetStyles.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga neque quis necessitatibus ipsam laudantium tempora sit quidem esse adipisci beatae.</Text>
                    </View>
                    <View style={bottomSheetStyles.ratingContainer}>
                        <Text style={bottomSheetStyles.ratingTitle}>Avaliação</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={1}
                            size={20}
                            showRating={false}
                            unSelectedColor="#000"
                            starContainerStyle={bottomSheetStyles.starRating}
                            readonly={true}
                        />
                        <Text style={bottomSheetStyles.status}>Disponivel</Text>
                    </View>
                    <View style={bottomSheetStyles.buttonContainer}>
                        <Button
                            size="md"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}
                            style={bottomSheetStyles.buttonPrincipal}
                        >
                            <ButtonText style={bottomSheetStyles.buttonPrincipalText}>Continuar com Empréstimo</ButtonText>
                        </Button>
                        <Button
                            size="md"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}
                            style={bottomSheetStyles.buttonSecondary}
                        >
                            <ButtonText style={bottomSheetStyles.buttonSecondaryText}>Ver Livros</ButtonText>
                        </Button>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#fafafa"
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
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        left: 20
    },
    ratingNumber: {
        fontSize: 27,
        color: "#000",
        fontWeight: "bold",
        left: 10
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
        fontWeight: 500
    },
    bookContainer: {
        left: 30,
        top: 70,
        width: "85%",
        gap: 8,
        height: 450,
    },
    bookHeader: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",

    },
    bookGaleryContainer: {
        top: 10,
        flexDirection: "row",
        gap: 30,
    },
    bookContent: {
        flexDirection: "column",
        gap: 5,
        flex: 1,
    },
    bookImage: {
        borderRadius: 20
    },
    bookName: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        left: 4,
        top: 4
    },
    bookStatus: {
        fontSize: 16,
        color: "#34A853",
        fontWeight: "bold",
        left: 4
    },
});

const bottomSheetStyles = StyleSheet.create({
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