import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, PressableProps, ButtonProps } from 'react-native';
import {
    Image,
} from "@gluestack-ui/themed"
import book1 from "../../../assets/book2.png"
import book2 from "../../../assets/book3.png"
import book3 from "../../../assets/book4.png"
import { useAuth } from "../../contexts/AuthContext";

type Props = {
    onPress: (livro: any) => void; 
}

export default function TrendingBooks ({ onPress }: Props) {
    const { livros } = useAuth();

    // Função para obter os 10 livros mais bem avaliados
    const getTopRatedBooks = useCallback(() => {
        return [...livros]
            .sort((a, b) => b.avaliacao - a.avaliacao)
            .slice(0, 10);
    }, [livros]);

    const topRatedBooks = getTopRatedBooks();

    const getStatusColor = (estado: string) => {
        return estado.toLowerCase() === 'd' ? '#2ecc71' : '#ee2d32';
    };

    const truncateTitle = (title) => {
        if (title.length > 11) {
            return title.substring(0, 17) + '...';
        }
        return title;
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Pressable onPress={() => onPress(item)}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} alt={item.titulo} style={styles.image} />
                </View>
            </Pressable>
            <Text style={styles.title}>{truncateTitle(item.titulo || "Sem título")}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.estado) }]}>
                {item.estado}{item.estado.toLowerCase() === 'd' ? 'isponivel' : 'mprestado'}
            </Text>
        </View>
    );

    return (
        <FlatList
            data={topRatedBooks}
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