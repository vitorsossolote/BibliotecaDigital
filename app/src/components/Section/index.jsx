import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Image,
} from "@gluestack-ui/themed"

interface Props{
    title: "String"
}

const Section = ({title}: Props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Button variant="link" onPress={() => console.log("Apertou Ver todos")}>
                <ButtonText style={styles.buttonTextStyle}>Ver todos</ButtonText>
            </Button>
        </View>
);
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end",
        bottom:15,
        height:50,
        paddingHorizontal:22,
    },
    title:{
        bottom:8,
        fontSize:20,
        color:"#000",
        fontWeight:"800",
    },
    buttonTextStyle:{
        color:"#ee2e32"
    },
});

export default Section;