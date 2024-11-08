import React, {useState} from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Input,
    InputField,
    FormControl,
    FormControlLabel,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabelText,
} from "@gluestack-ui/themed"
import { StyleSheet, Text, View } from "react-native"
import { EyeIcon,EyeOffIcon } from "lucide-react-native"

interface Props {
    formTitle : any;
    inputText : any;
    inputType : any;
    inputSize : number;
    kbtype : any;
    onChangeText: any;
    valuee: any;
};

const InputTest = (props : Props) => (
        <SafeAreaView>
        <FormControl style = {styles.input}>
          <FormControlLabel>
            <FormControlLabelText fontSize={props.inputSize} style = {styles.formText}>
              {props.formTitle}
            </FormControlLabelText>
          </FormControlLabel>
          <Input style = {styles.input}>
            <InputField keyboardType={props.kbtype} type={props.inputType} style={styles.inputText} placeholder={props.inputText} onChangeText={props.onChangeText} value={props.valuee} />
          </Input>
        </FormControl>
        </SafeAreaView>
);

const styles = StyleSheet.create({
    input:{
        backgroundColor: '#fff',
        borderRadius:20,
        width:327,
        height:48,
        alignSelf:'center',
    }, 
    formText:{
        color:'black',
        fontWeight:'bold',
    },
    inputText:{
        color:'gray',
        fontSize:15,
    },
});


export default InputTest;
