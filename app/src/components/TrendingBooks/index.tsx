import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, PressableProps, ButtonProps } from 'react-native';
import {
    Image,
} from "@gluestack-ui/themed"
import book1 from "../../../assets/book2.png"
import book2 from "../../../assets/book3.png"
import book3 from "../../../assets/book4.png"
import { Data } from '../../data/data';

type Props = ButtonProps & PressableProps & {
    onPress: any
}

const TrendingBooks = ({ onPress }: Props) => {
    const getStatusColor = (status: string) => {
        return status.toLowerCase() === 'disponivel' ? '#2ecc71' : '#ee2d32';
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Pressable onPress={onPress}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} alt={item.name} style={styles.image} />
                </View>
            </Pressable>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                {item.status}
            </Text>
        </View>
    );

    return (
        <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        gap: 15,
        marginBottom: 20
    },
    card: {
        flexDirection: "column",
        gap: 5,
        marginRight: 15,
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
        fontWeight: "600",
    },
});

export default TrendingBooks;