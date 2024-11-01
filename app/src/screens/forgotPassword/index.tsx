import React, {useState} from "react"
import { Center, View, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, Image, Button, ButtonText } from "@gluestack-ui/themed"
import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import { MoveLeft } from "lucide-react-native"
import { OptionGroup } from "./optionGroup"
import emailBulk from "../../../assets/Email-Bulk.png"
import phoneFill from "../../../assets/Phone-Fill.png"




const printOptionLabel = (item) => {
    console.log(item)
}

//TODO Arrumar icone

const ForgotPassword = () => (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <MoveLeft color={"#000"} size={30} />
        </View>
        <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Esqueci minha senha</Text>
            <Text style={styles.contentSubtitle}>Selecione a forma de contato para redefinir sua senha</Text>
            <View style={styles.optionContainer}>
                <OptionGroup
                    options={['Email','Telefone']}
                    doSomethingAfterClick={printOptionLabel}

                />
            </View>
            <View>
                <Button style={styles.buttonContainer}>
                    <ButtonText style={styles.buttonText}>Continuar</ButtonText>
                </Button>
            </View>
        </View>
    </SafeAreaView>

);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        width: "100%",
        padding: 20,

    },
    contentContainer: {
        width: "90%",
        padding: 30,
        gap: 10
    },
    contentTitle: {
        color: "#000",
        fontSize: 26,
        fontWeight: "bold",
    },
    contentSubtitle: {
        color: "#A6A6A6",
    },
    optionContainer: {
        flexDirection: "row",
        marginTop: 20,
        gap: 20,
        right: 5
    },
    contentOption: {
        backgroundColor: "#f1f1f1",
        width: 170,
        height: 170,
        borderRadius: 20,
        flexDirection: "column",
        justifyContent: "center",
    },
    Icon: {
        width: 30,
        height: 30,
        left: 15
    },
    textContainer: {
        alignSelf: "flex-end",
        top: 30,
        right: 30
    },
    optionTitle: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    optionSubtitle: {
        color: "#a6a6a6",
        fontSize: 13,
    },
    buttonContainer: {
        backgroundColor: "#ee2d32",
        width: "115%",
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        top: 20
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    }
});

export default ForgotPassword