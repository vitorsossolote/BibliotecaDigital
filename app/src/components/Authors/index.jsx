import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Image,
    ScrollView,
} from "@gluestack-ui/themed"

import autor1 from "../../../assets/autor1.png"
import autor2 from "../../../assets/autor2.png"
import autor3 from "../../../assets/autor3.png"

const Authors = () => {
    return(
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={autor1} alt="genero 1" style={styles.image}/>
                </View>
                <View style={styles.card}>
                    <Image source={autor2} alt="genero 1" style={styles.image}/>
                </View>
                <View style={styles.card}>
                    <Image source={autor3} alt="genero 1" style={styles.image}/>
                </View>
                <View style={styles.card}>
                    <Image source={autor1} alt="genero 1" style={styles.image}/>
                </View>
            </View>
        </ScrollView>
);
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10,
        paddingHorizontal:15,
        flexDirection:"row",
        gap:20,
    },
    image:{
        width:102,
        height:102,
        bottom:10,
    },
});

export default Authors;