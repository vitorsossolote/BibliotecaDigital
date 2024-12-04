import React, { useEffect } from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    Input,
    InputField,
    InputIcon,
    InputSlot,
    Image
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native"
import { AirbnbRating } from "react-native-ratings";
import { ArrowLeft, Search } from "lucide-react-native";
//Componentes Utilizados
import MainHeader from "../../components/MainHeader";
import { useAuth } from "../../contexts/AuthContext";
//Imagens Utilizadas
import book from "../../../assets/book2.png"

export default function MostViewedBooks({ navigation }) {
    const { 
        LivrosMaisEmprestados, 
        fetchLivrosMaisEmprestados, 
        loading, 
        error 
    } = useAuth();

    console.log('Rendering MostViewedBooks');
    console.log('LivrosMaisEmprestados:', LivrosMaisEmprestados);
    console.log('Loading:', loading);
    console.log('Error:', error);

    const renderBookItem = (livro) => (
        <View style={styles.bookContainer} key={livro.livro_id}>
            <View style={styles.imageContainer}>
                <Pressable onPress={() => console.log("Detalhes do livro", livro.livro_id)}>
                    <Image 
                        source={{uri: livro.image }} 
                        alt={livro.titulo} 
                        style={styles.bookImage} 
                    />
                </Pressable>
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.bookTitle}>{livro.titulo}</Text>
                <AirbnbRating
                    count={5}
                    defaultRating={2}  // Você pode ajustar isso conforme necessário
                    size={20}
                    showRating={false}
                    unSelectedColor="#000"
                    starContainerStyle={styles.starRating}
                    isDisabled={true}
                />
                <Text style={styles.loanTimesText}>
                    Vezes emprestado: {livro.emprestimos_count || 0}
                </Text>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>Status: </Text>
                    <Text style={styles.availabilityText}>
                        {livro.emprestimos_count > 0 ? 'Emprestado' : 'Disponível'}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <GluestackUIProvider config={config}>
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <MainHeader 
                            title="Livros mais vistos" 
                            icon1={ArrowLeft} 
                            onPress={() => navigation.goBack()} 
                        />
                        <View>
                            <Input style={styles.searchbarContainer}>
                                <InputSlot style={styles.inputSlot}>
                                    <InputIcon as={Search} size={'xl'} />
                                </InputSlot>
                                <InputField
                                    placeholder="Pesquisar..."
                                    style={styles.searchText}
                                />
                            </Input>
                        </View>
                        <View style={styles.booksSection}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#0000ff" />
                            ) : error ? (
                                <Text style={styles.errorText}>
                                    {error || 'Erro ao carregar livros'}
                                </Text>
                            ) : (
                                LivrosMaisEmprestados.length > 0 ? (
                                    LivrosMaisEmprestados.map(renderBookItem)
                                ) : (
                                    <Text style={styles.noDataText}>
                                        Nenhum livro encontrado
                                    </Text>
                                )
                            )}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
        alignItems: "center"
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
        marginBottom: 20,
    },
    inputSlot: {
        marginRight: 20
    },
    searchText: {
        fontSize: 18,
        top: 1
    },
    booksSection: {
        width: "85%",
        marginTop: 20,
        borderWidth:1,
        borderColor:"#e6e6e6",
        borderRadius:30,
        height:170
    },
    bookContainer: {
        flexDirection: "row",
        height: 180,
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    imageContainer: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginRight:7,
    },
    bookImage: {
        width: 120,
        height: "95%",
        borderRadius: 20,
    },
    infoSection: {
        flexDirection: "column",
        marginTop: 7,
        alignItems: "flex-start",
        marginLeft:7,
    },
    bookTitle: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",
    },
    starRating: {
        marginTop: 10,
        marginBottom: 10,
    },
    loanTimesText: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold"
    },
    statusContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    statusText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "semibold"
    },
    availabilityText: {
        color: "#ee2d32",
        fontSize: 16,
        fontWeight: "semibold"
    }
});