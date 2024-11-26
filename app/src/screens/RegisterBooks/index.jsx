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

const RegisterBooks = ({ navigation }) => {
    const [image, setImage] = useState('')
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [editora, setEditora] = useState('')
    const [genero, setGenero] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [codigo, setCodigo] = useState('')
    const [descricao, setDescricao] = useState('')

    const selectPhoto = () => {
        ImagePicker.openPicker({
            flex: 1,
            cropping: true,
            includeBase64: true,
            cropperCircleOverlay: false,
            avoidEmptySpaceAroundImage: true,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.5,
            compressImageMaxWidth: 800,
            compressImageMaxHeight: 800,
            mediaType: 'photo'
        }).then(image => {
            const imageSizeInBytes = Math.round((image.data.length * 3) / 4);
            const maxSizeInBytes = 1024 * 1024;

            if (imageSizeInBytes > maxSizeInBytes) {
                Alert.alert(
                    'Imagem muito grande',
                    'Por favor, selecione uma imagem menor ou tire uma foto com resolução menor.'
                );
                return;
            }

            console.log('Image size (bytes):', imageSizeInBytes);
            const data = `data:${image.mime};base64,${image.data}`;
            setImage(data);
        }).catch(error => {
            console.log('ImagePicker Error:', error);
            Alert.alert('Erro', 'Não foi possível selecionar a imagem. Tente novamente.');
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
        try {
            await axios.post('http://10.0.2.2:8085/api/registerBook', data);
            Alert.alert('Cadastro do livro realizado com sucesso');
            navigation.navigate('HomeTabLibrarian')
        } catch (error) {
            if (error) {
                console.log(error)
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
                            subtitle="Cadastre um Livro" />
                        <View style={styles.inputContainer}>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 3000, type: "spring" }}
                                style={styles.bookContainer}>
                                <TouchableOpacity
                                    onPress={selectPhoto}
                                    style={{
                                        width: 160,
                                        height: 223,
                                        borderColor: "#000",
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        padding: 5,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                    {image ? (
                                        <Image
                                            source={{ uri: image }}
                                            style={{
                                                flex: 1,
                                                width: '100%',
                                                borderRadius: 10
                                            }}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <Text style={{
                                            alignSelf: "center",
                                            textAlign: "center",
                                            color: "#000"
                                        }}>
                                            Cadastre a imagem do livro
                                        </Text>
                                    )}
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

export default RegisterBooks;