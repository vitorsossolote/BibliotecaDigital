import React from "react"
import { View, Text, Image, Pressable } from "@gluestack-ui/themed"
import { StyleSheet, SafeAreaView, ScrollView } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MotiView } from 'moti'
import MainHeader from "../../components/MainHeader/index"
import { MoveLeft } from 'lucide-react-native'

// Import your context
import { useAuth } from "../../contexts/AuthContext";

export default function FavoritesScreen({navigation}) {
    const { user, favorites, removeFromFavorites } = useAuth();

    const renderFavoriteBooks = () => {
        return favorites.map((book) => (
            <View key={book.id} style={styles.contentContainer}>
                <View style={styles.favoriteBookContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={book.image} style={styles.bookImage} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.bookTitle}>{book.name}</Text>
                        <Text style={[styles.bookStatus,{ color: book.status.toLowerCase() === 'disponivel' ? '#34A853' : '#ee2d32' }]}>{book.status}</Text>
                    </View>
                    <View>
                        <Pressable 
                            size="md" 
                            bg="transparent" 
                            onPress={() => removeFromFavorites(book.id)} 
                            style={styles.iconContainer}
                        >
                            <MotiView from={{ rotateY: "0deg" }} animate={{ rotateY: "360deg" }}>
                                <Ionicons name="heart" size={30} color={"#ee2d32"} />
                            </MotiView>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.divider} />
            </View>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <MainHeader 
                    title="Seus Favoritos" 
                    icon1={MoveLeft} 
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
            <ScrollView>
                {favorites.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Você não tem livros favoritos</Text>
                    </View>
                ) : (
                    renderFavoriteBooks()
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

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
        marginHorizontal: 20,
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
        gap: 6,
        width:"70%"
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    }
});