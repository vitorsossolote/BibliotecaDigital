import React, { useState, useEffect } from "react";
import { 
    GluestackUIProvider, 
    SafeAreaView, 
    Button, 
    ButtonText 
} from "@gluestack-ui/themed"
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    Alert, 
    KeyboardAvoidingView, 
    Platform 
} from "react-native"
import { config } from "@gluestack-ui/config"
import { MotiView } from "moti"
import axios from "axios";
import ImagePicker from 'react-native-image-crop-picker';

import BackHeader from "../../components/BackHeader/index";
import InputTest from "../../components/InputTest";
import ModalComp from "../../components/Modal/1Modal";

const EditAuthor = ({ route, navigation }) => {
    const { author } = route.params;

    const [image, setImage] = useState(author.image || '');
    const [nome_autor, setNome] = useState(author.nome_autor || '');
    const [data_nascimento, setNascimento] = useState(author.data_nascimento || '');
    const [sobre, setSobre] = useState(author.sobre || '');

    const selectPhoto = () => {
        ImagePicker.openPicker({
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

    const handleUpdateAutor = async () => {
        if (!nome_autor) {
            Alert.alert('Todos os campos são obrigatórios')
            return
        }
    
        const data = {
            id_autor: author.id_autor,
            image: image,
            nome_autor: nome_autor,
            data_nascimento: data_nascimento,
            sobre: sobre,
        };
    
        try {
            console.log('Sending data:', JSON.stringify(data, null, 2)); // Log the exact data being sent
            const response = await axios.put(`http://10.0.2.2:8085/api/updateAutor/${author.id_autor}`, data);
            console.log('Server response:', response.data); // Log the server's response
            Alert.alert('Autor atualizado com sucesso');
            navigation.goBack();
        } catch (error) {
            console.error('Full error:', error);
            console.error('Error response:', error.response?.data); // Log detailed error response
            Alert.alert('Erro', 'Ocorreu um erro ao atualizar o autor.')
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
                            title="Editar Autor"
                            subtitle={nome_autor} 
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
                                        height: 160,
                                        borderColor: "#000",
                                        borderWidth: 1,
                                        borderRadius: 360,
                                        padding: 5,
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
                                                borderRadius: 360,
                                            }}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <Text style={{
                                            alignSelf: "center",
                                            textAlign: "center",
                                            color: "#000"
                                        }}>
                                            Atualizar foto do Autor
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </MotiView>
                            <View style={{gap:30}}>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0, }}
                                transition={{ duration: 3000, type: "spring" }}
                            >
                                <InputTest
                                    inputText="Nome do Autor"
                                    formTitle="Nome"
                                    inputSize={15}
                                    valuee={nome_autor}
                                    onChangeText={text => setNome(text)}
                                />
                            </MotiView>
                            
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: -0 }}
                                transition={{ duration: 4000, type: "spring" }}
                            >
                                <InputTest
                                    inputText="Data de Nascimento"
                                    formTitle="Data de Nascimento"
                                    inputSize={15}
                                    valuee={data_nascimento}
                                    onChangeText={text => setNascimento(text)}
                                />
                            </MotiView>
                            
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: -0 }}
                                transition={{ duration: 4000, type: "spring" }}
                            >
                                <InputTest
                                    inputText="Sobre"
                                    formTitle="Sobre o autor"
                                    inputSize={15}
                                    valuee={sobre}
                                    onChangeText={text => setSobre(text)}
                                />
                            </MotiView>
                        </View>
                        </View>
                        
                        <MotiView
                            from={{ translateY: 110, }}
                            animate={{ translateY: 0 }}
                            transition={{ duration: 3000, delay: 1000 }}
                        >
                            <View style={styles.buttonContainer}>
                                <ModalComp 
                                    buttonTitle={"Atualizar Autor"} 
                                    onPress={handleUpdateAutor} 
                                    style={{top:10}}
                                />
                            </View>
                        </MotiView>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </GluestackUIProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    keyboardAvoidContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
        gap:10
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    bookContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    }
});

export default EditAuthor;