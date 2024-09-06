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
import { createIcons, icons } from 'lucide';
import BackHeader from "../../../components/BackHeader";
import InputTest from "../../../components/InputTest";
import ModalComp from "../../../components/Modal/1Modal";

const CreateStudentAccount = ({ navigation }) => {
    const [mensagem, setMensagem] = useState("");
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        email: '',
        rm: '',
        senha: '',
        confirmarSenha: '',
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleCadastrar = async () => {
        console.log("tete")
        if (!formData.nome || !formData.email || !formData.rm || !formData.senha || !formData.confirmSenha) {
            setMensagem('Todos os campos são obrigatórios')
            return;
        }

        //envio de informações para a API cadastrar no banco de dados
        try {
            await axios.post('http://10.0.2.2:8085/api/createStudent', formData);
            Alert.alert('Cadastro realizado com sucesso');
            // navigation.navigate("Login");
            console.log(formData)
        } catch (error) {
            if (error.response.status === 401) {
                Alert.alert('O email' + formData.email + 'já existe na base de dados')
                console.log(formData)
            }
            else if (error.response.status === 401) {
                Alert.alert('O RM' + formData.rm + 'já existe na base de dados')
                console.log(formData)
            }
            else if (senha != confirmSenha) {
                Alert.alert('As senhas não coencidem')
                console.log(formData)
            }
            else {
                console.log(error);
                Alert.alert('Ocorreu um erro ao cadastrar o usuário. Apresente um email valido.')
                console.log(formData)
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
                        onChangeText={(text) => handleInputChange('nome', text)} />
                    <InputTest
                        inputText="Seu email"
                        formTitle="Email"
                        inputSize={15}
                        onChangeText={(text) => handleInputChange('email', text)} />
                    <InputTest
                        inputText="Seu RM"
                        formTitle="RM"
                        inputSize={15}
                        kbtype="phone-pad"
                        onChangeText={(text) => handleInputChange('rm', text)} />
                    <InputTest
                        inputText="Sua senha"
                        formTitle="Senha"
                        inputType="password"
                        inputSize={15}
                        onChangeText={(text) => handleInputChange('senha', text)} />
                    <InputTest
                        inputText="Confirme sua Senha"
                        formTitle="Confirmar Senha"
                        inputType="password"
                        inputSize={15}
                        onChangeText={(text) => handleInputChange('confirmSenha', text)} />
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