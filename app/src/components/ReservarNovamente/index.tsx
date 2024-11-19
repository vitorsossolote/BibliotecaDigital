import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, ButtonProps, PressableProps } from 'react-native';
import {
    Button,
    ButtonText,
    Image,
    Pressable
} from "@gluestack-ui/themed"
import book from "../../../assets/book2.png"
const { width: screenWidth } = Dimensions.get('window');
import { Data } from '../../data/data';
import { SafeAreaView } from 'moti';
import { FlatList } from 'react-native-gesture-handler';

type Props = ButtonProps & PressableProps & {
    onPress: any
}

export default function Reservar({ onPress }: Props) {
    const latestItem = useMemo(() => {
        return Data.reduce((prev, current) => {
            return (prev.id > current.id) ? prev : current;
        });
    }, [Data]);

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
                        onPress={onPress}
                    >
                        <ButtonText>Reservar Agora</ButtonText>
                    </Button>
                </View>
                <View style={styles.imageContainer}>
                    <Pressable onPress={onPress}>
                        <Image style={styles.Image} source={item.image} alt="Parabéns" />
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView>
            <FlatList
                data={[latestItem]} // Passando apenas o item com maior ID como array
                renderItem={RenderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: screenWidth - 40,
        marginHorizontal: 20,
        height: 160,
        flexDirection: 'row',
        backgroundColor: "#f6f6f6",
        borderRadius: 20,
        bottom: 20,
        right: 10,
        // elevation: 5,
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
        paddingLeft: 15,
    },
    Image: {
        width: 110,
        height: 160,
        borderRadius: 10,
    },
});