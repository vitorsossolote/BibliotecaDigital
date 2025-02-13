import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonText,
    Heading,
} from "@gluestack-ui/themed"
import {MotiImage,MotiView} from 'moti'
import { StyleSheet, Text, View } from "react-native"
import { config } from "@gluestack-ui/config"



const StudentScreen = ({navigation}) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
            <MotiImage 
                size='xs' 
                style={styles.logo} 
                source={require('../../../assets/logo.png')} 
                alt="Logo Senai" 
                from={{opacity:0,translateY: -20}}
                animate={{opacity:1, translateY: 20}}
                transition={{duration:2000, type:"timing"}}
                />
                <MotiImage
                 size='xs' 
                 style={styles.bemvindo} 
                 source={require('../../../assets/studentImage.png')} 
                 alt="Seja Bem-Vindo" 
                 from={{translateX: -100}}
                 animate={{translateX: 0}}
                 transition={{duration:3000,type:"spring"}}
                 />
            </View>
            <MotiView style={styles.textContainer}
            from={{opacity: 0,}}
            animate={{opacity:1,}}
            transition={{duration:2000}}>
            <Heading style={styles.titulo}>Comece a Ler com nós</Heading>
            <Text style={styles.textStyle}>{'Aqui você aluno pode emprestar livros. Além de verificar a disponibilidade de seus favoritos'}</Text>
            </MotiView>
            <View style={styles.buttonContainer}>
            <MotiView
                from={{translateX:-100, translateY:-10}}
                animate={{translateX:0, translateY:15}}
                transition={{duration:3000, type:"spring"}}
                >
                <Button
                    onPress ={()=> navigation.navigate('LoginStudent')}
                    size="md"
                    variant="solid"
                    action="primary"
                    style ={styles.buttonSolid}
                >
                <ButtonText>Entrar</ButtonText>
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
        marginTop:-20,
    },
    bemvindo: {
        width: 270,
        height: 270,
        alignSelf: 'center',
        marginTop:60,
    },
    textContainer:{
        width:292,
        alignSelf:'center',
        paddingBottom:20,
        textAlign:'center',
        top:15,
    },
    titulo: {
        fontSize: 25,
        textAlign: 'center',
        color: 'black',
        fontWeight:'bold',
    },
    textStyle:{
        fontSize:16,
        marginTop:10,
        textAlign:'center',
    },
    buttonContainer: {
        flex:1,
        alignSelf:"center",
        justifyContent:'flex-end',
        padding:20,
        bottom:20,
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


export default StudentScreen;