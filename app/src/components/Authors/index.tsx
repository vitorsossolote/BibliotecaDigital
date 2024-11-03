import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import {
    Image,
    ScrollView,
} from "@gluestack-ui/themed"
import { useNavigation } from '@react-navigation/native';

import autor1 from "../../../assets/autor1.png"
import autor2 from "../../../assets/autor2.png"
import autor3 from "../../../assets/autor3.png"

interface Props{
    onPress1 : any,
    onPress2 : any,
    onPress3 : any,
    onPress4: any,
}


const Authors = (props : Props) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.container}>
                    <Pressable onPress={props.onPress1}>
                        <Image source={autor1} alt="genero 1" style={styles.image} />
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Pressable onPress={props.onPress2}>
                        <Image source={autor2} alt="genero 1" style={styles.image} />
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Pressable onPress={props.onPress3}>
                        <Image source={autor3} alt="genero 1" style={styles.image} />
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Pressable onPress={props.onPress4}>
                        <Image source={autor1} alt="genero 1" style={styles.image} />
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        gap: 20,
    },
    image: {
        width: 102,
        height: 102,
        bottom: 10,
    },
});

export default Authors;