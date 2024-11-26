import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Pressable, StyleSheet, Text, View, } from "react-native"
//Componentes Utilizados

//Imagens Utilizadas

//Inicio Do Codigo

export default function AdminLibrarian({navigation}) {
    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <Pressable onPress={() => navigation.navigate("RegisterBooks")}>
                            <Text>Adicionar Livro</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("RegisterGender")}>
                            <Text>Adicionar Genero</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("RegisterAutor")}>
                            <Text>Adicionar Autores</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GluestackUIProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent:"center",
        gap:10
    },
});