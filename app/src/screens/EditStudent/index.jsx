import { useState, useEffect } from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonText,
} from "@gluestack-ui/themed"
import { 
    StyleSheet, 
    View, 
    Alert, 
    KeyboardAvoidingView, 
    Platform,
    ScrollView 
} from "react-native"
import { config } from "@gluestack-ui/config"
import BackHeader from "../../components/BackHeader";
import InputTest from "../../components/InputTest";
import { MotiView } from "moti"
import PasswordInput from "../../components/InputTest/PasswordInput";
import { useAuth } from "../../contexts/AuthContext";

const EditStudentScreen = ({ navigation }) => {
    const { selectedUser, updateStudent } = useAuth();
    
    const [nome, setNome] = useState(selectedUser?.nome || "");
    const [email, setEmail] = useState(selectedUser?.email || "");
    const [rm, setRM] = useState(selectedUser?.rm || "");
    const [senha, setSenha] = useState("");
    const [confirmSenha, setConfirmSenha] = useState("");

    useEffect(() => {
        // deixar preenchido com as infos do usuário que for selecionado
        if (selectedUser) {
            setNome(selectedUser.nome);
            setEmail(selectedUser.email);
            setRM(selectedUser.rm);
        }
    }, [selectedUser]);

    const handleUpdateStudent = async () => {

        if (!nome || !email || !rm) {
            Alert.alert('Todos os campos são obrigatórios');
            return;
        }

        const updateData = {
            nome,
            email,
            rm,
            ...(senha && { senha, confirmSenha })
        };

        try {
            await updateStudent(updateData);
            Alert.alert('Atualização realizada com sucesso');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro ao atualizar', 'Não foi possível atualizar o aluno');
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
                        showsVerticalScrollIndicator={false}
                    >
                        <BackHeader 
                            onPress={() => navigation.goBack()}
                            title="Editar Aluno"
                            subtitle="Atualize as informações" 
                        />
                        <View style={styles.inputContainer}>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 3000, type: "spring" }}
                            >
                                <InputTest
                                    inputText="Nome completo"
                                    formTitle="Nome"
                                    inputSize={15}
                                    valuee={nome}
                                    onChangeText={text => setNome(text)}
                                />
                            </MotiView>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 4000, type: "spring" }}
                            >
                                <InputTest
                                    inputText="Email"
                                    formTitle="Email"
                                    inputSize={15}
                                    valuee={email}
                                    onChangeText={text => setEmail(text)}
                                />
                            </MotiView>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 5000, type: "spring" }}
                            >
                                <InputTest
                                    inputText="RM"
                                    formTitle="RM"
                                    inputSize={15}
                                    kbtype="phone-pad"
                                    valuee={rm}
                                    onChangeText={text => setRM(text)}
                                    editable={false} // RM should not be editable
                                />
                            </MotiView>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 6000, type: "spring" }}
                            >
                                <PasswordInput
                                    inputText="Nova senha (opcional)"
                                    formTitle="Senha"
                                    inputType="password"
                                    inputSize={15}
                                    valuee={senha}
                                    onChangeText={text => setSenha(text)}
                                />
                            </MotiView>
                            <MotiView
                                from={{ translateX: -50 }}
                                animate={{ translateX: 0 }}
                                transition={{ duration: 7000, type: "spring" }}
                            >
                                <PasswordInput
                                    inputText="Confirme nova senha"
                                    formTitle="Confirmar Senha"
                                    inputType="password"
                                    inputSize={15}
                                    valuee={confirmSenha}
                                    onChangeText={text => setConfirmSenha(text)}
                                />
                            </MotiView>
                        </View>
                        <MotiView
                            from={{ translateY: 110 }}
                            animate={{ translateY: 0 }}
                            transition={{ duration: 3000, delay: 1000 }}
                        >
                            <View style={styles.buttonContainer}>
                                <Button 
                                    style={styles.buttonSolid}
                                    onPress={handleUpdateStudent}
                                >
                                    <ButtonText>Atualizar Aluno</ButtonText>
                                </Button>
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
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
    },
    keyboardAvoidContainer: {
        flex: 1,
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
        marginBottom: 20,
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

export default EditStudentScreen;