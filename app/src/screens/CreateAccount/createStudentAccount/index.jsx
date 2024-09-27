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
import { StyleSheet, Text, View, Alert } from "react-native"
import { config } from "@gluestack-ui/config"
import BackHeader from "../../../Components/BackHeader";
import InputTest from "../../../Components/InputTest";
import ModalComp from "../../../Components/Modal/1Modal";
import axios from "axios";

const CreateStudentAccount = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [rm, setRM] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    const data = {
        nome: nome,
        email: email,
        rm: rm,
        senha: senha,
        confirmSenha: confirmSenha,
    };

    const handleCadastrar = async () => {
        if (!nome || !email || !rm || !senha || !confirmSenha) {
            Alert.alert('Todos os campos são obrigatórios')
            return
        }
            console.log(data)
        //envio de informações para a API cadastrar no banco de dados
        try {
            await axios.post('http://10.0.2.2:8085/api/createStudent', data);
            Alert.alert('Cadastro realizado com sucesso');
            navigation.navigate('VerificationScreen')
        } catch (error) {
            if (error) {
                console.log(error)
                //Alert.alert('O email' + formData.email + 'já existe na base de dados')
            }
            else if (error.response.status === 401) {
                console.log('O RM' + data.rm + 'já existe na base de dados')
                Alert.alert('O RM' + data.rm + 'já existe na base de dados')
            }
            else if (senha != confirmSenha) {
                console.log(Alert.alert('As senhas não coencidem'))
                Alert.alert('As senhas não coencidem')
            }
            else {
                console.log(error + 'Ocorreu um erro ao cadastrar o usuário. Apresente um email valido.');
                Alert.alert('Ocorreu um erro ao cadastrar o usuário. Apresente um email valido.')
            }
        }
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <BackHeader onPress={()=> navigation.navigate('StudentScreen')}
                    title="Bem Vindo"
                    subtitle="Crie sua Conta"
                    margin={10} />
                <View style={styles.inputContainer}>
                    <InputTest
                        inputText="Seu nome completo"
                        formTitle="Nome"
                        inputSize={15}
                        valuee = {nome}
                        onChangeText= {text => setNome(text)}
                         />
                    <InputTest
                        inputText="Seu email"
                        formTitle="Email"
                        inputSize={15}
                        valuee = {email}
                        onChangeText= {text => setEmail(text)}
                        />
                    <InputTest
                        inputText="Seu RM"
                        formTitle="RM"
                        inputSize={15}
                        kbtype="phone-pad"
                        valuee = {rm}
                        onChangeText= {text => setRM(text)}
                        />  
                    <InputTest
                        inputText="Sua senha"
                        formTitle="Senha"
                        inputType="password"
                        inputSize={15}
                        valuee = {senha}
                        onChangeText= {text => setSenha(text)}
                        />
                    <InputTest
                        inputText="Confirme sua Senha"
                        formTitle="Confirmar Senha"
                        inputType="password"
                        inputSize={15}
                        valuee = {confirmSenha}
                        onChangeText= {text => setConfirmSenha(text)}
                        />
                </View>
                <View style={styles.buttonContainer}>
                    <ModalComp onPress={() => handleCadastrar()} />
                </View>
                <View style={styles.EnterAccountContainer}>
                    <Text style={styles.textAccount}>Já tem uma conta?</Text>
                    <Button
                        onPress ={()=> navigation.navigate('LoginStudent')}
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


export default CreateStudentAccount;