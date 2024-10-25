import { useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonText,
} from "@gluestack-ui/themed"
import { MotiView } from "moti"
import { StyleSheet, Text, View, Alert } from "react-native"
import { config } from "@gluestack-ui/config"
import BackHeader from "../../../Components/BackHeader";
import InputTest from "../../../Components/InputTest";
import ModalComp from "../../../Components/Modal/1Modal";
import axios from "axios";

const SignInStudent = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [rm, setRM] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    function signUp() {
        auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <BackHeader onPress={() => navigation.navigate('StudentScreen')}
                    title="Bem Vindo"
                    subtitle="Crie sua Conta" />
                <View style={styles.inputContainer}>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: 0, }}
                        transition={{ duration: 3000, type: "spring" }}>
                        <InputTest
                            inputText="Seu nome completo"
                            formTitle="Nome"
                            inputSize={15}
                            valuee={nome}
                            onChangeText={text => setNome(text)}
                        />
                    </MotiView>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: -0 }}
                        transition={{ duration: 4000, type: "spring" }}
                    >
                        <InputTest
                            inputText="Seu email"
                            formTitle="Email"
                            inputSize={15}
                            valuee={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </MotiView>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: -0 }}
                        transition={{ duration: 5000, type: "spring" }}
                    >
                        <InputTest
                            inputText="Seu RM"
                            formTitle="RM"
                            inputSize={15}
                            kbtype="phone-pad"
                            valuee={rm}
                            onChangeText={text => setRM(text)}
                        />
                    </MotiView>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: -0 }}
                        transition={{ duration: 6000, type: "spring" }}
                    >
                        <InputTest
                            inputText="Sua senha"
                            formTitle="Senha"
                            inputType="password"
                            inputSize={15}
                            valuee={senha}
                            onChangeText={text => setSenha(text)}
                        />
                    </MotiView>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: -0 }}
                        transition={{ duration: 7000, type: "spring", }}
                    >
                        <InputTest
                            inputText="Confirme sua Senha"
                            formTitle="Confirmar Senha"
                            inputType="password"
                            inputSize={15}
                            valuee={confirmSenha}
                            onChangeText={text => setConfirmSenha(text)}
                        />
                    </MotiView>
                </View>
                <MotiView
                    from={{ translateY: 110, }}
                    animate={{ translateY: 0 }}
                    transition={{ duration: 3000, delay: 1000 }}>
                    <View style={styles.buttonContainer}>
                        <ModalComp onPress={() => signUp()} />
                    </View>
                </MotiView>
                <View style={styles.EnterAccountContainer}>
                    <MotiView
                        from={{ translateX: -230 }}
                        animate={{ translateX: 0 }}
                        transition={{ duration: 1000, delay: 1500, type: "timing" }}>
                        <Text style={styles.textAccount}>Já tem uma conta?</Text>
                    </MotiView>
                    <MotiView
                        from={{ translateX: 200 }}
                        animate={{ translateX: 0 }}
                        transition={{ duration: 1000, delay: 1500, type: "timing" }}>
                        <Button
                            onPress={() => navigation.navigate('LoginStudent')}
                            size="md"
                            variant="link"
                            action="primary"
                            style={styles.linkButton}
                        >
                            <ButtonText style={styles.textButton}>Entre agora</ButtonText>
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


export default SignInStudent;