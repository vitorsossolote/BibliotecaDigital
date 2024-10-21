import { useState, useEffect } from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Pressable,
    Heading,
    Input,
    InputField,
    Button,
    ButtonText,
    Center,
    Image
} from "@gluestack-ui/themed"
import { StyleSheet, Text, View } from "react-native"
import { config } from "@gluestack-ui/config"

const CongratulationsScreen = () => (
    <GluestackUIProvider config={config}>
        <Center h={700} w={410}>
            <View style={styles.imageContainer}>
                <Image size='xs' style={styles.Image} source={require('../../../assets/congratsImage.png')} alt="Parabéns" />
            </View>
            <View style={styles.TextContainer}>
                <Heading style={styles.title}>Parabéns!</Heading>
                <Span styles={styles.subtitle}>Sua conta esta criada. Por favor aproveite o          que tem de melhor no nosso acervo</Span>
            </View>
                <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    style={styles.buttonSolid}
                >
                    <ButtonText>Iniciar</ButtonText>
                </Button>
        </Center>
    </GluestackUIProvider>
);

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
    },
    imageContainer:{
        marginBottom:31,
    },
    Image: {
        width: 160,
        height:91,
    },
    TextContainer: {
        width: 327,
        height: 48,
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 60,
        alignSelf: 'center',
        gap:10,
    },
    title: {
        textAlign: 'center',
        fontWeight:"900",
        fontSize:24,
    },
    subtitle: {
        textAlign: 'center',
        fontSize:16
    },
    buttonSolid: {
        backgroundColor: "#EE2D32",
        borderRadius: 30,
        width: 327,
        height: 48,
    },
});


export default CongratulationsScreen;