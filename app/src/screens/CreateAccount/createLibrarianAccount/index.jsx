


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
import ModalComp from "../../../components/Modal/1Modal";


const CreateLibrarianAccount = () => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <BackHeader onPress={() => console.log("a")}
                title="Bem Vindo"
                subtitle="Crie sua Conta"
                margin = {10} />
            <View style={styles.inputContainer}>
                <InputTest
                    inputText="Seu nome completo"
                    formTitle="Nome" 
                    inputSize={15}/>
                <InputTest
                    inputText="Seu email"
                    formTitle="Email"
                    inputSize={15}/>
                <InputTest
                    inputText="Seu RM"
                    formTitle="RM"
                    inputSize={15}/>
                <InputTest
                    inputText="Sua senha"
                    formTitle="Senha"
                    inputType="password"
                    inputSize={15}/>
                <InputTest
                    inputText="Confirme sua Senha"
                    formTitle="Confirmar Senha"
                    inputType="password"
                    inputSize={15}/>
                    
            </View>
            <View style={styles.buttonContainer}>
                <ModalComp/>
            </View>
            <View style={styles.EnterAccountContainer}>
                <Text style={styles.textAccount}>Já tem uma conta?</Text>
            <Button
                    size="md"
                    variant="link"
                    action="primary"
                    style={styles.linkButton}
                >
                    <ButtonText style={styles.textButton}>Entre agora</ButtonText>
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
        backgroundColor: '#fff',
        marginTop:40,
        gap: 35,
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
        marginTop:55,
    },
    EnterAccountContainer:{
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


export default CreateLibrarianAccount;