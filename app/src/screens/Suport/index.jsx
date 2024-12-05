import React, { useState } from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    FormControl,
    FormControlLabel,
    FormControlLabelText,
    Input,
    InputField,
    Button,
    ButtonText,
     // Adicione Alert se não estiver importado
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View,Alert  } from "react-native";
import MainHeader from "../../components/MainHeader";
import { ArrowLeft } from "lucide-react-native";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function SuportScreen({ navigation }) { 
    const { authData } = useAuth(); 
    const [mensagem, setMensagem] = useState("");

    const handleMessage = async () => {
        if (!mensagem) {
            Alert.alert('Erro', 'Digite sua mensagem');
            return;
        }

        if (!authData?.user?.rm) {
            Alert.alert('Erro', 'Usuário não autenticado');
            return;
        }
    
        const data = {
            student_rm: authData.user.rm,
            mensagem: mensagem
        };
    
        try {
            const response = await axios.post('http://10.0.2.2:8085/api/createMessage', data);
            Alert.alert('Sucesso', 'Mensagem Enviada');
            navigation.goBack();
        } catch (error) {
            console.error('Erro completo:', error);
            
            if (error.response) {
                console.error('Detalhes da resposta:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
    
                const errorMessage = error.response.data.msg || 
                                     error.response.data.message || 
                                     'Erro ao enviar mensagem';
    
                Alert.alert('Erro', errorMessage);
            } else if (error.request) {
                console.error('Erro na requisição:', error.request);
                Alert.alert('Erro', 'Não foi possível conectar ao servidor');
            } else {
                console.error('Erro de configuração:', error.message);
                Alert.alert('Erro', 'Erro ao enviar mensagem');
            }
        }
    };

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1, }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <MainHeader title="Envie sua dúvida aqui" icon1={ArrowLeft} />

                        <View style={styles.inputContainer}>
                            <FormControl style={styles.formControl}>
                                <FormControlLabel>
                                    <FormControlLabelText style={styles.formText}>
                                        Envie sua duvida
                                    </FormControlLabelText>
                                </FormControlLabel>
                                <Input style={styles.input}>
                                    <InputField style={styles.inputText} placeholder="Digite sua dúvida aqui" onChangeText={text => setMensagem(text)} value={mensagem} />
                                </Input>
                            </FormControl>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                style={styles.buttonSolid}
                                onPress={handleMessage}>
                                <ButtonText>Enviar Mensagem</ButtonText>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GluestackUIProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    formControl: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 327,
        height: 200,
    },
    formText: {
        color: 'black',
        fontWeight: 'bold',
    },
    inputText: {
        color: 'gray',
        fontSize: 15,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 327,
        height: 200,
        alignItems: "flex-start"
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
});