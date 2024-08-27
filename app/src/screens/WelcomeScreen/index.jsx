import React from "react";
import {
    GluestackUIProvider,
    Spinner,
    SafeAreaView,
    Image,
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Heading,
} from "@gluestack-ui/themed"
import { StyleSheet, Text, View } from "react-native"
import { config } from "@gluestack-ui/config"




const WelcomeScreen = () => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image size='xs' style={styles.logo} source={require('../../../assets/logo.png')} alt="Logo Senai" />
                <Image size='xs' style={styles.bemvindo} source={require('../../../assets/welcome.png')} alt="Seja Bem-Vindo" />
            </View>
            <View style={styles.textContainer}>
            <Heading style={styles.titulo}>Comece a ler conosco</Heading>
            <Text>Aqui você aluno pode emprestar livros ou até mesmo baixa-los. Além de verificar se seu livro favorito está disponivel</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    style ={styles.buttonSolid}
                >
                <ButtonText>Criar Conta</ButtonText>
                </Button>
                <Button
                    size="md"
                    variant="outline"
                    action="primary"
                    style ={styles.buttonOutline}
                >
                <ButtonText style={styles.buttonText}>Entrar</ButtonText>
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
    imageContainer: {
        padding: 20,
        alignSelf: 'center',
    },
    logo: {
        width: 300,
    },
    bemvindo: {
        width: 300,
        height: 300,
    },
    textContainer:{
        width:243,
        alignSelf:'center',
    },
    titulo: {
        fontSize: 25,
        textAlign: 'center',
        color: 'black',
        fontWeight:'bold',
    },
    buttonContainer: {
        flex:1,
        alignSelf:"center",
        justifyContent:'flex-end',
        padding:20,
    },
    buttonSolid:{
        backgroundColor:"#EE2D32",
        borderRadius:10,
        width:327,
        height:56,
        marginBottom:8,
    },
    buttonOutline:{
        backgroundColor:"#FAF9FD",
        borderRadius:10,
        width:327,
        height:56,
        borderColor:"#EE2D32",
        borderWidth:0.5,
    },
    buttonText:{
        color:"#EE2D32",
    }

});


export default WelcomeScreen;