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
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from "react-native"
import { config } from "@gluestack-ui/config"
import BackHeader from "../../components/BackHeader/index";
import InputTest from "../../components/InputTest";
import ModalComp from "../../components/Modal/1Modal";
import ImagePicker from 'react-native-image-crop-picker';
import axios from "axios";

const RegisterBooks = () => {
    const [image, setImage] = useState('')
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [editora, setEditora] = useState('')
    const [genero, setGenero] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [codigo, setCodigo] = useState('')
    const [descricao, setDescricao] = useState('')
    const selectPhoto = () => {

        // ImagePicker.openCropper({
        //     path: 'my-file-path.jpg',
        //     width: 400,
        //     height: 450,
        //     cropping: true,
        //     includeBase64: true,
        //     cropperCircleOverlay: false,
        //     avoidEmptySpaceAroundImage: true,
        //     freeStyleCropEnabled: true,
        //   }).then(image => {
        //     console.log(image);
        //     const data = `data:${image.mime};base64,${image.data}`;
        //     setImage(data);
        //   });
        ImagePicker.openPicker({
            width: 400,
            height: 450,
            cropping: true,
            includeBase64: true,
            cropperCircleOverlay: false,
            avoidEmptySpaceAroundImage: true,
            freeStyleCropEnabled: true,
        }).then(image => {
            console.log(image);
            const data = `data:${image.mime};base64,${image.data}`;
            setImage(data);
        });
    };

    const data = {
        image: image,
        titulo: titulo,
        autor: autor,
        editora: editora,
        genero: genero,
        quantidade: quantidade,
        codigo: codigo,
        descricao: descricao
    };

    const handleCadastrarLivro = async () => {
        if (!image || !titulo || !autor || !editora || !genero || !quantidade || !codigo || !descricao) {
            Alert.alert('Todos os campos são obrigatórios')
            return
        }
        console.log(data)
        //envio de informações para a API cadastrar no banco de dados
        try {
            await axios.post('http://10.0.2.2:8085/api/registerBook', data);
            Alert.alert('Cadastro do livro realizado com sucesso');
            navigation.navigate('HomeTabLibrarian')
        } catch (error) {
            if (error) {
                console.log(error)
                //Alert.alert('O email' + formData.email + 'já existe na base de dados')
            }
            else if (error.response.status === 401) {
                console.log('O código' + data.codigo + 'já existe na base de dados')
                Alert.alert('O código' + data.codigo + 'já existe na base de dados')
            }
            else {
                console.log(error + 'Ocorreu um erro ao cadastrar o livro.');
                Alert.alert(error + 'Ocorreu um erro ao cadastrar o livro.')
            }
        }
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <BackHeader onPress={() => console.log("teste")}
                        title="Bem Vindo"
                        subtitle="Cadastre um Livro" />
                    <View style={styles.inputContainer}>
                        <MotiView
                            from={{ translateX: -50 }}
                            animate={{ translateX: 0, }}
                            transition={{ duration: 3000, type: "spring" }}>
                            <TouchableOpacity onPress={selectPhoto}>
                                <Image
                                    source={
                                        image
                                            ? { uri: image }
                                            : { uri: 'data:image/png;base64,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bdpkWc1bVa/Fo/4jUfdUV2f3wUw222OMWQfAGR8ba2UEolZwFy5aeFtXT/fLT//dU6vq9XouyDCRSGRq00c37U0mkxzoR/NSV3f38q7u7iFrcbpaKZ2enJzqrlTKq1Rb1sGbto83c1ndpg/+cyOR013dnQezmY7uiwd9vvugUEgmEjd9+p7PnP7+958ZzU9OXhVEhq7u7v0f+cgdGRG5I4jtE7WSMViYTKUWJlMpqOqJUrF4bHJiYnG1Vlve5E037TbdZhaApnBdd7Sru2d/RzbTI8ZcDWBh0JmIgmBEFt59153VvXvefOnQoSPNnjjox6xYseK5a6+7dj2AZCu3S9QORGRJOpNZks5kYK2/vzBTGJ2amFjbaPh9QWe7HHOlANhMJvtaT09PLRKNbARwd9CBiNpE/Oprrr2pu7v36RdeePFOQJu9gp+uX7/+e4uXLG6LVTuJgmaMsybX0bkm19Hp+763a3JysjY1OXUT5sDxta0DRiLuSHd3z4FstmPFXJpGmKjFpH+g/+5PfeZTL//dd797VaPhNWXWM9eNFD/2sU17EskkCzjRuzmO427o7e1DT0/vaKlU3j8+Nrq8Xm+07aXpti0Ay1eueMV13A0ABoLOQjQXJOLxmz7zU/ccf+rvns7PFAqLZ/O5M5nM8bs3bfIcx3AhH6L3ISL96XSqP51ebj3fe+Xo4SMbg850KW07S5/ruBvRxvmI2pERs/RjH9vUuXjxwpdn6zmHFg69+tGPfSznOCawW3uJ5ihz8VjWlniAJZp3JHPDhhs3rFu/7ukrfaZ169c9vXHjxvUizbsViYiCwQJAND85y5Yuu+Jr9Refg4t5Ec1DLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHEAkBERBRCLABEREQhxAJAREQUQiwAREREIcQCQEREFEIsAERERCHE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' }
                                    }
                                    style={{ width: 100, height: 100 }} // Add appropriate styling
                                />
                                <Text>Livro</Text>
                            </TouchableOpacity>
                        </MotiView>
                        <MotiView
                            from={{ translateX: -50 }}
                            animate={{ translateX: 0, }}
                            transition={{ duration: 3000, type: "spring" }}>
                            <InputTest
                                inputText="Nome do Livro"
                                formTitle="Título"
                                inputSize={15}
                                valuee={titulo}
                                onChangeText={text => setTitulo(text)}
                            />
                        </MotiView>
                        <MotiView
                            from={{ translateX: -50 }}
                            animate={{ translateX: -0 }}
                            transition={{ duration: 4000, type: "spring" }}
                        >
                            <InputTest
                                inputText="Descrição do Livro"
                                formTitle="Descrição"
                                inputSize={15}
                                valuee={descricao}
                                onChangeText={text => setDescricao(text)}
                            />
                        </MotiView>
                        <MotiView
                            from={{ translateX: -50 }}
                            animate={{ translateX: -0 }}
                            transition={{ duration: 4000, type: "spring" }}
                        >
                            <InputTest
                                inputText="Nome do Autor"
                                formTitle="Autor"
                                inputSize={15}
                                valuee={autor}
                                onChangeText={text => setAutor(text)}
                            />
                        </MotiView>
                        <MotiView
                            from={{ translateX: -50 }}
                            animate={{ translateX: -0 }}
                            transition={{ duration: 4000, type: "spring" }}
                        >
                            <InputTest
                                inputText="Nome do Editora"
                                formTitle="Editora"
                                inputSize={15}
                                valuee={editora}
                                onChangeText={text => setEditora(text)}
                            />
                        </MotiView>
                        <MotiView
                            from={{ translateX: -50 }}
                            animate={{ translateX: -0 }}
                            transition={{ duration: 4000, type: "spring" }}
                        >
                            <InputTest
                                inputText="Qual o Gênero"
                                formTitle="Gênero"
                                inputSize={15}
                                valuee={genero}
                                onChangeText={text => setGenero(text)}
                            />
                        </MotiView>
                        <MotiView
                            from={{ translateX: -50 }}
                            animate={{ translateX: -0 }}
                            transition={{ duration: 5000, type: "spring" }}
                        >
                            <InputTest
                                inputText="Quantidade de Livros"
                                formTitle="Quantidade"
                                inputSize={15}
                                kbtype="phone-pad"
                                valuee={quantidade}
                                onChangeText={text => setQuantidade(text)}
                            />
                        </MotiView>
                        <MotiView
                            from={{ translateX: -50 }}
                            animate={{ translateX: -0 }}
                            transition={{ duration: 5000, type: "spring" }}
                        >
                            <InputTest
                                inputText="Código do Livro"
                                formTitle="Código"
                                inputSize={15}
                                kbtype="phone-pad"
                                valuee={codigo}
                                onChangeText={text => setCodigo(text)}
                            />
                        </MotiView>
                    </View>
                    <MotiView
                        from={{ translateY: 110, }}
                        animate={{ translateY: 0 }}
                        transition={{ duration: 3000, delay: 1000 }}>
                        <View style={styles.buttonContainer}>
                            <ModalComp buttonTitle={"Cadastrar Livro"} onPress={handleCadastrarLivro} />
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
                </ScrollView>
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