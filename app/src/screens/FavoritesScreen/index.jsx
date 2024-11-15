//Tela de Favoritos
//Bibliotecas Utilizadas
import React, { useState } from "react"
import { Center, View, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, Image, Divider } from "@gluestack-ui/themed"
import { StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native"
import MainHeader from "../../components/MainHeader/index"
import { MoveLeft } from 'lucide-react-native'
import { MotiView } from 'moti'
import Ionicons from 'react-native-vector-icons/Ionicons'
//Componentes utilizados

//Imagens Utilizadas
import book from "../../../assets/book2.png"

//Inicio do código
export default function FavoritesScreen(navigation) {
    const [isFavorited, setIsFavorited] = useState(true);

    const handlePress = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <MainHeader title="Seus Favoritos" icon1={MoveLeft} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.favoriteBookContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={book} style={styles.bookImage} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.bookTitle}>The Kite Runner</Text>
                            <Text style={styles.bookStatus}>Disponivel</Text>
                        </View>
                        <View>
                            <Pressable size="md" bg="transparent" onPress={handlePress} style={styles.iconContainer}>
                                {
                                    isFavorited ? (
                                        <>
                                            <MotiView from={{ rotateY: "0deg" }} animate={{ rotateY: "360deg" }}>
                                                <Ionicons name="heart" size={30} color={"#ee2d32"} />
                                            </MotiView>
                                        </>
                                    ) :
                                        <><MotiView from={{ rotateY: "360deg" }} animate={{ rotateY: "0deg" }}>
                                            <Ionicons name="heart-outline" size={30} color={"#ee2d32"} />
                                        </MotiView>
                                        </>
                                }
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ width: "130%",top:10,right:40,height:0.5, backgroundColor:"#c3c3c3" }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        width: "100%",
        marginTop: 20,
    },
    contentContainer: {
        margin: 20,
        padding: 20,
    },
    favoriteBookContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
    },
    imageContainer: {
        right: 15,
    },
    bookImage: {
        borderRadius: 15,

    },
    textContainer: {
        right: 20,
        gap: 6,
    },
    bookTitle: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold"
    },
    bookStatus: {
        color: "#34A853",
        fontSize: 18,
        fontWeight: "semibold"
    },
    iconContainer: {
        alignSelf: "center",
    },
});


