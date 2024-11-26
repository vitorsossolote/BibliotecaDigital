import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, ButtonProps, PressableProps } from 'react-native';
import {
    Button,
    ButtonText,
    Image,
    Pressable
} from "@gluestack-ui/themed"
import book from "../../../assets/book2.png"
import { SafeAreaView } from 'moti';
import { FlatList } from 'react-native-gesture-handler';
import { useAuth } from "../../contexts/AuthContext";

const { width: screenWidth } = Dimensions.get('window');

type Props = {
    onPress: (livros: any) => void; 
}

export default function Reservar({ onPress }: Props) {
 
    const {livros} = useAuth();
    const latestItem = useMemo(() => {
        if (livros.length === 0) return null;
    
        const maxId = Math.max(...livros.map(livro => livro.id));
        return livros.find(livro => livro.id === maxId);
    }, [livros]);

    const RenderItem = ({item}) => {
        return (
            <View style={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Reservar Novamente?</Text>
                    <Button 
                        style={styles.Button}
                        size="md"
                        variant="solid"
                        action="primary"
                        onPress={() => onPress(item)}
                    >
                        <ButtonText>Reservar Agora</ButtonText>
                    </Button>
                </View>
                <View style={styles.imageContainer}>
                    <Pressable onPress={() => onPress(item)}>
                        <Image style={styles.Image} source={item.image} alt="Parabéns" />
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <FlatList
                data={[latestItem]} 
                renderItem={RenderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        width: screenWidth - 40,
        marginHorizontal: 20,
        height: 160,
        flexDirection: 'row',
        backgroundColor: "#f3f3f3",
        borderRadius: 20,
        marginBottom: 15,
        right: 8,
        
    },
    textContainer: {
        width: 240,
        marginLeft: 20,
        padding: 15,
        paddingLeft: 23,
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
    Button: {
        backgroundColor: "#EE2D32",
        borderRadius: 25,
        marginTop: 20,
        width: 170,
    },
    imageContainer: {
        height: "100%",
        width: 145,
        right:10,
    },
    Image: {
        width: 110,
        height: 160,
        borderRadius: 10,
    },
});