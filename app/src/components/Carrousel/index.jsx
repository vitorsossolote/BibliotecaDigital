import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
    Button,
    ButtonText,
    Image,
} from "@gluestack-ui/themed"
import { AirbnbRating } from 'react-native-ratings';
import { useAuth } from '../../contexts/AuthContext';

const { width: screenWidth } = Dimensions.get('window');

type Props = {
    onPress: (livro: any) => void; 
}

export default function Carrosel({onPress} : Props) {
    const { livros } = useAuth();
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    // Função para ordenar e filtrar os 5 livros com maiores IDs
    const getLatestBooks = useCallback(() => {
        return [...livros]
            .sort((a, b) => b.id - a.id)
            .slice(0, 5);
    }, [livros]);

    const latestBooks = getLatestBooks();

    const truncateTitle = (title) => {
        if (title.length > 17) {
            return title.substring(0, 13) + '...';
        }
        return title;
    };

    const handleSnapToItem = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{truncateTitle(item.titulo || "Sem título")}</Text>
                <AirbnbRating
                    count={5}
                    defaultRating={item.avaliacao}
                    size={25}
                    showRating={false}
                    unSelectedColor="#000"
                    starContainerStyle={styles.starRating}
                    readonly={false}
                    isDisabled={true}
                />
                <Button 
                    style={styles.Button}
                    size="md"
                    variant="solid"
                    action="primary"
                    onPress={() => onPress(item)}
                >
                    <ButtonText>Ver livro</ButtonText>
                </Button>
            </View>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.Image} 
                    source={item.image} 
                    alt="Imagem do livro"
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                data={latestBooks}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                layout={'default'}
                onSnapToItem={handleSnapToItem}
                loop={true}
                enableSnap={true}
                activeSlideOffset={20}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                firstItem={0}
            />
            <Pagination
                dotsLength={latestBooks.length}
                activeDotIndex={activeIndex}
                carouselRef={carouselRef}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: -1,
                    backgroundColor: '#ee2d32',
                    top: 25
                }}
                containerStyle={styles.paginationContainer}
                tappableDots={true}
                inactiveDotStyle={{
                    backgroundColor: 'black',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10
    },
    card: {
        flex: 1,
        width: screenWidth - 40,
        marginHorizontal: 20,
        height: 160,
        flexDirection: 'row',
        backgroundColor: "#f3f3f3",
        borderRadius: 20,
        marginTop: 15,
        right: 8,
    },
    starRating: {
        right: 27,
        top: 15
    },
    textContainer: {
        width: 240,
        padding: 15,
        paddingLeft: 23,
    },
    title: {
        fontSize: 24,
        color: 'black',
        fontWeight: '700'
    },
    Button: {
        backgroundColor: "#EE2D32",
        borderRadius: 25,
        marginTop: 20,
        width: 170,
        top: 10,
        right: 6
    },
    imageContainer: {
        height: "100%",
        width: 145,
        left: 10
    },
    Image: {
        width: 110,
        height: 160,
        borderRadius: 10,
    },
    paginationContainer: {
        paddingVertical: 8,
        bottom: 20
    }
});