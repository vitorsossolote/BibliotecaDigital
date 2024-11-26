import { useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Select } from '@gluestack-ui/themed';
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonText,
} from "@gluestack-ui/themed"
import { MotiView } from "moti"
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert, KeyboardAvoidingView, Platform } from "react-native"
import { config } from "@gluestack-ui/config"
import BackHeader from "../../components/BackHeader/index";
import InputTest from "../../components/InputTest";
import ModalComp from "../../components/Modal/1Modal";
import ImagePicker from 'react-native-image-crop-picker';
import axios from "axios";
import book from "../../../assets/book.png"

const RegisterGender = ({ navigation }) => {
    const [nome_genero, setGenero] = useState('')


    const data = {
        nome_genero: nome_genero,
        
    };

    const handleCadastrarGenero = async () => {
        if (!nome_genero) {
            Alert.alert('Todos os campos são obrigatórios')
            return
        }
        console.log(data)
        try {
            await axios.post('http://10.0.2.2:8085/api/registerGender', data);
            Alert.alert('Cadastro do genero realizado com sucesso');
            navigation.navigate('AdminLibrarian')
        } catch (error) {
            if (error) {
                console.log(error)
            }
            else if (error.response.status === 401) {
                console.log('O nome' + data.nome_genero + 'já existe na base de dados')
                Alert.alert('O nome' + data.nome_genero + 'já existe na base de dados')
            }
            else {
                console.log(error + 'Ocorreu um erro ao cadastrar o genero.');
                Alert.alert(error + 'Ocorreu um erro ao cadastrar o genero.')
            }
        }
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "android" ? "padding" : "height"}
                    style={styles.keyboardAvoidContainer}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <BackHeader onPress={() => navigation.navigate("AdminLibrarian")}
                            title="Bem Vindo"
                            subtitle="Cadastre um Genero" />
                        <View style={styles.inputContainer}>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0, }}
                                transition={{ duration: 3000, type: "spring" }}>
                                <InputTest
                                    inputText="Nome do Genero"
                                    formTitle="Genero"
                                    inputSize={15}
                                    valuee={nome_genero}
                                    onChangeText={text => setGenero(text)}
                                />
                            </MotiView>
                        </View>
                        <MotiView
                            from={{ translateY: 110, }}
                            animate={{ translateY: 0 }}
                            transition={{ duration: 3000, delay: 1000 }}>
                            <View style={styles.buttonContainer}>
                                <ModalComp buttonTitle={"Cadastrar Genero"} onPress={handleCadastrarGenero} />
                            </View>
                        </MotiView>
                        <View style={styles.EnterAccountContainer}>
                            <MotiView
                                from={{ translateX: -230 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 1000, delay: 1500, type: "timing" }}>
                                <Text style={styles.textAccount}>Quer atualizar um genero?</Text>
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
                    </ScrollView>
                </KeyboardAvoidingView>
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
    scrollContainer: {
        flexGrow: 1,
    },
    bookContainer: {
        alignItems: "center",
        justifyContent: "center",
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

export default RegisterGender;