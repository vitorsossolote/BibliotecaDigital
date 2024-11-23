
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { AirbnbRating } from "react-native-ratings";
import { Input, InputSlot, InputField, InputIcon, ScrollView } from '@gluestack-ui/themed';
import { Search,MoveLeft } from 'lucide-react-native';
import MainHeader from '../../components/MainHeader';
import book from "../../../assets/book7.png";

const SearchScreen = ({navigation}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { searchLivros, livros, loading, error } = useAuth();

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            searchLivros(searchTerm);
        }
    };

    const renderBookItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                // Navigate to book details or perform other actions
                // navigation.navigate('BookDetail', { bookId: item.id })
            }}
        >
            <View key={item.id} style={styles.bookContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={item.image ? { uri: item.image } : book}
                        alt="Book"
                        style={styles.image}
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item.titulo || "Sem título"}</Text>
                    <Text style={styles.gender}>{item.genero || "Gênero não especificado"}</Text>
                    <AirbnbRating
                        count={5}
                        defaultRating={item.rating || 4}
                        size={20}
                        showRating={false}
                        unSelectedColor="#000"
                        starContainerStyle={styles.starRating}
                        readonly={true}
                        isDisabled={true}
                    />
                    <Text style={styles.author}>{item.autor || "Autor desconhecido"}</Text>
                    <Text style={styles.status}>{item.status || "Disponível"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
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
                        value={searchTerm}
                        onChangeText={handleSearch}
                    />
                </Input>
            </View>

            {loading && <Text>Carregando...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}

            <FlatList
                data={livros}
                renderItem={renderBookItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        {searchTerm ? 'Nenhum livro encontrado' : 'Digite para buscar'}
                    </Text>
                }
            />
        </ScrollView>
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
        marginBottom: 20, // Adicionado espaçamento entre os livros,
        marginHorizontal: 20
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