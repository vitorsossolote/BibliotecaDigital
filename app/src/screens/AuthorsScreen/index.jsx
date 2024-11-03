import React from "react"
import { View, Text, Image } from "@gluestack-ui/themed"
import { ScrollView, StyleSheet,Pressable } from "react-native"
import { BookImage, MoveLeft } from "lucide-react-native"
import { Rating, AirbnbRating } from 'react-native-ratings';

import autor1 from "../../../assets/autor1.png"
import book5 from "../../../assets/book5.png"
import book6 from "../../../assets/book6.png"
import book7 from "../../../assets/book7.png"
import book8 from "../../../assets/book8.png"

const AuthorsScreen = ({ navigation }) => (
    //TODO arrumar scrollView
    <ScrollView>
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
                            <Image source={book5} alt="livro" resizeMode="contain" style={styles.bookImage} />
                            <Text style={styles.bookName}>The Da vinci Code</Text>
                            <Text style={styles.bookStatus}>Disponivel</Text>
                        </View>
                        <View style={styles.bookContent}>
                            <Image source={book6} alt="livro" resizeMode="contain" style={styles.bookImage} />
                            <Text style={styles.bookName}>Carrie Fisher</Text>
                            <Text style={styles.bookStatus}>Disponivel</Text>
                        </View>
                    </View>
                    <View style={styles.bookGaleryContainer}>
                        <View style={styles.bookContent}>
                            <Image source={book7} alt="livro" resizeMode="contain" style={styles.bookImage} />
                            <Text style={styles.bookName}>The Good Sister</Text>
                            <Text style={styles.bookStatus}>Disponivel</Text>
                        </View>
                        <View style={styles.bookContent}>
                            <Image source={book8} alt="livro" resizeMode="contain" style={styles.bookImage} />
                            <Text style={styles.bookName}>The Waiting</Text>
                            <Text style={styles.bookStatus}>Disponivel</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        top: 20
    },
    header: {
        alignSelf: "flex-start",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
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

    },
    bookHeader: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",

    },
    bookGaleryContainer: {
        top: 10,
        flexDirection: "row",
        gap: 30
    },
    bookContent: {
        flexDirection: "column",
        gap: 5,
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
    }

});

export default AuthorsScreen