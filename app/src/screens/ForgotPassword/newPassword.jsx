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
import BackHeader from "../../components/BackHeader/index";
import InputTest from "../../components/InputTest/index";
import PasswordInput from "../../components/InputTest/PasswordInput"


const NewPasswordScreen = ({ navigation }) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <BackHeader onPress={() => navigation.navigate('ForgotPassword')}
                title="Nova Senha"
                subtitle="Crie sua nova senha" />
            <View style={styles.inputContainer}>
                <MotiView
                    from={{ translateX: -50 }}
                    animate={{ translateX: 0 }}
                    transition={{ duration: 3000, type: "spring" }}>
                    <PasswordInput
                        inputText="Sua senha"
                        formTitle="Nova Senha"
                        inputType="password" />
                </MotiView>
                <MotiView
                    from={{ translateX: -50 }}
                    animate={{ translateX: 0 }}
                    transition={{ duration: 4000, type: "spring" }}>
                    <PasswordInput
                        inputText="Sua senha"
                        formTitle="Confirmar sua senha"
                        inputType="password" />
                </MotiView>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    style={styles.buttonSolid}
                    onPress={() => navigation.navigate("LoginLibrarian")}
                >
                    <ButtonText>Redefinir Senha</ButtonText>
                </Button>
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


export default NewPasswordScreen;
