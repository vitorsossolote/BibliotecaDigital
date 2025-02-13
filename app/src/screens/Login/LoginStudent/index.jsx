import { useState } from "react";
import { StyleSheet, Text, View, Alert, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
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

const LoginStudent = ({ navigation }) => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError('');

            // Validações básicas
            if (!email || !senha) {
                throw new Error('Por favor, preencha todos os campos');
            }

            // Solicitar permissão de notificação
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (!enabled) {
                throw new Error('Permissão de notificação não concedida');
            }

            // Obtenha o token FCM
            const fcmToken = await messaging().getToken();

            // Configuração da requisição
            const response = await axios.post('http://10.0.2.2:8085/api/loginStudent', {
                email,
                senha,
                fcmToken,
            }, {
                timeout: 10000, // 10 segundos de timeout
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Verificação da resposta
            if (response.data?.token && response.data?.student) {
                await signIn(response.data.token, response.data.student);
                navigation.navigate('Home');
            } else {
                throw new Error('Dados de resposta inválidos');
            }

        } catch (err) {
            console.error('Erro no login:', err);

            // Tratamento detalhado de erros
            if (err.response) {
                const errorMessage = err.response.data.message || 'Erro no servidor';
                setError(errorMessage);
                Alert.alert('Erro', errorMessage);
            } else if (err.request) {
                setError('Sem resposta do servidor');
                Alert.alert('Erro', 'Não foi possível conectar ao servidor');
            } else {
                setError(err.message);
                Alert.alert('Erro', err.message);
            }
        } finally {
            setLoading(false);
        }
    }

        // function signInFirebase() {
        //     auth()
        //         .signInWithEmailAndPassword(email, senha)
        //         .then(() => {
        //             console.log('Usuário esta Autenticado');
        //         })
        //         .catch(error => {
        //             if (error.code === 'auth/invalid-credential') {
        //                 console.log('A credencial de autenticação fornecida está incorreta, malformada ou expirou');
        //             }

        //             if (error.code === 'auth/email-already-in-use') {
        //                 console.log('Esse email já foi utilizado');
        //             }

        //             if (error.code === 'auth/invalid-email') {
        //                 console.log('Esse email é invalido');
        //             }

        //             if (error.code === 'auth/app-deleted') {
        //                 console.log('O banco de dados não foi localizado.');
        //             }

        //             if (error.code === 'auth/expired-action-code') {
        //                 console.log('O código da ação o ou link expirou.');
        //             }

        //             if (error.code === 'auth/invalid-action-code') {
        //                 console.log('O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.');
        //             }

        //             if (error.code === 'auth/user-disabled') {
        //                 console.log('O usuário correspondente à credencial fornecida foi desativado.');
        //             }

        //             if (error.code === 'auth/user-not-found') {
        //                 console.log('O usuário não correponde à nenhuma credencial.');
        //             }

        //             if (error.code === 'auth/weak-password') {
        //                 console.log('A senha é muito fraca.');
        //             }

        //             if (error.code === 'auth/account-exists-with-different-credential') {
        //                 console.log('E-mail já associado a outra conta.');
        //             }
        //             console.error(error);
        //         });

        //         if (response.data?.token && response.data?.student) {
        //             await signIn(response.data.token, response.data.student);
        //         } else {
        //             throw new Error('Dados de resposta inválidos');
        //         }
        //     } catch (err) {
        //         console.error('Erro no login:', err);
        //         setError(
        //             err.response?.data?.message || 
        //             err.message || 
        //             'Ocorreu um erro ao fazer login'
        //         );
        //         Alert.alert('Erro', err.response?.data?.message || 'Ocorreu um erro ao fazer login');
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        return (
            <GluestackUIProvider config={config}>
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.keyboardAvoidingContainer}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <ScrollView
                                contentContainerStyle={styles.scrollContainer}
                                bounces={false}
                                showsVerticalScrollIndicator={false}
                            >
                                <BackHeader
                                    onPress={() => navigation.navigate('StudentScreen')}
                                    title="Entrar"
                                    subtitle="Entre na sua Conta"
                                />
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
                                    <MotiView
                                        from={{ translateX: 370 }}
                                        animate={{ translateX: 0 }}
                                        transition={{ duration: 4000, delay: 500 }}>
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
                                    </MotiView>
                                </View>
                                {/* Rest of your JSX remains the same */}
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </GluestackUIProvider>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        keyboardAvoidingContainer: {
            flex: 1,
        },
        scrollContainer: {
            flexGrow: 1,
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

export default LoginStudent;