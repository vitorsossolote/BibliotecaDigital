import React, { useState } from "react";
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
    InputSlot,
    InputIcon
} from "@gluestack-ui/themed"
import { StyleSheet, Text, View } from "react-native"
import { EyeIcon, EyeOffIcon } from "lucide-react-native"

interface Props {
    formTitle: any;
    inputText: any;
    inputSize: number;
    onChangeText: any;
    valuee: any;
};


export default function PasswordInput(props: Props) {
    const [showPassword, setShowPassword] = useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }


    return (
        <SafeAreaView>
            <FormControl style={styles.input}>
                <FormControlLabel>
                    <FormControlLabelText fontSize={props.inputSize} style={styles.formText}>
                        {props.formTitle}
                    </FormControlLabelText>
                </FormControlLabel>
                <Input style={styles.input}>
                    <InputField type={showPassword ? "text" : "password"} style={styles.inputText} placeholder={props.inputText} onChangeText={props.onChangeText} value={props.valuee} />
                    <InputSlot pr="$3" onPress={handleState}>
                        <InputIcon
                            as={showPassword ? EyeIcon : EyeOffIcon}
                            color="#676767"
                            size={22}
                        />
                    </InputSlot>
                </Input>
            </FormControl>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 327,
        height: 48,
        alignSelf: 'center',
    },
    formText: {
        color: 'black',
        fontWeight: 'bold',
    },
    inputText: {
        color: 'gray',
        fontSize: 15,
    },
});


