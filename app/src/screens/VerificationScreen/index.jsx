import {useState,useEffect} from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Pressable,
    Heading,
    Input,
    InputField,
    Button,
    ButtonText,
} from "@gluestack-ui/themed"
import { StyleSheet, Text, View } from "react-native"
import { config } from "@gluestack-ui/config"
import { createIcons, icons } from 'lucide';
import BackHeader from "../../components/BackHeader";
import InputTest from "../../components/InputTest";
import ModalComp2 from "../../components/Modal/2Modal";


const VerificationScreen = ({navigation}) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <BackHeader 
                onPress ={()=> navigation.navigate('CreateStudent')}
                title="Verificação de Email"
                subtitle="Um ultimo passo para te manter seguro"
                margin = {15} />
            <View style={styles.inputContainer}>
                <InputTest
                    inputText="Vamos confirmar seu Email"
                    formTitle="Confirmar Email" 
                    inputSize={15}/>
                    
            </View>
            <View style={styles.buttonContainer}>
                <ModalComp2
                ButtonTitle={"Confirmar Email"}
                ModalTitle={"Confirmação de Email"}
                ModalTitle2={"Verifique o Código"}
                ModalSubtitle2={"Nessa etapa iremos enviar um código ao seu e-mail e você deverá inseri-lo abaixo. Por questões de segurança não compartilhe esse codigo com ninguém"}
                />
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
        backgroundColor: '#fff',
        marginTop:40,
        gap: 35,
    },
    buttonSolid: {
        backgroundColor: "#EE2D32",
        borderRadius: 30,
        width: 327,
        height: 56,
        marginBottom: 8,
    },
    buttonContainer:{
        alignSelf:"center",
        marginTop:55,
    },
    EnterAccountContainer:{
        flexDirection:'row',
        alignItems:"center", 
        gap:7,
        alignSelf:'center',
    },
    textAccount:{
        fontSize:16,
    },
    textButton:{
        color:'#EE2D32',
        fontSize:16,
    },
    textTerms:{
        fontSize:16,
        flexDirection:'column-reverse',
        alignSelf:'center',
        marginTop:120,
    },
    termsContainer:{
        height:20,
        flexDirection:'row',
        alignItems:"center", 
        gap:7,
        alignSelf:'center',
        marginTop:650,
        position:"absolute"
    },
});


export default VerificationScreen;