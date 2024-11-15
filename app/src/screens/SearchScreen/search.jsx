import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    SearchIcon,
    Input,
    InputSlot,
    InputIcon,
    InputField
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, } from "react-native"
import { MoveLeft, Search } from "lucide-react-native";
//Componentes Utilizados
import MainHeader from "../../components/MainHeader";
//Imagens Utilizadas

//Inicio Do Codigo

export default function SearchScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <MainHeader title="Pesquisar" icon1={MoveLeft} onPress={() => navigation.navigate("Home")} />
                </View>
                <View>
                    <Input style={styles.searchbarContainer}>
                        <InputSlot style={styles.inputSlot}>
                            <InputIcon as={Search} size={'xl'}/>
                        </InputSlot>
                        <InputField placeholder="Pesquisar..." style={styles.searchText}/>
                    </Input>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        flexDirection:"row",
        paddingLeft:10,
        alignItems:"center",
        marginTop:20,
    },
    inputSlot:{
        marginRight:20
    },
    searchText:{
        fontSize:18,
        top:1
    }
});