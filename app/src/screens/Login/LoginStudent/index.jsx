import { useState } from "react";
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

            if (!email || !senha) {
                throw new Error('Por favor, preencha todos os campos');
            }

            const response = await axios.post('http://10.0.2.2:8085/api/loginStudent', {
                email,
                senha,
            });

            if (response.data?.token && response.data?.student) {
                await signIn(response.data.token, response.data.student);
            } else {
                throw new Error('Dados de resposta inválidos');
            }
        } catch (err) {
            console.error('Erro no login:', err);
            setError(
                err.response?.data?.message || 
                err.message || 
                'Ocorreu um erro ao fazer login'
            );
            Alert.alert('Erro', err.response?.data?.message || 'Ocorreu um erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

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