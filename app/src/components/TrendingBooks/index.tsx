import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, } from 'react-native';
import {
    Image,
} from "@gluestack-ui/themed"
import ButtonSheet from '../ButtonSheet/index';
import { teste } from '../ButtonSheet/index';
import book1 from "../../../assets/book2.png"
import book2 from "../../../assets/book3.png"
import book3 from "../../../assets/book4.png"

type Props = ButtonProps & PressableProps & {
    onPress: any
}
const TrendingBooks = ({ onPress }: Props) => {

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Pressable onPress={onPress}>
                        <View style={styles.imageContainer}>
                            <Image source={book1} alt="livro 1" style={styles.image} />
                        </View>
                    </Pressable>
                    <Text style={styles.title}>The Kite Runner</Text>
                    <Text style={styles.status}>Reservado</Text>
                </View>
                <View style={styles.card}>
                    <Pressable onPress={onPress}>
                        <View style={styles.imageContainer}>
                            <Image source={book2} alt="livro 1" style={styles.image} />
                        </View>
                    </Pressable>
                    <Text style={styles.title}>Nome Livro</Text>
                    <Text style={styles.status}>Reservado</Text>
                </View>
                <View style={styles.card}>
                    <Pressable onPress={onPress}>
                        <View style={styles.imageContainer}>
                            <Image source={book3} alt="livro 1" style={styles.image} />
                        </View>
                    </Pressable>
                    <Text style={styles.title}>Nome Livro</Text>
                    <Text style={styles.status}>Reservado</Text>
                </View>
                <View style={styles.card}>
                    <Pressable onPress={onPress}>
                        <View style={styles.imageContainer}>
                            <Image source={book1} alt="livro 1" style={styles.image} />
                        </View>
                    </Pressable>
                    <Text style={styles.title}>Nome Livro</Text>
                    <Text style={styles.status}>Reservado</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: 220,
        paddingHorizontal: 20,
        gap: 15,

    },
    card: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
    },
    imageContainer: {
        width: 125,
        height: 150,
    },
    image: {
        width: 125,
        height: 150,
        borderRadius: 15,
    },
    title: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
    },
    status: {
        fontSize: 14,
        color: "#ee2d32",
        fontWeight: "600",
    },
});

export default TrendingBooks;