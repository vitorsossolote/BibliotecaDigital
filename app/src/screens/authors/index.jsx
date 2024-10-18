import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, Pressable, Image } from "react-native"
import {Avatar, AvatarImage, AvatarFallbackText} from "@gluestack-ui/themed"
import { MotiView, } from 'moti'
import MainHeader from "../../Components/MainHeader/index";
import { Search, ArrowLeft } from 'lucide-react-native';

import autor1 from "../../../assets/autor1.png"
import autor2 from "../../../assets/autor2.png"
import autor3 from "../../../assets/autor3.png"
import genero1 from "../../../assets/genero1.png"
import genero2 from "../../../assets/genero2.png"
import genero3 from "../../../assets/genero3.png"

const Data = [
    { id: 1, name: "John Freeman", description: "American writer he was the editor of the", image: autor1 },
    { id: 2, name: "Adam Dalva", description: "He is the senior fiction editor of guernica ma", image: autor2 },
    { id: 3, name: "Tess Gunty", description: "Gunty was born and raised in south bend,indiana", image: autor3 }
]

const Item = ({image, name, desc}) => (
    <View style={{ flexDirection: "row", marginTop:20, width:350 }}>
        <Avatar>
            <AvatarImage source={image} style={{width:90, height:90}} resizeMode="contain"/>
        </Avatar>
        <View style={{flexDirection:"column", marginLeft:10,flex:1,}}>
            <Text style={{color:"#000", fontWeight:"bold",fontSize:22}}>{name}</Text>
            <Text style={{color:"#66707A", fontSize:17,top:5,lineHeight: 25}}>{desc}</Text>
        </View>
    </View>
);

const AuthorsScreen = () => {
    return (
        <SafeAreaView>
            <MotiView style={{ position: "absolute", width: 500, height: 700 }}>
                <ScrollView>
                    <View style={{ width: 400, marginTop: 10, height: 50 }}>
                        <MainHeader title="Autores" icon1={ArrowLeft} icon2={Search} />
                    </View>
                    <View style={{ margin: 30 }}>
                        <Text style={{ fontSize: 16 }}>Checar Autores</Text>
                        <Text style={{ fontSize: 24, color: "#ee2d32", fontWeight: "bold", }}>Autores</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flex: 1, padding: 10, paddingHorizontal: 30, flexDirection: "row", gap: 20, }}>
                            <View>
                                <Image source={genero3} alt="genero 1" />
                            </View>
                            <View >
                                <Image source={genero2} alt="genero 1" />
                            </View>
                            <View>
                                <Image source={genero1} alt="genero 1" />
                            </View>
                            <View >
                                <Image source={genero3} alt="genero 1" />
                            </View>
                            <View >
                                <Image source={genero3} alt="genero 1" />
                            </View>
                            <View >
                                <Image source={genero2} alt="genero 1" />
                            </View>
                            <View >
                                <Image source={genero1} alt="genero 1" />
                            </View>
                            <View>
                                <Image source={genero3} alt="genero 1" />
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                        <FlatList
                            data={Data}
                            renderItem={({ item }) => <Item image={item.image} name={item.name} desc={item.description}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
            </MotiView>
        </SafeAreaView>
    );
};


export default AuthorsScreen;