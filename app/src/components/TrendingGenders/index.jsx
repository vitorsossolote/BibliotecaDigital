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

import genero1 from "../../../assets/genero1.png"
import genero2 from "../../../assets/genero2.png"
import genero3 from "../../../assets/genero3.png"

const TrendingGenders = () => {
    return(
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={genero3} alt="genero 1" style={styles.image} resizeMode="contain"/>
                </View>
                <View style={styles.card}>
                    <Image source={genero2} alt="genero 1" style={styles.image} resizeMode="contain"/>
                </View>
                <View style={styles.card}>
                    <Image source={genero1} alt="genero 1" style={styles.image} resizeMode="contain"/>
                </View>
                <View style={styles.card}>
                    <Image source={genero3} alt="genero 1" style={styles.image} resizeMode="contain"/>
                </View>
                <View style={styles.card}>
                    <Image source={genero3} alt="genero 1" style={styles.image} resizeMode="contain"/>
                </View>
                <View style={styles.card}>
                    <Image source={genero2} alt="genero 1" style={styles.image} resizeMode="contain"/>
                </View>
                <View style={styles.card}>
                    <Image source={genero1} alt="genero 1" style={styles.image} resizeMode="contain"/>
                </View>
                <View style={styles.card}>
                    <Image source={genero3} alt="genero 1" style={styles.image} resizeMode="contain"/>
                </View>
            </View>
        </ScrollView>
);
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:10,
        paddingHorizontal:20,
        flexDirection:"row",
        gap:20,
    },
    image:{
        width:70,
        height:20,
        bottom:10,
    },
});

export default TrendingGenders;