
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { AirbnbRating } from "react-native-ratings";
import { Input, InputSlot, InputField, InputIcon, ScrollView } from '@gluestack-ui/themed';
import { Search, MoveLeft } from 'lucide-react-native';
import MainHeader from '../../components/MainHeader';
import book from "../../../assets/book7.png";

const SearchScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const { livros, loading, error } = useAuth();
    const [list, setList] = useState(livros);

    const truncateTitle = (title) => {
        if (title.length > 17) {
            return title.substring(0, 17) + '...';
        }
        return title;
    };
    const truncateAutor = (autor) => {
        if (autor.length > 17) {
            return autor.substring(0, 17) + '...';
        }
        return autor;
    };

    useEffect(() => {
        if (searchText === '') {
            setList(livros);
        } else {
            setList(
                livros.filter(
                    (item) =>
                        item.titulo.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                        item.genero.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                        item.autor.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                )
            );
        }
    }, [searchText]);

    const handleOrderClick = () => {
        let newList = [...livros];

        newList.sort((a, b) => (a.titulo > b.titulo ? 1 : b.titulo > a.titulo ? -1 : 0)) ||
            newList.sort((a, b) => (a.genero > b.genero ? 1 : b.genero > a.genero ? -1 : 0));

        setList(newList);
    };

    const RenderBookItem = ({ data }) => (
        <TouchableOpacity
            onPress={() => {
                // Navigate to book details or perform other actions
                // navigation.navigate('BookDetail', { bookId: item.id })
            }}
        >
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
                    <Text style={styles.gender}>{data.genero || "Gênero não especificado"}</Text>
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
                    <Text style={styles.author}>{truncateTitle(data.autor || "Sem Autor")}</Text>
                    <Text style={styles.status}>{data.status || "Disponível"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <MainHeader
                        title="Pesquisar"
                        icon1={MoveLeft}
                        onPress={() => {
                            console.log('Voltando para Home');
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
                    {selectedBook && ( // Só renderiza se houver um livro selecionado
                        <>
                            <View style={styles.bookContainer}>
                                <Image source={selectedBook.image} alt="livro" style={styles.bookStyle} resizeMode="contain" />
                            </View>
                            <View style={styles.detailContainer}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.title}>{selectedBook.name}</Text>
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
                                </View>
                                <View style={styles.genderContainer}>
                                    <Text style={styles.genderText}>Suspense</Text>
                                </View>
                                <Text style={styles.description}>{selectedBook.description}</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingTitle}>Avaliação</Text>
                                <AirbnbRating
                                    count={5}
                                    defaultRating={selectedBook.rating || 1}
                                    size={20}
                                    showRating={false}
                                    unSelectedColor="#000"
                                    starContainerStyle={styles.starRating}
                                    isDisabled={true}
                                />
                                <Text style={[styles.status,
                                { color: selectedBook.status.toLowerCase() === 'disponivel' ? '#34A853' : '#ee2d32' }]}>
                                    {selectedBook.status}
                                </Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    size="md"
                                    variant="solid"
                                    action="primary"
                                    isDisabled={selectedBook.status.toLowerCase() !== 'disponivel'}
                                    isFocusVisible={false}
                                    style={styles.buttonPrincipal}
                                >
                                    <ButtonText style={styles.buttonPrincipalText}>
                                        Continuar com Empréstimo
                                    </ButtonText>
                                </Button>
                                <Button
                                    size="md"
                                    variant="solid"
                                    action="primary"
                                    isDisabled={false}
                                    isFocusVisible={false}
                                    style={styles.buttonSecondary}
                                >
                                    <ButtonText style={styles.buttonSecondaryText}>
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

const styles = {
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    searchButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookAuthor: {
        color: '#666',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
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
    bookSearch: {
        marginHorizontal: 30,
        marginTop: 30,
        height: "100%"
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
    statusText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    }
};

export default SearchScreen;