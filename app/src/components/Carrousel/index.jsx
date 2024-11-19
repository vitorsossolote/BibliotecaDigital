import React, { useState,useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel,{Pagination} from 'react-native-snap-carousel';
import {
    Button,
    ButtonText,
    Image,
} from "@gluestack-ui/themed"
import { Data } from '../../data/data';
import { AirbnbRating } from 'react-native-ratings';

import book from "../../../assets/book.png" 
const { width: screenWidth } = Dimensions.get('window');


const MyCarousel = ({ data }) => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <AirbnbRating
                        count={5}
                        defaultRating={item.rating}
                        size={25}
                        showRating={false}
                        unSelectedColor="#000"
                        starContainerStyle={styles.starRating}
                        readonly={false}
                        isDisabled={true}
                    />
                <Button style={styles.Button}
                    size="md"
                    variant="solid"
                    action="primary"
                    >
                    <ButtonText>Reservar Agora</ButtonText>
                </Button>
            </View>
            <View style={styles.imageContainer}>
                    <Image style={styles.Image} source={item.image} alt="Parabéns" />
                </View>
        </View>
    );
    
    const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);
    return (
        <>
        <Carousel
            ref={isCarousel}
            data={data}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            layout={'default'}
            onSnapToItem={index => setIndex(index)}
        />
        <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: -1,
          backgroundColor: '#ee2d32',
          bottom:20
        }}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: 'black',
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      </>
    );
};

const Carrosel = () => {
    return (
        <MyCarousel data={Data} />
    );
};

const styles = StyleSheet.create({
    card: {
        flex:1,
        width: screenWidth - 40,
        marginHorizontal: 20,
        height: 160,
        flexDirection:'row',
        backgroundColor:"#f6f6f6",
        borderRadius:20,
        marginTop:15,
        right:8,
        elevation:5
    },
    starRating: {
        right: 27,
        top:15
    },
    textContainer: {
        width: 240,
        padding:15,
        paddingLeft:23,
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
        marginTop:20,
        width:170,
        top:10,
        right:6
    },
    imageContainer:{
        height:"100%",
        width:145,
    },
    Image:{
        width:145,
        height:160,
        borderRadius:15,
    },
});

export default Carrosel;