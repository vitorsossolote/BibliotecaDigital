import React, { useState, useEffect } from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonText,
    Select,
    SelectTrigger,
    SelectInput,
    SelectContent,
    SelectItem,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectPortal
} from "@gluestack-ui/themed";
import {route} from 'react-router-dom';
import { config } from "@gluestack-ui/config";
import { StyleSheet,Pressable, Text, View, TouchableOpacity, ScrollView, Image, Alert, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { MotiView } from "moti";
import ImagePicker from 'react-native-image-crop-picker';
import axios from "axios";
import BackHeader from "../../components/BackHeader/index";
import InputTest from "../../components/InputTest";
import ModalComp from "../../components/Modal/1Modal";
import { useAuth } from "../../contexts/AuthContext";

const EditBooks = ({ navigation, route}) => {
    const [image, setImage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [nome_autor, setAutor] = useState('');
    const [editora, setEditora] = useState('');
    const [nome_genero, setGenero] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isEditing, setIsEditing] = useState(false);  
    const {buscarLivros} = useAuth()
    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        // Verifica se há dados de livro para edição
        if (route.params?.bookData) {
            const bookData = route.params.bookData;
            setIsEditing(true);

            // Popular os states com os dados do livro
            setImage(bookData.image);
            setTitulo(bookData.titulo);
            setAutor(bookData.nome_autor);
            setEditora(bookData.editora);
            setGenero(bookData.nome_genero);
            setQuantidade(bookData.quantidade?.toString() || '');
            setCodigo(bookData.codigo);
            setDescricao(bookData.descricao);
        }
    }, [route.params?.bookData]);

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

            const data = `data:${image.mime};base64,${image.data}`;
            setImage(data);
        }).catch(error => {
            console.log('ImagePicker Error:', error);
            Alert.alert('Erro', 'Não foi possível selecionar a imagem. Tente novamente.');
        });
    };

    useEffect(() => {
        const fetchAutoresEGeneros = async () => {
            try {
                const responseAutores = await axios.get('http://10.0.2.2:8085/api/autores');
                const responseGeneros = await axios.get('http://10.0.2.2:8085/api/generos');

                setAutores(responseAutores.data);
                setGeneros(responseGeneros.data);
            } catch (error) {
                console.error('Erro ao buscar autores e gêneros:', error);
                Alert.alert('Erro', 'Não foi possível carregar autores e gêneros');
            }
        };

        fetchAutoresEGeneros();
    }, []);

    const handleCadastrarLivro = async () => {
        if (!image || !titulo || !nome_autor || !editora || !nome_genero || !quantidade || !codigo || !descricao) {
            Alert.alert('Todos os campos são obrigatórios');
            return;
        }

        const data = {
            image,
            titulo,
            nome_autor,
            editora,
            nome_genero,
            quantidade,
            codigo,
            descricao
        };

        try {
            if (isEditing) {
                // Lógica para atualizar o livro
                await axios.put(`http://10.0.2.2:8085/api/updateBook/${route.params.bookData.id}`, data);
                Alert.alert('Livro atualizado com sucesso');
            } else {
                // Lógica existente de cadastro
                await axios.post('http://10.0.2.2:8085/api/registerBook', data);
                Alert.alert('Cadastro do livro realizado com sucesso');
            }
            await buscarLivros();
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Ocorreu um erro ao salvar o livro.');
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
                        <BackHeader
                            onPress={() => navigation.goBack()}
                            title="Bem Vindo"
                            subtitle="Cadastre um Livro"
                        />

                        <View style={styles.inputContainer}>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 3000, type: "spring" }}
                                style={styles.bookContainer}
                            >
                                <TouchableOpacity
                                    onPress={selectPhoto}
                                    style={{
                                        width: 160,
                                        height: 223,
                                        borderColor: "#000",
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
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
                                animate={{ translateX: 0 }}
                                transition={{ duration: 3000, type: "spring" }}
                            >
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
                                animate={{ translateX: 0 }}
                                transition={{ duration: 3500, type: "spring" }}
                                style={{bottom:5}}
                            >
                                <Text style={styles.formText}>Autor</Text>
                                <Select
                                    onValueChange={(value) => setAutor(value)}
                                   
                                >
                                    <SelectTrigger style={styles.input}>
                                        <SelectInput placeholder="Selecione um autor" style={styles.inputText} />
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectContent>
                                            <SelectDragIndicatorWrapper>
                                                <SelectDragIndicator />
                                            </SelectDragIndicatorWrapper>
                                            <Pressable onPress={() => navigation.navigate("RegisterAutor")}>
                                                <Text style={{color:"#ee2d32"}}>Ou adicione um aqui</Text></Pressable>
                                            {autores.map((a) => (
                                                <SelectItem
                                                    key={a.id_autor}
                                                    label={a.nome_autor}
                                                    value={a.nome_autor}
                                                />
                                            ))}
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>
                                </MotiView>
                                <MotiView
                                    from={{ translateX: -50 }}
                                    animate={{ translateX: 0 }}
                                    transition={{ duration: 4000, type: "spring" }}
                                    style={{bottom:30}}
                                >
                                    <Text style={styles.formText}>Gênero</Text>
                                    <Select
                                        onValueChange={(value) => setGenero(value)}
                                    >
                                        <SelectTrigger style={styles.input}>
                                            <SelectInput placeholder="Selecione um gênero" style={styles.inputText} />
                                        </SelectTrigger>
                                        <SelectPortal>
                                            <SelectContent>
                                                <SelectDragIndicatorWrapper>
                                                    <SelectDragIndicator />
                                                </SelectDragIndicatorWrapper>
                                                <Pressable onPress={() => navigation.navigate("RegisterGender")}>
                                                <Text style={{color:"#ee2d32"}}>Ou adicione um aqui</Text></Pressable>
                                                {generos.map((g) => (
                                                    <SelectItem
                                                        key={g.id_genero}
                                                        label={g.nome_genero}
                                                        value={g.nome_genero}
                                                    />
                                                
                                                ))}
                                            </SelectContent>
                                        </SelectPortal>
                                    </Select>
                                </MotiView>
                                <View style={[styles.inputContainer, {bottom:100}]}>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0 }}
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
                                animate={{ translateX: 0 }}
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
                                animate={{ translateX: 0 }}
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
                                animate={{ translateX: 0 }}
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
                        </View>
                        <MotiView
                            from={{ translateY: 110 }}
                            animate={{ translateY: 0 }}
                            transition={{ duration: 3000, delay: 1000 }}
                        >
                            <View style={styles.buttonContainer}>
                                <ModalComp buttonTitle={"Cadastrar Livro"} onPress={handleCadastrarLivro} />
                            </View>
                        </MotiView>

                        <View style={styles.EnterAccountContainer}>
                            <MotiView
                                from={{ translateX: -230 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 1000, delay: 1500, type: "timing" }}
                            >
                                <Text style={styles.textAccount}>Quer atualizar um livro?</Text>
                            </MotiView>
                            <MotiView
                                from={{ translateX: 200 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 1000, delay: 1500, type: "timing" }}
                            >
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
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
    selectContainer: {
        padding: 15,
    },
    selectRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    select: {
        flex: 1,
        marginRight: 10,
    },
    addButton: {
        backgroundColor: '#EE2D32',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 327,
        height: 48,
        alignSelf: 'center',
    },
    formText: {
        color: 'black',
        fontWeight: 'bold',
        left: 40,
        bottom: 2,
    },
    inputText: {
        color: 'gray',
        fontSize: 15,
    },

});

export default EditBooks;