import React from "react"
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonText,
} from "@gluestack-ui/themed"
import { MotiView } from 'moti'
import { StyleSheet, Text, View } from "react-native"
import { config } from "@gluestack-ui/config"
import BackHeader from "../../../components/BackHeader/index";
import InputTest from "../../../components/InputTest/index";
import PasswordInput from "../../../components/InputTest/PasswordInput"


const LoginLibrarian = ({ navigation }) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <BackHeader onPress={() => navigation.navigate('LibrarianScreen')}
                title="Entrar"
                subtitle="Entre na sua Conta" />
            <View style={styles.inputContainer}>
                <MotiView
                    from={{ translateX: -50 }}
                    animate={{ translateX: 0 }}
                    transition={{ duration: 3000, type: "spring" }}>
                    <InputTest
                        inputText="Seu Email"
                        formTitle="Email" />
                </MotiView>
                <MotiView
                    from={{ translateX: -50 }}
                    animate={{ translateX: 0 }}
                    transition={{ duration: 4000, type: "spring" }}>
                    <PasswordInput
                        inputText="Sua senha"
                        formTitle="Senha"
                        inputType="password" />
                </MotiView>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    style={styles.buttonSolid}
                >
                    <ButtonText>Entrar</ButtonText>
                </Button>
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
                    onPress={() => console.log("pressionado")}
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
);

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


export default LoginLibrarian;
