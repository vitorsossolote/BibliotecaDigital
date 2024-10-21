import { useState, useEffect } from "react";
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
import { MotiView } from "moti"
import { StyleSheet, Text, View, Alert } from "react-native"
import axios from 'axios'; //Axios é utilizado para comunicar com a API (request)
import { config } from "@gluestack-ui/config"
import { createIcons, icons } from 'lucide';
import BackHeader from "../../../components/BackHeader/index";
import InputTest from "../../../components/InputTest/index";

const LoginStudent = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            //Verificar se os campos foram preenchidos
            if (!email || !senha) {
                Alert.alert('Erro', 'Por favor, preencha todos os campos!');
                return
            }

            //Objeto para enviar para a API 
            const data = {
                email: email.toLowerCase(),
                senha: senha
            }

            //Enviar os dados para a API
            const response = await axios.post('http://10.0.2.2:8085/api/validade', data);

            //Verificar se o login foi efetuado com sucesso
            if (response.status === 200) {
                setEmail('');
                setSenha('');

                const userData = {
                    id: response.data.id,
                    nome: response.data.nome,
                    email: response.data.email,
                    rm: response.data.rm,
                    senha: response.data.senha
                }
                Alert.alert('Login efetuado com sucesso!!!')
                navigation.navigate('CreateStudent', { userData });
            }
            else {
                Alert.alert('Erro', 'Email ou senha incorretos por favor tente novamente')
                console.log(userData)
            }
        }
        catch (error) {
            if (error.response && error.status === 401) {

                Alert.alert('Erro', 'Ocorreu um erro ao fazer o login, por favor, tente novamente')
            }
            else {
                console.log(error)
                Alert.alert('Erro', 'Email ou senha incorretos. Por favor tente novamente')
            }
        }
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <BackHeader onPress={() => navigation.navigate('StudentScreen')}
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
                        <InputTest
                            inputText="Sua senha"
                            formTitle="Senha"
                            valuee={senha}
                            onChangeText={text => setSenha(text)}
                            inputType="password" />
                    </MotiView>
                </View>
                <View style={styles.buttonContainer}>
                    <MotiView
                        from={{ translateX: 370, }}
                        animate={{ translateX: 0, }}
                        transition={{ duration: 4000, delay: 500 }}>
                        <Button
                            onPress={() => handleLogin()}
                            size="md"
                            variant="solid"
                            action="primary" w
                            style={styles.buttonSolid}
                        >
                            <ButtonText>Entrar</ButtonText>
                        </Button>
                    </MotiView>
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
                            onPress={() => navigation.navigate('CreateStudent')}
                            size="md"
                            variant="link"
                            action="primary"
                            style={styles.linkButton}
                        >
                            <ButtonText style={styles.textButton}>Crie Agora</ButtonText>
                        </Button>
                    </MotiView>
                </View>
                <View style={styles.termsContainer}>
                    <MotiView
                    from={{translateY:45, }}
                    animate={{translateY:0,}}
                    transition={{duration:2000, type:"timing"}}
                    >
                        <Text style={styles.textTerms}>Criando uma conta você aceita nossos</Text>
                        <Button
                            size="md"
                            variant="link"
                            action="primary"
                            style={styles.linkButton}
                        >
                            <ButtonText style={styles.textButton}>Termos e Politicas de dados</ButtonText>
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