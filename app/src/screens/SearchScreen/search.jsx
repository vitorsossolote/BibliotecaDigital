import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ToastAndroid } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { AirbnbRating } from "react-native-ratings";
import { Input, InputSlot, InputField, InputIcon, ScrollView, Button, ButtonText, Pressable } from '@gluestack-ui/themed';
import { Search, MoveLeft } from 'lucide-react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MotiView } from 'moti';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainHeader from '../../components/MainHeader';
import book from "../../../assets/book7.png";

const SearchScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const { user, livros, loading, error, addToFavorites, removeFromFavorites, checkFavoriteStatus,authLibrarianData } = useAuth();
    const [list, setList] = useState(livros);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);

    // Bottom Sheet Configuration
    const bottomSheetref = useRef(null);
    const snapPoints = useMemo(() => ["30%", "80%", "90%", "100%"], []);

    const handleOpenPress = (bookData) => {
        setSelectedBook(bookData);
        const isBookFavorited = checkFavoriteStatus(bookData.id);
        setIsFavorited(isBookFavorited);
        bottomSheetref.current?.expand();
    };

    const handleFavoritePress = () => {
        if (!user) {
            ToastAndroid.show("Por favor, faça login", ToastAndroid.SHORT);
            return;
        }

        try {
            if (isFavorited) {
                removeFromFavorites(selectedBook.id);
                ToastAndroid.show("Removido dos favoritos", ToastAndroid.SHORT);
            } else {
                addToFavorites({
                    id: selectedBook.id,
                    name: selectedBook.titulo,
                    image: selectedBook.image,
                    description: selectedBook.description,
                    status: selectedBook.status
                });
                ToastAndroid.show("Adicionado aos favoritos", ToastAndroid.SHORT);
            }

            setIsFavorited(!isFavorited);
        } catch (error) {
            console.error("Erro ao gerenciar favoritos:", error);
            ToastAndroid.show("Erro ao gerenciar favoritos", ToastAndroid.SHORT);
        }
    };

    const truncateTitle = (title) => {
        if (title.length > 17) {
            return title.substring(0, 17) + '...';
        }
        return title;
    };

    useEffect(() => {
        if (searchText === '') {
            setList(livros);
        } else {
            setList(
                livros.filter(
                    (item) =>
                        item.titulo.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                        item.nome_autor.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                        item.nome_genero.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                )
            );
        }
    }, [searchText]);

    const RenderBookItem = ({ data }) => (
        <TouchableOpacity onPress={() => handleOpenPress(data)}>
            <View key={data.id} style={styles.bookContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={data.image ? { uri: data.image } : book}
                        alt="Book"
                        style={styles.image}
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>
                        {truncateTitle(data.titulo || "Sem título")}
                    </Text>
                    <Text style={styles.gender}>{data.nome_genero || "Gênero não especificado"}</Text>
                    <AirbnbRating
                        count={5}
                        defaultRating={data.rating || 4}
                        size={20}
                        showRating={false}
                        unSelectedColor="#000"
                        starContainerStyle={styles.starRating}
                        readonly={true}
                        isDisabled={true}
                    />
                    <Text style={styles.author}>{truncateTitle(data.nome_autor || "Sem Autor")}</Text>
                    <Text style={[styles.bookStatus, 
                            { color: data.estado.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }
                            ]}>{data.estado}{data.estado.toLowerCase() === 'd' ? 'isponivel' : 'mprestado'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <MainHeader
                        title="Pesquisar"
                        icon1={MoveLeft}
                        onPress={() => {
                            navigation.navigate("Home");
                        }}
                    />
                </View>
                <View>
                    <Input style={styles.searchbarContainer}>
                        <InputSlot style={styles.inputSlot}>
                            <InputIcon as={Search} size={'xl'} />
                        </InputSlot>
                        <InputField
                            placeholder="Pesquisar..."
                            style={styles.searchText}
                            value={searchText}
                            onChangeText={(t) => setSearchText(t)}
                        />
                    </Input>
                </View>

                {loading && <Text>Carregando...</Text>}
                {error && <Text style={styles.errorText}>{error}</Text>}

                <FlatList
                    data={list}
                    renderItem={({ item }) => <RenderBookItem data={item} />}
                    keyExtractor={(item) => item.id}
                />
            </ScrollView>

            <BottomSheet
                ref={bottomSheetref}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose={true}>
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    {selectedBook && (
                        <>
                            <View style={styles.bottomSheetBookContainer}>
                                <Image
                                    source={selectedBook.image ? { uri: selectedBook.image } : book}
                                    style={styles.bottomSheetBookStyle}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.bottomSheetDetailContainer}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={styles.bottomSheetHeaderContainer}>
                                        <Text style={styles.bottomSheetTitle}>{selectedBook.titulo}</Text>
                                    </View>
                                    <View>
                                        <Pressable
                                            size="md"
                                            bg="transparent"
                                            style={{ top: 7 }}
                                            onPress={handleFavoritePress}
                                        >
                                            {isFavorited ? (
                                                <MotiView from={{ rotateY: "0deg" }} animate={{ rotateY: "360deg" }}>
                                                    <Ionicons name="heart" size={26} color={"#ee2d32"} />
                                                </MotiView>
                                            ) : (
                                                <MotiView from={{ rotateY: "360deg" }} animate={{ rotateY: "0deg" }}>
                                                    <Ionicons name="heart-outline" size={26} color={"#ee2d32"} />
                                                </MotiView>
                                            )}
                                        </Pressable>
                                        {authLibrarianData && (
                                            <>
                                                <Pressable 
                                                    style={{
                                                        backgroundColor:"#ee2d32", 
                                                        width:50,
                                                        height:30, 
                                                        justifyContent:"center",
                                                        alignItems:"center", 
                                                        borderRadius:10,
                                                        borderWidth:1, 
                                                        borderColor:"#ee2d32", 
                                                        marginTop:10,
                                                    }}
                                                    onPress={() => console.log("Excluiu")}
                                                >
                                                    <Text style={{color:"#fff", fontWeight:"bold"}}>Excluir</Text>
                                                </Pressable>
                                                <Pressable 
                                                    style={{
                                                        backgroundColor:"#fff", 
                                                        width:50,
                                                        height:30, 
                                                        justifyContent:"center",
                                                        alignItems:"center", 
                                                        borderRadius:10,
                                                        borderWidth:1, 
                                                        borderColor:"#ee2d32", 
                                                        marginTop:10,
                                                    }}
                                                    onPress={() => navigation.navigate("EditBooks")}
                                                >
                                                    <Text style={{color:"#000", fontWeight:"bold"}}>Editar</Text>
                                                </Pressable>
                                            </>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.bottomSheetGenderContainer}>
                                    <Text style={styles.bottomSheetGenderText}>{selectedBook.genero}</Text>
                                </View>
                                <Text style={styles.bottomSheetDescription}>{selectedBook.description || "Sem descrição disponível"}</Text>
                            </View>
                            <View style={styles.bottomSheetRatingContainer}>
                                <Text style={styles.bottomSheetRatingTitle}>Avaliação</Text>
                                <AirbnbRating
                                    count={5}
                                    defaultRating={selectedBook.rating || 1}
                                    size={20}
                                    showRating={false}
                                    unSelectedColor="#000"
                                    starContainerStyle={styles.bottomSheetStarRating}
                                    isDisabled={true}
                                />
                                <Text style={[
                                    styles.bottomSheetStatus,
                                    { color: selectedBook.estado?.toLowerCase() === 'd' ? '#34A853' : '#ee2d32' }
                                ]}>
                                    {selectedBook.estado}{selectedBook.estado.toLowerCase() === 'd' ? 'isponivel' : 'mprestado'}
                                </Text>
                            </View>
                            <View style={styles.bottomSheetButtonContainer}>
                                <Button
                                    size="md"
                                    variant="solid"
                                    action="primary"
                                    isDisabled={selectedBook.estado?.toLowerCase() !== 'd'}
                                    isFocusVisible={false}
                                    style={styles.bottomSheetButtonPrincipal}
                                >
                                    <ButtonText style={styles.bottomSheetButtonPrincipalText}>
                                        Continuar com Empréstimo
                                    </ButtonText>
                                </Button>
                                <Button
                                    size="md"
                                    variant="solid"
                                    action="primary"
                                    isDisabled={false}
                                    isFocusVisible={false}
                                    style={styles.bottomSheetButtonSecondary}
                                >
                                    <ButtonText style={styles.bottomSheetButtonSecondaryText}>
                                        Ver Livros
                                    </ButtonText>
                                </Button>
                            </View>
                        </>
                    )}
                </BottomSheetScrollView>
            </BottomSheet>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
    },
    searchbarContainer: {
        borderRadius: 10,
        width: 320,
        height: 50,
        alignSelf: "center",
        backgroundColor: "#f5f5f5",
        flexDirection: "row",
        paddingLeft: 10,
        alignItems: "center",
        marginTop: 20,
    },
    inputSlot: {
        marginRight: 20
    },
    searchText: {
        fontSize: 18,
        top: 1
    },
    bookContainer: {
        height: 165,
        width: "100%",
        flexDirection: "row",
        marginBottom: 20,
        marginHorizontal: 20,
        marginTop: 10
    },
    imageContainer: {
        padding: 10,
        right: 20
    },
    image: {
        width: 120,
        height: 170,
        borderRadius: 10,
    },
    detailsContainer: {
        marginTop: 10,
        flexDirection: "column",
        left: 15,
        gap: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
    },
    gender: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: "#000",
    },
    starRating: {
        alignSelf: "flex-start",
        right: 5,
    },
    author: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: "#000",
    },
    status: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: "#ee2d32",
    },
    // Bottom Sheet Styles
    bottomSheetBookContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    bottomSheetBookStyle: {
        width: 237,
        height: 310,
        borderRadius:10,
    },
    bottomSheetDetailContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
        paddingHorizontal: 25,
        gap: 15,
    },
    bottomSheetHeaderContainer: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    bottomSheetTitle: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    },
    bottomSheetDescription: {
        fontSize: 16,
    },
    bottomSheetGenderContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    bottomSheetGenderText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 5,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        color: '#2c3e50',
        letterSpacing: 3,
        textShadowColor: 'rgba(44, 62, 80, 0.5)',
    },
    bottomSheetRatingContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 10,
        paddingHorizontal: 22,
        gap: 10,
        width: 160,
    },
    bottomSheetRatingTitle: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
    },
    bottomSheetStarRating: {
        flex: 1,
        justifyContent: "flex-start",
        marginLeft: 28,
        gap: 4,
    },
    bottomSheetStatus: {
        fontSize: 18,
        fontWeight: "bold",
    },
    bottomSheetButtonContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        marginTop: 10,
        gap: 15,
    },
    bottomSheetButtonPrincipal: {
        backgroundColor: "#ee2d32",
        width: 250,
        height: 50,
        borderRadius: 25,
    },
    bottomSheetButtonSecondary: {
        backgroundColor: "#EBF2EF",
        width: 115,
        height: 50,
        borderRadius: 25,
        paddingLeft: 15,
    },
    bottomSheetButtonPrincipalText: {
        fontWeight: "bold",
    },
    bottomSheetButtonSecondaryText: {
        color: "#54408C",
        fontWeight: 'bold',
    },
});

export default SearchScreen;