import React from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonText,
    Heading,
} from "@gluestack-ui/themed"
import { MotiImage, MotiView } from 'moti'
import { StyleSheet, Text, View } from "react-native"
import { config } from "@gluestack-ui/config"

const UserSelectScreen = ({ navigation }) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <MotiImage
                    size='xs'
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                    alt="Logo Senai"
                    from={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 20 }}
                    transition={{ duration: 2000, type: "spring" }}
                />
                <MotiImage
                    size='xs'
                    style={styles.bemvindo}
                    source={require('../../../assets/welcome.png')}
                    alt="Seja Bem-Vindo"
                    from={{ translateX: -100 }}
                    animate={{ translateX: 0 }}
                    transition={{ duration: 3000, type: "spring" }}
                />
            </View>
            <MotiView style={styles.textContainer}
                from={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                transition={{ duration: 2000 }}>
                <Heading style={styles.titulo}>Você é Aluno ou Bibliotecário?</Heading>
                <Text style={styles.textStyle}>{'Fique por dentro dos melhores livros do  nosso acervo ou atualize nosso            inventário'}</Text>
            </MotiView>
            <View style={styles.buttonContainer}>
                <MotiView
                    from={{ translateX: -100 }}
                    animate={{ translateX: 0 }}
                    transition={{ duration: 3000, type: "spring" }}
                >
                    <Button
                        onPress={() => navigation.navigate('StudentScreen')}
                        size="md"
                        variant="solid"
                        action="primary"
                        style={styles.buttonSolid}
                    >
                        <ButtonText>Aluno</ButtonText>
                    </Button>
                </MotiView>
                <MotiView
                    from={{ translateX: 100, opacity: 0 }}
                    animate={{ translateX: 0, opacity: 1 }}
                    transition={{ duration: 3000, type: "spring" }}
                >
                    <Button
                        onPress={() => navigation.navigate('LibrarianScreen')}
                        size="md"
                        variant="outline"
                        action="primary"
                        style={styles.buttonOutline}
                    >
                        <ButtonText style={styles.buttonText}>Bibliotecário</ButtonText>
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
    imageContainer: {
        marginTop: 60,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 300,
        marginTop: -20,
    },
    bemvindo: {
        width: 270,
        height: 270,
        alignSelf: 'center',
        marginTop: 20,
    },
    textContainer: {
        width: 292,
        alignSelf: 'center',
        paddingBottom: 30,
        textAlign: 'center'
    },
    titulo: {
        fontSize: 25,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    textStyle: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        alignSelf: "center",
        justifyContent: 'flex-end',
        padding: 20,
    },
    buttonSolid: {
        backgroundColor: "#EE2D32",
        borderRadius: 10,
        width: 327,
        height: 56,
        marginBottom: 8,
    },
    buttonOutline: {
        backgroundColor: "#FAF9FD",
        borderRadius: 10,
        width: 327,
        height: 56,
        borderColor: "#EE2D32",
        borderWidth: 0.5,
    },
    buttonText: {
        color: "#EE2D32",
    }

});

export default UserSelectScreen;