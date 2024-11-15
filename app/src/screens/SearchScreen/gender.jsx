import React from "react";
import {
    GluestackUIProvider,
    Image,
    SafeAreaView,
    ScrollView,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, } from "react-native"
import { MoveLeft, Search } from 'lucide-react-native'
//Componentes Utilizados
import MainHeader from "../../components/MainHeader";
//Imagens Utilizadas
import book1 from "../../../assets/book5.png"
//Inicio Do Codigo

export default function SearchGenderScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <MainHeader title="Gêneros" icon1={MoveLeft} icon2={Search} onPress={() => navigation.navigate("Home")} onPress2={() => navigation.navigate("SearchScreen")}/>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.genderSection}>
                        <ScrollView horizontal={true} style={styles.genderContainer} showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: "row", gap: 15 }}>
                                <View style={styles.selectedGenderContainer}>
                                    <Text style={styles.selectedGenderText}>Todos</Text>
                                    <View style={{ height: 3, backgroundColor: "#ee2d32", width: 30 }} />
                                </View>
                                <View style={styles.genderTextContainer}>
                                    <Text style={styles.unselectedGenderText}>Ação</Text>
                                </View>
                                <View style={styles.genderTextContainer}>
                                    <Text style={styles.unselectedGenderText}>Terror</Text>
                                </View>
                                <View style={styles.genderTextContainer}>
                                    <Text style={styles.unselectedGenderText}>Suspense</Text>
                                </View>
                                <View style={styles.genderTextContainer}>
                                    <Text style={styles.unselectedGenderText}>Romance</Text>
                                </View>
                                <View style={styles.genderTextContainer}>
                                    <Text style={styles.unselectedGenderText}>Ficção</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.bookSection}>
                        <View style={{flexDirection:"row"}}>
                            <View style={styles.bookVerticalContainer}>
                                <View style={styles.bookContainer}>
                                    <Image source={book1} style={styles.bookImage} />
                                    <Text style={styles.bookTitle}> The Da Vinci Code</Text>
                                    <Text style={styles.bookStatus}> Disponivel</Text>
                                </View>
                            </View>
                            <View style={styles.bookVerticalContainer}>
                                <View style={styles.bookContainer}>
                                    <Image source={book1} style={styles.bookImage} />
                                    <Text style={styles.bookTitle}> The Da Vinci Code</Text>
                                    <Text style={styles.bookStatus}> Disponivel</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <View style={styles.bookVerticalContainer}>
                                <View style={styles.bookContainer}>
                                    <Image source={book1} style={styles.bookImage} />
                                    <Text style={styles.bookTitle}> The Da Vinci Code</Text>
                                    <Text style={styles.bookStatus}> Disponivel</Text>
                                </View>
                            </View>
                            <View style={styles.bookVerticalContainer}>
                                <View style={styles.bookContainer}>
                                    <Image source={book1} style={styles.bookImage} />
                                    <Text style={styles.bookTitle}> The Da Vinci Code</Text>
                                    <Text style={styles.bookStatus}> Disponivel</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <View style={styles.bookVerticalContainer}>
                                <View style={styles.bookContainer}>
                                    <Image source={book1} style={styles.bookImage} />
                                    <Text style={styles.bookTitle}> The Da Vinci Code</Text>
                                    <Text style={styles.bookStatus}> Disponivel</Text>
                                </View>
                            </View>
                            <View style={styles.bookVerticalContainer}>
                                <View style={styles.bookContainer}>
                                    <Image source={book1} style={styles.bookImage} />
                                    <Text style={styles.bookTitle}> The Da Vinci Code</Text>
                                    <Text style={styles.bookStatus}> Disponivel</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        width: "100%",
        marginTop: 15,
    },
    contentContainer: {
        marginLeft: 30,
        bottom: 10
    },
    textContainer: {
        flexDirection: "column-reverse",
        gap: 3,
    },
    subtitle: {
        color: "#A6A6A6",
        fontSize: 20,
    },
    title: {
        color: "#ee2d32",
        fontSize: 25,
        fontWeight: "bold",
    },
    genderSection: {
        marginTop: 40
    },
    genderContainer: {
        height: 30,
        flexDirection: "row",
    },
    genderTextContainer: {

    },
    selectedGenderContainer: {
        flexDirection: "column"
    },
    selectedGenderText: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
    },
    unselectedGenderText: {
        color: "#a6a6a6",
        fontSize: 18,
    },
    bookSection: {
        marginTop: 50
    },
    bookVerticalContainer: {
        width: "50%",
    },
    bookContainer: {
        backgroundColor: "#eed2",
        gap: 5,
    },
    bookImage: {
        width: 160,
        height: 160,
        borderRadius: 10
    },
    bookTitle: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        marginTop:3
    },
    bookStatus: {
        color: "#34A853",
        fontSize: 16,
        fontWeight: 'bold'
    }
});