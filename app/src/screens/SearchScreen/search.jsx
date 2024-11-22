// import React from "react";
// import {
//     GluestackUIProvider,
//     SafeAreaView,
//     ScrollView,
//     SearchIcon,
//     Input,
//     InputSlot,
//     InputIcon,
//     InputField
// } from "@gluestack-ui/themed";
// import { config } from "@gluestack-ui/config";
// import { StyleSheet, Text, View, } from "react-native"
// import { MoveLeft, Search } from "lucide-react-native";
// //Componentes Utilizados
// import MainHeader from "../../components/MainHeader";
// //Imagens Utilizadas

// //Inicio Do Codigo

// export default function SearchScreen({ navigation }) {
//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={styles.headerContainer}>
//                     <MainHeader title="Pesquisar" icon1={MoveLeft} onPress={() => navigation.navigate("Home")} />
//                 </View>
//                 <View>
//                     <Input style={styles.searchbarContainer}>
//                         <InputSlot style={styles.inputSlot}>
//                             <InputIcon as={Search} size={'xl'}/>
//                         </InputSlot>
//                         <InputField placeholder="Pesquisar..." style={styles.searchText}/>
//                     </Input>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         height: "100%",
//         width: "100%",
//         backgroundColor: '#fff',
//         alignItems: "center"
//     },
//     searchbarContainer: {
//         borderRadius: 10,
//         width: 320,
//         height: 50,
//         alignSelf: "center",
//         backgroundColor: "#f5f5f5",
//         flexDirection:"row",
//         paddingLeft:10,
//         alignItems:"center",
//         marginTop:20,
//     },
//     inputSlot:{
//         marginRight:20
//     },
//     searchText:{
//         fontSize:18,
//         top:1
//     }
// });

import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const SearchPage = () => {
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
            <View style={styles.bookItem}>
                <Text style={styles.bookTitle}>{item.titulo}</Text>
                <Text style={styles.bookAuthor}>{item.autor}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar livros..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
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
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        padding: 10,
    },
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
};

export default SearchPage;