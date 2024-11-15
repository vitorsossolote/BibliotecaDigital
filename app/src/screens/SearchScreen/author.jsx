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
import authorImage from "../../../assets/autor1.png";
//Inicio Do Codigo

export default function SearchAuthorScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <MainHeader title="Autores" icon1={MoveLeft} icon2={Search} onPress={() => navigation.navigate("Home")} onPress2={() => navigation.navigate("SearchScreen")}/>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Autores</Text>
                        <Text style={styles.subtitle}>Checar autores</Text>
                    </View>
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
                    <View style={styles.authorsSection}>
                        <View style={styles.authorsContainer}>
                            <View styles={styles.authorsImageContainer}>
                                <Image style={styles.authorsImage} source={authorImage} />
                            </View>
                            <View style={styles.authorTextContainer}>
                                <Text style={styles.authorsTitle}>John Freeman</Text>
                                <Text style={styles.authorsDesc}>American writer he  was the editor of the  </Text>
                            </View>
                        </View>
                        <View style={styles.authorsContainer}>
                            <View styles={styles.authorsImageContainer}>
                                <Image style={styles.authorsImage} source={authorImage} />
                            </View>
                            <View style={styles.authorTextContainer}>
                                <Text style={styles.authorsTitle}>John Freeman</Text>
                                <Text style={styles.authorsDesc}>American writer he  was the editor of the  </Text>
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
        margin: 30,
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
    authorsSection: {
        marginTop: 40,
        gap: 30
    },
    authorsContainer: {
        width: 290,
        flexDirection: "row",
        gap: 10,
    },
    authorsImageContainer: {

    },
    authorTextContainer: {
        flexDirection: "column",
        width: 210,
        gap: 3,
    },
    authorsImage: {
        width: 70,
        height: 70,
    },
    authorsTitle: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold"
    },
    authorsDesc: {
        color: "#66707A",
        fontSize: 16,
        fontWeight: "semibold",
        lineHeight: 22
    },
});