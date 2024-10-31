import { useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonText,
} from "@gluestack-ui/themed"
import { MotiView } from "moti"
import { StyleSheet, Text, View, Alert, Pressable } from "react-native"
import { config } from "@gluestack-ui/config"
import BackHeader from "../../components/BackHeader";
import InputTest from "../../components/InputTest";
import ModalComp from "../../components/Modal/1Modal";

const RegisterBooks = ({ navigation }) => {
    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <BackHeader onPress={() => console.log("teste")}
                    title="Bem Vindo"
                    subtitle="Cadastre um Livro" />
                <View style={styles.inputContainer}>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: 0, }}
                        transition={{ duration: 3000, type: "spring" }}>
                        <InputTest
                            inputText="Nome do Livro"
                            formTitle="Nome do Livro"
                            inputSize={15}
                            // valuee={nome}
                            // onChangeText={text => setNome(text)}
                        />
                    </MotiView>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: -0 }}
                        transition={{ duration: 4000, type: "spring" }}
                    >
                        <InputTest
                            inputText="Numero de cadastro"
                            formTitle="Codigo do livro"
                            inputSize={15}
                            // valuee={email}
                            // onChangeText={text => setEmail(text)}
                        />
                    </MotiView>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: -0 }}
                        transition={{ duration: 5000, type: "spring" }}
                    >
                        <InputTest
                            inputText=""
                            formTitle="info"
                            inputSize={15}
                            kbtype="phone-pad"
                            // valuee={rm}
                            // onChangeText={text => setRM(text)}
                        />
                    </MotiView>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: -0 }}
                        transition={{ duration: 6000, type: "spring" }}
                    >
                        <InputTest
                            inputText=""
                            formTitle="Info"
                            inputSize={15}
                            // valuee={senha}
                            // onChangeText={text => setSenha(text)}
                        />
                    </MotiView>
                </View>
                <MotiView
                    from={{ translateY: 110, }}
                    animate={{ translateY: 0 }}
                    transition={{ duration: 3000, delay: 1000 }}>
                    <View style={styles.buttonContainer}>
                            <ModalComp buttonTitle={"Cadastrar Livro"} onPress={() => console.log("teste")}/>
                    </View>
                </MotiView>
                <View style={styles.EnterAccountContainer}>
                    <MotiView
                        from={{ translateX: -230 }}
                        animate={{ translateX: 0 }}
                        transition={{ duration: 1000, delay: 1500, type: "timing" }}>
                        <Text style={styles.textAccount}>Quer atualizar um livro?</Text>
                    </MotiView>
                    <MotiView
                        from={{ translateX: 200 }}
                        animate={{ translateX: 0 }}
                        transition={{ duration: 1000, delay: 1500, type: "timing" }}>
                        <Button
                            onPress={() => console.log("teste")}
                            size="md"
                            variant="link"
                            action="primary"
                            style={styles.linkButton}
                        >
                            <ButtonText style={styles.textButton}>Atualize aqui</ButtonText>
                        </Button>
                    </MotiView>
                </View>
            </SafeAreaView>
        </GluestackUIProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
    },
    inputContainer: {
        backgroundColor: '#fff',
        marginTop: 40,
        gap: 35,
    },
    buttonSolid: {
        backgroundColor: "#EE2D32",
        borderRadius: 30,
        width: 327,
        height: 56,
        marginBottom: 8,
    },
    buttonContainer: {
        alignSelf: "center",
        marginTop: 55,
    },
    EnterAccountContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 7,
        alignSelf: 'center',
    },
    textAccount: {
        fontSize: 16,
    },
    textButton: {
        color: '#EE2D32',
        fontSize: 16,
    },
    textTerms: {
        fontSize: 16,
        flexDirection: 'column-reverse',
        alignSelf: 'center',
        marginTop: 120,
    },
    termsContainer: {
        height: 20,
        flexDirection: 'row',
        alignItems: "center",
        gap: 7,
        alignSelf: 'center',
        marginTop: 650,
        position: "absolute"
    },
});


export default RegisterBooks;