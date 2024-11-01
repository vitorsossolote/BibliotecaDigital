import React from "react";
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
import { config } from "@gluestack-ui/config"
import { createIcons, icons } from 'lucide';

interface Props {
    formTitle : "string";
    inputText : "string";
    inputType : "string";
    inputSize : int;
    kbtype : "string";
    onChangeText: 'string';
    valuee: 'string';
};

const InputTest = ({inputText,formTitle,inputType, inputSize,kbtype,onChangeText,valuee}: Props) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
        <FormControl style = {styles.input}>
          <FormControlLabel>
            <FormControlLabelText fontSize={inputSize} style = {styles.formText}>
              {formTitle}
            </FormControlLabelText>
          </FormControlLabel>
          <Input style = {styles.input}>
            <InputField keyboardType={kbtype} type={inputType} style={styles.inputText} placeholder={inputText} onChangeText={onChangeText} value={valuee} />
          </Input>
        </FormControl>
        </SafeAreaView>
    </GluestackUIProvider>
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
