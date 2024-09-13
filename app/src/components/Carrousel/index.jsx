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

import book from "../../../assets/book.png" 

const { width: screenWidth } = Dimensions.get('window');

const dummyData = [
    { id: 1, rating: '91%'},
    { id: 2, rating: '85%' },
    { id: 3, rating: '89%' },
    { id: 4, rating: '93%' },
    { id: 5, rating: '85%' }
];

const MyCarousel = ({ data }) => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Livro em Destaque</Text>
                <Text style={styles.rating}>{item.rating} aprovaram</Text>
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

    return (
        <Carousel
            data={data}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            layout={'default'}
        />
    );
};

const Carrosel = () => {
    return (
        <MyCarousel data={dummyData} />
    );
};

const styles = StyleSheet.create({
    card: {
        flex:1,
        width: screenWidth - 40,
        marginHorizontal: 20,
        height: 200,
    },
    textContainer: {
        flex: 1,
        marginTop: 20,
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
        marginTop:10,
        width:170,
    },
    imageContainer:{
        marginBottom:50,
        alignItems:'flex-end',
    },
    Image:{
        width:100,
        height:100,
        marginRight:20,
    },
});

export default Carrosel;