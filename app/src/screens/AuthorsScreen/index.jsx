import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, Text, Image, Button, ButtonText } from "@gluestack-ui/themed"
import { ScrollView, StyleSheet, Pressable, SafeAreaView } from "react-native"
import { MoveLeft } from "lucide-react-native"
import { AirbnbRating } from 'react-native-ratings';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import axios from 'axios';
import Heart from "../../../assets/Heart.png";

export default function AuthorsScreen({ route, navigation }) {
    // Get the author data passed from the previous screen
    const { author } = route.params;

    // State to store author's books
    const [authorBooks, setAuthorBooks] = useState([]);

    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], [])

    // Fetch books for the specific author
    useEffect(() => {
        const fetchAuthorBooks = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:8085/api/ListBooks/autor/${author.id_autor}`);
                setAuthorBooks(response.data);
            } catch (error) {
                console.error("Erro ao buscar livros do autor:", error);
            }
        };

        fetchAuthorBooks();
    }, [author.id_autor]);

    const handleCloseAction = () => bottomSheetref.current?.close()
    const handleOpenPress = (book) => {
        // Set the selected book when opening bottom sheet
        setSelectedBook(book);
        bottomSheetref.current?.expand();
    };

    // State for selected book in bottom sheet
    const [selectedBook, setSelectedBook] = useState(null);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "#fafafa"}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <MoveLeft color={"#000"} size={35} />
                        </Pressable>
                        <Text style={styles.headerText}>Autores</Text>
                    </View>
                    <View style={styles.authorContentContainer}>
                        <Image 
                            source={{ uri: author.image }} 
                            alt="autor" 
                            resizeMode="cover" 
                            style={styles.authorImage} 
                        />
                        <Text style={styles.authorGenderText}>{author.genero}</Text>
                        <Text style={styles.authorNameText}>{author.nome_autor}</Text>
                    </View>
                    <View style={styles.aboutContainer}>
                        <Text style={styles.aboutHeader}>Sobre</Text>
                        <Text style={styles.desc}>{author.biografia || 'Biografia não disponível'}</Text>
                    </View>
                    <View style={styles.bookContainer}>
                        <Text style={styles.bookHeader}>Livros</Text>
                        <View style={{ flexDirection: "column", gap: 30 }}>
                            {authorBooks.length > 0 ? (
                                <View style={styles.bookGaleryContainer}>
                                    {authorBooks.map((book, index) => (
                                        <View key={index} style={styles.bookContent}>
                                            <Pressable onPress={() => handleOpenPress(book)}>
                                                <Image 
                                                    source={{ uri: book.image }} 
                                                    alt="livro" 
                                                    resizeMode="contain" 
                                                    style={styles.bookImage} 
                                                />
                                            </Pressable>
                                            <Text style={styles.bookName}>{book.titulo}</Text>
                                            <Text style={styles.bookStatus}>
                                                {book.status ? 'D' : 'Indisponível'}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <Text style={styles.desc}>Nenhum livro encontrado para este autor.</Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* BottomSheet for Book Details */}
            {selectedBook && (
                <BottomSheet
                    ref={bottomSheetref}
                    snapPoints={snapPoints}
                    index={-1}
                    enablePanDownToClose={true}>
                    <BottomSheetScrollView>
                        <View style={bottomSheetStyles.bookContainer}>
                            <Image 
                                source={{ uri: selectedBook.image }} 
                                alt="livro" 
                                style={bottomSheetStyles.bookStyle} 
                                resizeMode="contain" 
                            />
                        </View>
                        <View style={bottomSheetStyles.detailContainer}>
                            <View style={bottomSheetStyles.headerContainer}>
                                <Text style={bottomSheetStyles.title}>{selectedBook.titulo}</Text>
                                <Pressable>
                                    <Image source={Heart} alt="heart" resizeMode="contain" style={bottomSheetStyles.icon} />
                                </Pressable>
                            </View>
                            <Text style={bottomSheetStyles.description}>
                                {selectedBook.descricao || 'Descrição não disponível'}
                            </Text>
                        </View>
                        <View style={bottomSheetStyles.ratingContainer}>
                            <Text style={bottomSheetStyles.ratingTitle}>Avaliação</Text>
                            <AirbnbRating
                                count={5}
                                defaultRating={selectedBook.avaliacao || 0}
                                size={20}
                                showRating={false}
                                unSelectedColor="#000"
                                starContainerStyle={bottomSheetStyles.starRating}
                                readonly={true}
                                isDisabled={true}
                            />
                            <Text style={bottomSheetStyles.status}>
                                {selectedBook.disponivel ? 'Disponível' : 'Indisponível'}
                            </Text>
                        </View>
                        <View style={bottomSheetStyles.buttonContainer}>
                            <Button
                                style={bottomSheetStyles.buttonPrincipal}
                                onPress={() => {/* Implement loan logic */}}
                            >
                                <ButtonText style={bottomSheetStyles.buttonPrincipalText}>
                                    Continuar com Empréstimo
                                </ButtonText>
                            </Button>
                            <Button
                                style={bottomSheetStyles.buttonSecondary}
                                onPress={() => {/* Implement view books logic */}}
                            >
                                <ButtonText style={bottomSheetStyles.buttonSecondaryText}>
                                    Ver Livros
                                </ButtonText>
                            </Button>
                        </View>
                    </BottomSheetScrollView>
                </BottomSheet>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    header: {
        alignSelf: "flex-start",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        top: 10,
    },
    headerText: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold",
        left: 100
    },
    authorContentContainer: {
        alignSelf: "center",
        flexDirection: "column",
        top: 30,
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    },
    authorImage: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    authorGenderText: {
        fontSize: 20,
        color: "#000",
        fontWeight: "500",
    },
    authorNameText: {
        color: "#000",
        fontSize: 26,
        fontWeight: "bold"
    },
    aboutContainer: {
        left: 30,
        top: 50,
        width: "85%",
        gap: 8
    },
    aboutHeader: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold"
    },
    desc: {
        color: "#7A7A7A",
        fontSize: 18,
        fontWeight: "500"
    },
    bookContainer: {
        left: 30,
        top: 70,
        width: "85%",
        gap: 8,
    },
    bookHeader: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",
    },
    bookGaleryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 20,
    },
    bookContent: {
        width: "45%",
        marginBottom: 20,
    },
    bookImage: {
        width: "100%",
        height: 250,
        borderRadius: 20,
    },
    bookName: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10
    },
    bookStatus: {
        fontSize: 16,
        color: "#34A853",
        fontWeight: "bold",
    },
});

const bottomSheetStyles = StyleSheet.create({
    bookContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    bookStyle: {
        width: 237,
        height: 310,
    },
    detailContainer: {
        paddingHorizontal: 25,
        gap: 15,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
        flex: 1,
    },
    icon: {
        height: 24,
        width: 24,
        marginLeft: 10,
    },
    description: {
        fontSize: 16,
        color: "#7A7A7A",
    },
    ratingContainer: {
        paddingHorizontal: 22,
        gap: 10,
    },
    ratingTitle: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    },
    starRating: {
        justifyContent: "flex-start",
        marginLeft: 28,
    },
    status: {
        fontSize: 18,
        color: "#34A853",
        fontWeight: "bold",
    },
    buttonContainer: {
        flexDirection: "row",
        padding: 10,
        marginTop: 10,
        gap: 15,
        justifyContent: "center",
    },
    buttonPrincipal: {
        backgroundColor: "#ee2d32",
        width: 250,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonSecondary: {
        backgroundColor: "#EBF2EF",
        width: 115,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonPrincipalText: {
        color: "white",
        fontWeight: "bold",
    },
    buttonSecondaryText: {
        color: "#54408C",
        fontWeight: 'bold',
    },
});