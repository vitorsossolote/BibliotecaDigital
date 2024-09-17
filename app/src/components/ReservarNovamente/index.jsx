import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Image,
} from "@gluestack-ui/themed"

import book from "../../../assets/book2.png" 

const { width: screenWidth } = Dimensions.get('window');


const Reservar = () => {
    return(
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Reservar Novamente?</Text>
                <Button style={styles.Button}
                    size="md"
                    variant="solid"
                    action="primary"
                >
                    <ButtonText>Reservar Agora</ButtonText>
                </Button>
            </View>
            <View style={styles.imageContainer}>
                    <Image style={styles.Image} source={book} alt="Parabéns" />
                </View>
        </View>
);
};

const styles = StyleSheet.create({
    card: {
        flex:1,
        width: screenWidth - 40,
        marginHorizontal: 20,
        height: 160,
        flexDirection:'row',
        backgroundColor:"#f6f6f6",
        borderRadius:20,
        marginTop:15,
    },
    textContainer: {
        width: 240,
        marginLeft:20,
        padding:15,
        paddingLeft:23,
    },
    title: {
        fontSize: 24,
        color: 'black',
        fontWeight: '700'
    },
    rating: {
        fontSize: 20,
        color: 'black',
    },
    Button:{
        backgroundColor:"#EE2D32",
        borderRadius:25,
        marginTop:20,
        width:170,
    },
    imageContainer:{
        height:"100%",
        paddingLeft:15,
    },
    Image:{
        width:110,
        height:160,
    },
});

export default Reservar;