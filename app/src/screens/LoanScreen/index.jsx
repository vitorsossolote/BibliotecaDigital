import React, { useMemo, useRef, useState, useCallback } from "react"
import { Center, View, Text, StatusBar, GluestackUIProvider, Button, ButtonText, Image, Pressable } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { StyleSheet, SafeAreaView, Dimensions, Alert } from "react-native"
import { Bell, ChevronRight, MoveLeft } from "lucide-react-native"
import BottomSheet, { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { AirbnbRating } from "react-native-ratings";

import Calendar from "../../../assets/Calendar.png"
import book1 from "../../../assets/book.png"

// Importar o hook de contexto
import { useAuth } from '../../contexts/AuthContext'; // Ajuste o caminho conforme necessário
import DateOptionGroup from "./dateOptionGroup"

export default function LoanScreen({ navigation }) {
    const {
        realizarEmprestimo,
        createLoan, 
        selectedLoanBooks, 
        clearSelectedLoanBooks,
        checkActiveLoan,
        activeLoan 
    } = useAuth();
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [deliveryDate, setDeliveryDate] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDurationSelect = (days) => {
        const today = new Date();
        const newDeliveryDate = new Date(today);
        newDeliveryDate.setDate(today.getDate() + days);

        const formattedDate = newDeliveryDate.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short'
        });

        setDeliveryDate(formattedDate);
        setSelectedDuration(days);
        handleCloseDateTimeSheet();
    };
    const handleCreateLoan = async () => {
        try {
            const livrosIds = selectedLoanBooks.map(book => book.id);
            await createLoan(livrosIds);
            clearSelectedLoanBooks();
        } catch (error) {
        }
    };

    const handleConfirmLoan = async () => {
        console.log('Iniciando confirmação de empréstimo');
        console.log('Livros selecionados:', selectedLoanBooks);
        console.log('Duração selecionada:', selectedDuration);

        if (emprestimosAtivos.data.length > 0) {
            Alert.alert(
                'Empréstimo Pendente',
                'Você já tem um livro emprestado. Por favor, devolva o livro antes de fazer um novo empréstimo.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('LoanHistory');
                        }
                    }
                ]
            );
            return;
        }

        if (!selectedDuration) {
            console.log('Erro: Nenhum prazo selecionado');
            Alert.alert('Erro', 'Por favor, selecione um prazo de empréstimo');
            return;
        }

        if (selectedLoanBooks.length === 0) {
            console.log('Erro: Nenhum livro selecionado');
            Alert.alert('Erro', 'Nenhum livro selecionado para empréstimo');
            return;
        }
        if (!selectedDuration) {
            console.log('Erro: Nenhum prazo selecionado');
            Alert.alert('Erro', 'Por favor, selecione um prazo de empréstimo');
            return;
        }

        if (selectedLoanBooks.length === 0) {
            console.log('Erro: Nenhum livro selecionado');
            Alert.alert('Erro', 'Nenhum livro selecionado para empréstimo');
            return;
        }

        if (![7, 14].includes(selectedDuration)) {
            console.log('Erro: Prazo inválido');
            Alert.alert('Erro', 'O prazo deve ser de 7 ou 14 dias');
            return;
        }

        try {
            setLoading(true);
            console.log('Iniciando realizarEmprestimo');

            const bookIds = selectedLoanBooks.map(book => book.id);
            console.log('IDs dos livros:', bookIds);

            await realizarEmprestimo(bookIds, selectedDuration);

            console.log('Empréstimo realizado com sucesso');
            Alert.alert('Sucesso', 'Empréstimo realizado com sucesso');

        } catch (error) {
            console.error('Erro completo durante o empréstimo:', error);
            console.error('Detalhes do erro:',
                error.response ? error.response.data : 'Sem resposta do servidor',
                error.message
            );

            Alert.alert('Erro', error.message || 'Não foi possível realizar o empréstimo');
        } finally {
            setLoading(false);
        }
    };



    const { width: screenWidth } = Dimensions.get('window');

    const BorrowedBooksCarrosel = () => {
        const renderItem = ({ item }) => (
            <View style={Detailstyles.carroselContainer}>
                <Image
                    source={item?.image ? { uri: item.image } : book1}
                    alt="Livro"
                    resizeMode="contain"
                    style={Detailstyles.Image}
                />
                <View style={Detailstyles.carroselTextContainer}>
                    <Text style={Detailstyles.carroselTitle}>{item?.titulo || 'Nome do Livro'}</Text>
                    <Text style={Detailstyles.carroselTitle}>Data de entrega</Text>
                    <Text style={Detailstyles.carroselData}>{deliveryDate}</Text>
                    <Text style={Detailstyles.carroselTitle}>Avaliação:</Text>
                    <AirbnbRating
                        count={5}
                        defaultRating={item.avaliacao}
                        size={20}
                        showRating={false}
                        unSelectedColor="#000"
                        starContainerStyle={Detailstyles.starRating}
                        readonly={true}
                    />
                </View>
            </View>
        );

        const [index, setIndex] = useState(0);
        const isCarousel = useRef(null);
        return (
            <>
                <Carousel
                    ref={isCarousel}
                    data={selectedLoanBooks}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    layout={'default'}
                    onSnapToItem={index => setIndex(index)}
                />
                <Pagination
                    dotsLength={selectedLoanBooks.length}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: -1,
                        backgroundColor: '#ee2d32',
                        bottom: 240
                    }}
                    tappableDots={true}
                    inactiveDotStyle={{
                        backgroundColor: 'black',
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </>
        );
    };



    const detailsBottomSheetRef = useRef(null);
    const dateTimeBottomSheetRef = useRef(null);
    const booksBottomSheetRef = useRef(null);

    const snapPoints = useMemo(() => ['67%', '75%'], []);
    const snapPointsDate = useMemo(() => ['37%', '40%'], []);

    const handleOpenDetailsSheet = useCallback(() => {
        detailsBottomSheetRef.current?.present();
    }, []);

    const handleOpenDateTimeSheet = useCallback(() => {
        dateTimeBottomSheetRef.current?.present();
    }, []);

    const handleOpenBooksSheet = useCallback(() => {
        booksBottomSheetRef.current?.present();
    }, []);

    // Close bottom sheets
    const handleCloseDetailsSheet = useCallback(() => {
        detailsBottomSheetRef.current?.close();
    }, []);

    const handleCloseDateTimeSheet = useCallback(() => {
        dateTimeBottomSheetRef.current?.close();
    }, []);

    const handleCloseBooksSheet = useCallback(() => {
        booksBottomSheetRef.current?.close();
    }, []);

    return (
        <GluestackUIProvider config={config}>
            <BottomSheetModalProvider>
                <SafeAreaView style={styles.mainContainer}>
                    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                    <View style={styles.headerContainer}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <MoveLeft color={"#000"} size={30} />
                        </Pressable>
                        <Text style={styles.headerTitle}>Confirmar Empréstimo</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.detailsContainer}>
                            <View style={styles.summaryContainer}>
                                <Text style={styles.summaryTitle}>Resumo</Text>
                                <View style={styles.booksStatusContainer}>
                                    <View style={{ flexDirection: "column", gap: 10 }}>
                                        <Text style={styles.summaryText}>Emprestados</Text>
                                        <Text style={styles.summaryText}>Devolvidos</Text>
                                    </View>
                                    <View style={{ flexDirection: "column", gap: 10 }}>
                                        <Text style={styles.summaryText}>{selectedLoanBooks.length}</Text>
                                        <Text style={styles.summaryText}>2</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, width: "90%", left: 20, top: 10 }}
                            />
                            <View style={styles.dateContainer}>
                                <Text style={styles.summaryTitle}>Data de entrega</Text>
                                <Text style={styles.dateText}>{deliveryDate}</Text>
                            </View>
                            <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, width: "90%", left: 20, top: 10 }} />
                            <View>
                                <Pressable style={styles.buttonContainer} variant="link" onPress={handleOpenDetailsSheet}>
                                    <ButtonText style={styles.buttonText}>Ver detalhes</ButtonText>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.LoanOptionsContainer}>
                            <View style={styles.dateHourContainer}>
                                <Text style={styles.dateHourTitle}>Data</Text>
                                <View style={styles.dateHourContent}>
                                    <View style={styles.ImageContainer}>
                                        <Image source={Calendar} style={styles.ImageStyle} resizeMode="contain" />
                                    </View>
                                    <View>
                                        <View style={styles.dateHourTextContainer}>
                                            <Text style={styles.dateHour}>Data</Text>
                                            <Text style={styles.dateHourSubtitle}>Escolher Data</Text>
                                        </View>
                                    </View>
                                    <Pressable onPress={handleOpenDateTimeSheet}>
                                        <View style={styles.iconContainer}>
                                            <ChevronRight color={"#292929"} size={40} />
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <Button
                            style={styles.finishButton}
                            onPress={handleCreateLoan}
                            isDisabled={loading}
                        >
                            <ButtonText style={styles.finishButtonText}>
                                {loading ? 'Processando...' : 'Confirmar'}
                            </ButtonText>
                        </Button>
                    </View>

                    {/* Bottom Sheets */}
                    <BottomSheetModal
                        ref={detailsBottomSheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        backgroundStyle={styles.bottomSheetBackground}
                        handleIndicatorStyle={styles.bottomSheetIndicator}
                    >
                        <BottomSheetView style={styles.bottomSheetContent}>
                            <Text style={styles.bottomSheetTitle}>Detalhes do Livro</Text>
                            <View style={Detailstyles.contentContainer}>
                                <View style={Detailstyles.borrowedBooks}>
                                    <Text style={Detailstyles.borrowedBooksText}>Livros Emprestados ({selectedLoanBooks.length})</Text>
                                </View>
                                <View style={{ flex: 1, left: 10 }}>
                                    {selectedLoanBooks.length > 0 ? (
                                        <BorrowedBooksCarrosel />
                                    ) : (
                                        <Text>Nenhum livro selecionado</Text>
                                    )}
                                </View>
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>

                    <BottomSheetModal
                        ref={dateTimeBottomSheetRef}
                        index={0}
                        snapPoints={snapPointsDate}
                        backgroundStyle={styles.bottomSheetBackground}
                        handleIndicatorStyle={styles.bottomSheetIndicator}
                    >
                        <BottomSheetView style={styles.bottomSheetContent}>
                            <Text style={styles.bottomSheetTitle}>Escolher Data</Text>
                            <DateOptionGroup onSelectDuration={handleDurationSelect} />
                        </BottomSheetView>
                    </BottomSheetModal>
                </SafeAreaView>
            </BottomSheetModalProvider>
        </GluestackUIProvider>
    );
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerContainer: {
        width: "100%",
        flexDirection: "row",
        marginTop: 20,
        paddingHorizontal: 20
    },
    headerTitle: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        left: 50
    },
    contentContainer: {
        flexDirection: "column",
    },
    detailsContainer: {
        borderWidth: 2,
        borderColor: "#E8E8E8",
        width: "90%",
        margin: 20,
        height: 240,
        borderRadius: 15,
    },
    summaryContainer: {
        width: "100%",
        height: 120,
        padding: 20,
        gap: 3,
    },
    summaryTitle: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold"
    },
    booksStatusContainer: {
        gap: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    summaryText: {
        color: "#000"
    },
    dateContainer: {
        width: "100%",
        height: 50,
        paddingLeft: 20,
        top: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dateText: {
        color: "#000",
        top: 5,
        right: 15,
        fontWeight: "600",
        fontSize: 16
    },
    buttonContainer: {
        paddingLeft: 20,
        top: 25.
    },
    buttonText: {
        color: "#ee2d32",
        fontWeight: "bold",
        fontSize: 16
    },
    LoanOptionsContainer: {
        flexDirection: "column",
        gap: 17,
        top: 20
    },
    dateHourContainer: {
        borderWidth: 2,
        borderColor: "#E8E8E8",
        width: "90%",
        left: 20,
        height: 120,
        borderRadius: 15,
        padding: 10,
    },
    dateHourTitle: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",
        left: 10,
    },
    ImageContainer: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
    },
    dateHourContent: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-between"
    },
    ImageStyle: {
        width: 30,
        height: 30
    },
    dateHourTextContainer: {
        top: 3,
        right: 25,
        width: 180
    },
    dateHour: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold"
    },
    dateHourSubtitle: {
        fontWeight: 'bold'
    },
    iconContainer: {
        alignSelf: "flex-end",
        bottom: 5,
    },
    BookContainer: {
        borderWidth: 2,
        borderColor: "#E8E8E8",
        width: "90%",
        left: 20,
        height: 120,
        borderRadius: 15,
        padding: 10,

    },
    BookTitle: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",
        left: 10,
    },
    addBookContainer: {
        borderWidth: 2,
        borderColor: "#E8E8E8",
        width: "90%",
        left: 20,
        height: 120,
        borderRadius: 15,
        padding: 10,
    },
    addBookTitle: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",
        left: 10,
    },
    addBookContent: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-between"
    },
    addBookTextContainer: {
        top: 3,
        right: 25,
        width: 200
    },
    addBook: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold"
    },
    addBookSubtitle: {
        fontWeight: 'bold'
    },
    finishButton: {
        backgroundColor: "#ee2d32",
        width: "80%",
        left: 40,
        borderRadius: 25,
        height: 50,
        top: 35,
        justifyContent: "center",
        alignItems: "center"
    },
    finishButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    },
    optionContainer: {
        flexDirection: "row",
        marginTop: 20,
        gap: 20,
        right: 5
    },
    contentOption: {
        width: 92,
        height: 80,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        borderColor: "#E8E8E8",
        borderWidth: 2,
    },
    activeContentOption: {
        width: 92,
        height: 80,
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        borderColor: "#ee2d32",
        borderWidth: 2,
    },
    textContainer: {
        alignSelf: "center",
    },
    optionTitle: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    optionSubtitle: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomSheetBackground: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomSheetIndicator: {
        backgroundColor: '#000',
    },
    bottomSheetContent: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    bottomSheetTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
});
const Detailstyles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
    },
    headerContainer: {
        width: "100%",
        alignItems: "center",
    },
    headerText: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold",
    },
    contentContainer: {
        marginTop: 30,
    },
    borrowedBooks: {
    },
    borrowedBooksText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        left: 15
    },
    carroselContainer: {
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 20,
        marginTop: 15,
        width: "100%",
    },
    Image: {
        width: 230,
        height: 180,
        borderRadius: 30,
        marginTop: 20,
        right: 70,
        bottom: 5,
    },
    carroselTextContainer: {
        top: 20,
        right: 90,
        gap: 10,
    },
    carroselTitle: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
    },
    carroselData: {
        color: "#ee2d32",
        fontSize: 20,
        fontWeight: "bold",
    },
    starRating: {
        right: 10,
    },

})
const Datastyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },
    headerContainer: {
        width: "100%",
    },
    headerTitle: {
        color: "#000",
        fontSize: 22,
        fontWeight: "bold",
    },
    dataOptionsContainer: {
        marginTop: 20,
    },
    hourContainer: {
        marginTop: 20,
    },
    hourOptionsContainer: {
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 20
    },
    buttonStyle: {
        backgroundColor: "#ee2d32",
        width: 330,
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTextStyle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold"
    },
})
const Bookstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    }

})