import React, { useState, useEffect } from "react";
import {
    GluestackUIProvider,
    Image,
    SafeAreaView,
    ScrollView,
    Input,
    InputSlot,
    InputIcon,
    InputField
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View,FlatList,Pressable } from "react-native"
import { MoveLeft, Search } from 'lucide-react-native'
import { useAuth } from '../../contexts/AuthContext';
//Componentes Utilizados
import MainHeader from "../../components/MainHeader";
//Imagens Utilizadas
import authorImage from "../../../assets/autor1.png";
import book from "../../../assets/book.png"
//Inicio Do Codigo

export default function SearchAuthorScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const { autor } = useAuth();
    const [list, setList] = useState(autor);
    useEffect(() => {
        if (searchText === '') {
            setList(autor);
        } else {
            setList(
                autor.filter(
                    (item) =>
                        item.nome_autor.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                )
            );
        }
    }, [searchText]);
    const RenderAutorItem = ({ data }) => (
        <Pressable 
            onPress={() => navigation.navigate("AuthorsScreen", { author: data })}
            style={styles.authorsSection}
        >
            <View style={styles.authorsContainer}>
                <View styles={styles.authorsImageContainer}>
                    <Image style={styles.authorsImage} source={data.image ? { uri: data.image } : book} />
                </View>
                <View style={styles.authorTextContainer}>
                    <Text style={styles.authorsTitle}>{data.nome_autor}</Text>
                    <Text style={styles.authorsDesc}>{data.sobre}</Text>
                </View>
            </View>
        </Pressable>
    );
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <MainHeader title="Autores" icon1={MoveLeft} onPress={() => navigation.navigate("Home")} onPress2={() => navigation.navigate("SearchScreen")} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Autores</Text>
                        <Text style={styles.subtitle}>Checar autores</Text>
                    </View>
                    <View>
                        <Input style={styles.searchbarContainer}>
                            <InputSlot style={styles.inputSlot}>
                                <InputIcon as={Search} size={'xl'} />
                            </InputSlot>
                            <InputField
                                placeholder="Pesquisar..."
                                style={styles.searchText}
                                value={searchText}
                                onChangeText={(t) => setSearchText(t)}
                            />
                        </Input>
                    </View>
                    <FlatList
                    data={list}
                    renderItem={({ item }) => <RenderAutorItem data={item} />}
                    keyExtractor={(item) => item.id}
                />
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
    },
    inputSlot: {
        marginRight: 20
    },
    searchText: {
        fontSize: 18,
        top: 1
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