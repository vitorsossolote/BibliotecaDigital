import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
} from "@gluestack-ui/themed"
import { StyleSheet, View } from "react-native"
import { config } from "@gluestack-ui/config"
import BackHeader from "../../components/BackHeader/index";
import InputTest from "../../components/InputTest/index";
import ModalComp2 from "../../components/Modal/2Modal/index";


const NumberScreen = () => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <BackHeader 
                onPress ={()=> console.log("pressionado")}
                title="Verificação de Telefone"
                subtitle="Um ultimo passo para te manter seguro"
                top={50}
                gap={8}/>
            <View style={styles.inputContainer}>
                <InputTest
                    inputText="Vamos confirmar seu Número"
                    formTitle="Confirmar Email" 
                    inputSize={15}/>  
            </View>
            <View style={styles.buttonContainer}>
                <ModalComp2
                ButtonTitle={"Confirmar Numero"}
                ModalTitle={"Confirmação de Numer0"}
                ModalTitle2={"Verifique o Código"}
                ModalSubtitle2={"Nessa etapa iremos enviar um código ao seu sms e você deverá inseri-lo abaixo. Por questões de segurança não compartilhe esse codigo com ninguém"}
                Type={"código?"}
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
        marginTop:70,
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


export default NumberScreen;