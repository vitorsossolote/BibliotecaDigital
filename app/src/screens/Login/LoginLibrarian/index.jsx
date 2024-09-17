


import {useState,useEffect} from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Pressable,
    Heading,
    Input,
    InputField,
    Button,
    ButtonText,
} from "@gluestack-ui/themed"
import { StyleSheet, Text, View } from "react-native"
import { config } from "@gluestack-ui/config"
import { createIcons, icons } from 'lucide';
import BackHeader from "../../../components/BackHeader";
import InputTest from "../../../components/InputTest";


const teste = (val) => {
    console.log(val);
}

const LoginLibrarian = ({navigation}) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <BackHeader onPress={() => console.log("a")}
                title="Entrar"
                subtitle="Entre na sua Conta" />
            <View style={styles.inputContainer}>
                <InputTest
                    inputText="Seu Email"
                    formTitle="Email" />
                <InputTest
                    inputText="Sua senha"
                    formTitle="Senha"
                    inputType="password" />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    style={styles.buttonSolid}
                >
                    <ButtonText>Entrar</ButtonText>
                </Button>
            </View>
            <View style={styles.createAccountContainer}>
                <Text style={styles.textAccount}>Não tem uma conta?</Text>
            <Button
                    onPress ={()=> navigation.navigate('CreateLibrarian')}
                    size="md"
                    variant="link"
                    action="primary"
                    style={styles.linkButton}
                >
                    <ButtonText style={styles.textButton}>Crie Agora</ButtonText>
                </Button>
            </View>
                <Text style={styles.textTerms}>Criando uma conta você aceita nossos</Text>
            <View style={styles.termsContainer}>
            <Button
                    size="md"
                    variant="link"
                    action="primary"
                    style={styles.linkButton}
                >
                    <ButtonText style={styles.textButton}>Termos e Politicas de dados</ButtonText>
                </Button>
            </View>
        </SafeAreaView>
    </GluestackUIProvider>
);

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginTop: 40,
        padding: 20,
        gap: 50,
    },
    buttonSolid: {
        backgroundColor: "#EE2D32",
        borderRadius: 30,
        width: 327,
        height: 56,
        marginBottom: 8,
    },
    buttonContainer:{
        alignSelf:"center",
        marginTop:50,
    },
    createAccountContainer:{
        flexDirection:'row',
        alignItems:"center", 
        gap:7,
        alignSelf:'center',
    },
    textAccount:{
        fontSize:16,
    },
    textButton:{
        color:'#EE2D32',
        fontSize:16,
    },
    textTerms:{
        fontSize:16,
        flexDirection:'column-reverse',
        alignSelf:'center',
        marginTop:120,
    },
    termsContainer:{
        height:20,
        flexDirection:'row',
        alignItems:"center", 
        gap:7,
        alignSelf:'center',
        marginTop:650,
        position:"absolute"
    },
});


export default LoginLibrarian;