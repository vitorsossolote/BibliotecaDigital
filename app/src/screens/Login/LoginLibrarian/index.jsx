import { useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StyleSheet, Text, View, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonText,
} from "@gluestack-ui/themed";
import { MotiView } from "moti";
import { config } from "@gluestack-ui/config";
import BackHeader from "../../../components/BackHeader/index";
import InputTest from "../../../components/InputTest/index";
import PasswordInput from "../../../components/InputTest/PasswordInput";
import { CommonActions } from '@react-navigation/native';
import { useAuth } from "../../../contexts/AuthContext";

const LoginLibrarian = ({ navigation }) => {
    const { signInLibrarian } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            console.log('Tentando login com:', { email, senha });
            const response = await axios.post('http://10.0.2.2:8085/api/loginLibrarian', {
                email,
                senha,
            });
    
            console.log('Resposta do login:', response.data);
    
            if (response.data?.librarianToken && response.data?.librarian) {
                await signInLibrarian(response.data.librarianToken, response.data.librarian);
            } else {
                console.error('Dados de resposta inválidos:', response.data);
                throw new Error('Dados de resposta inválidos');
            }
        } catch (err) {
            console.error('Erro detalhado no login:', err.response?.data || err.message);
            Alert.alert('Erro', err.response?.data?.message || 'Ocorreu um erro ao fazer login');
        }
    };

    function signInFirebase() {
        auth()
            .signInWithEmailAndPassword(email, senha)
            .then(() => {
                console.log('Usuário esta Autenticado');
            })
            .catch(error => {
                if (error.code === 'auth/invalid-credential') {
                    console.log('A credencial de autenticação fornecida está incorreta, malformada ou expirou');
                }

                if (error.code === 'auth/email-already-in-use') {
                    console.log('Esse email já foi utilizado');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('Esse email é invalido');
                }

                if (error.code === 'auth/app-deleted') {
                    console.log('O banco de dados não foi localizado.');
                }

                if (error.code === 'auth/expired-action-code') {
                    console.log('O código da ação o ou link expirou.');
                }

                if (error.code === 'auth/invalid-action-code') {
                    console.log('O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.');
                }

                if (error.code === 'auth/user-disabled') {
                    console.log('O usuário correspondente à credencial fornecida foi desativado.');
                }

                if (error.code === 'auth/user-not-found') {
                    console.log('O usuário não correponde à nenhuma credencial.');
                }

                if (error.code === 'auth/weak-password') {
                    console.log('A senha é muito fraca.');
                }

                if (error.code === 'auth/account-exists-with-different-credential') {
                    console.log('E-mail já associado a outra conta.');
                }
                console.error(error);
            });
    }

    function LoginFirebaseAndSql() {
        signInFirebase();
        handleLogin();
    }

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <BackHeader onPress={() => navigation.navigate('LibrarianScreen')}
                    title="Entrar"
                    subtitle="Entre na sua Conta" />
                <View style={styles.inputContainer}>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: 0 }}
                        transition={{ duration: 3000, type: "spring" }}>
                        <InputTest
                            inputText="Seu Email"
                            formTitle="Email"
                            valuee={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </MotiView>
                    <MotiView
                        from={{ translateX: -50 }}
                        animate={{ translateX: 0 }}
                        transition={{ duration: 4000, type: "spring" }}>
                        <PasswordInput
                            inputText="Sua senha"
                            formTitle="Senha"
                            valuee={senha}
                            onChangeText={text => setSenha(text)}
                            inputType="password"
                        />
                    </MotiView>
                </View>
                <View style={styles.buttonContainer}>
                        <Button
                            onPress={handleLogin}
                            size="md"
                            variant="solid"
                            action="primary"
                            style={styles.buttonSolid}
                            disabled={loading}
                        >
                            <ButtonText>{loading ? 'Entrando...' : 'Entrar'}</ButtonText>
                        </Button>
                </View>
                <View style={styles.createAccountContainer}>
                    <MotiView
                        from={{ opacity: 0, }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1000, }}>
                        <Text style={styles.textAccount}>Não tem uma conta?</Text>
                    </MotiView>
                    <MotiView
                        from={{ translateX: 300 }}
                        animate={{ translateX: 0 }}
                        transition={{ duration: 3000, }}
                    >
                        <Button
                            onPress={() => navigation.navigate("LibrarianScreen")}
                            size="md"
                            variant="link"
                            action="primary"
                            style={styles.linkButton}
                        >
                            <ButtonText style={styles.textButton}>Crie Agora</ButtonText>
                        </Button>
                    </MotiView>
                </View>
            </SafeAreaView>
        </GluestackUIProvider>
    );
};

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
    buttonContainer: {
        alignSelf: "center",
        marginTop: 50,
    },
    createAccountContainer: {
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
        top: 3
    },
    termsContainer: {
        height: 20,
        flexDirection: 'column',
        alignItems: "center",
        alignSelf: 'center',
        justifyContent: "flex-end",
        top: 190,
    },
});

export default LoginLibrarian;