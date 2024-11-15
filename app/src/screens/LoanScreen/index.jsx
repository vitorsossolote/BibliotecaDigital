
import React, { useMemo, useRef, useState } from "react"
import { Center, View, Text, StatusBar, GluestackUIProvider, Button, ButtonText, Image, Pressable, ImageBackground } from "@gluestack-ui/themed"
import { StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from "react-native"
import { Bell, ChevronRight, MoveLeft, MoveRight } from "lucide-react-native"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { OptionGroup } from "./optionGroup"
import { AirbnbRating } from "react-native-ratings";


import Calendar from "../../../assets/Calendar.png"
import book1 from "../../../assets/book.png"
import library from "../../../assets/library.jpg"




export default function LoanScreen({ navigation }) {
    const { width: screenWidth } = Dimensions.get('window');
    const books = [
        {
            id: 1,
            title: 'The Trials Of Apollo',
            Book: "../../../assets/book1.png",
            Data: "02.11.2024",
            avaliacao: 4
        },
        {
            id: 2,
            title: 'Cronicas de SpiderWick',
            Book: "../../../assets/book2.png",
            Data: "02.11.2024",
            avaliacao: 3
        },
    ]
    //Carrosel Livros Emprestados
    const BorrowedBooksCarrosel = ({ data }) => {
        const renderItem = ({ item }) => (
            <View style={Detailstyles.carroselContainer}>
                <Image source={book1} alt="Livro" resizeMode="contain" style={Detailstyles.Image} />
                <View style={Detailstyles.carroselTextContainer}>
                    <Text style={Detailstyles.carroselTitle}>{item.title}</Text>
                    <Text style={Detailstyles.carroselTitle}>Data de entrega</Text>
                    <Text style={Detailstyles.carroselData}>{item.Data}</Text>
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
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    layout={'default'}
                    onSnapToItem={index => setIndex(index)}
                />
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: -1,
                        backgroundColor: '#ee2d32',
                        bottom: 20
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

    //Carrosel Livros Devolvidos
    const Carrosel = ({ data }) => {
        const renderItem = ({ item }) => (
            <View style={Detailstyles.carroselContainer}>
                <Image source={book1} alt="Livro" resizeMode="contain" style={Detailstyles.Image} />
                <View style={Detailstyles.carroselTextContainer}>
                    <Text style={Detailstyles.carroselTitle}>Nome do Livro</Text>
                    <Text style={Detailstyles.carroselTitle}>Data de entrega</Text>
                    <Text style={Detailstyles.carroselData}>02.Nov.2024</Text>
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
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    layout={'default'}
                    onSnapToItem={index => setIndex(index)}
                />
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: -1,
                        backgroundColor: '#ee2d32',
                        bottom: 20
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






    //Open Data BottomSheet
    const bottomSheetrefData = useRef(null);
    const snapPoints = useMemo(() => ["30%", "50%", "80%", "95%"], [])
    const snapDataPoints = useMemo(() => ["30%", "50%", "61%"], [])
    const handleCloseActionData = () => bottomSheetrefData.current?.close()
    const handleOpenPressData = () => bottomSheetrefData.current?.expand();
    const printOptionLabel = (item) => {
        console.log(item)
    }


    //Open Details BottomSheet
    const bottomSheetrefDetails = useRef(null);
    const handleCloseActionDetails = () => bottomSheetrefDetails.current?.close()
    const handleOpenPressDetails = () => bottomSheetrefDetails.current?.expand();

    //Open Book BottomSheet
    const bottomSheetrefBook = useRef(null);
    const handleCloseActionBook = () => bottomSheetrefBook.current?.close()
    const handleOpenPressBook = () => bottomSheetrefBook.current?.expand();

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View style={styles.headerContainer}>
                <Pressable onPress={() => navigation.navigate("Home")}>
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
                                <Text style={styles.summaryText}>1</Text>
                                <Text style={styles.summaryText}>2</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, width: "90%", left: 20, top: 10 }}
                    />
                    <View style={styles.dateContainer}>
                        <Text style={styles.summaryTitle}>Data de entrega</Text>
                        <Text style={styles.dateText}> 02 Ago</Text>
                    </View>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, width: "90%", left: 20, top: 10 }} />
                    <View>
                        <Button onPress={handleOpenPressDetails} style={styles.buttonContainer} variant="link">
                            <ButtonText style={styles.buttonText}>Ver detalhes</ButtonText>
                        </Button>
                    </View>
                </View>
                <View style={styles.LoanOptionsContainer}>
                    <View style={styles.dateHourContainer}>
                        <Text style={styles.dateHourTitle}>Data e Hora</Text>
                        <View style={styles.dateHourContent}>
                            <View style={styles.ImageContainer}>
                                <Image source={Calendar} style={styles.ImageStyle} resizeMode="contain" />
                            </View>
                            <View>
                                <View style={styles.dateHourTextContainer}>
                                    <Text style={styles.dateHour}>Data e Hora</Text>
                                    <Text style={styles.dateHourSubtitle}>Escolher Data e Hora</Text>
                                </View>
                            </View>
                            <Pressable onPress={handleOpenPressData}>
                                <View style={styles.iconContainer}>
                                    <ChevronRight color={"#292929"} size={40} />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.addBookContainer}>
                        <Text style={styles.addBookTitle}>Livros</Text>
                        <View style={styles.addBookContent}>
                            <View style={styles.ImageContainer}>
                                <Image source={Calendar} style={styles.ImageStyle} resizeMode="contain" />
                            </View>
                            <View>
                                <View style={styles.addBookTextContainer}>
                                    <Text style={styles.addBook}>Livros</Text>
                                    <Text style={styles.addBookSubtitle}>Adicione ou Remova Livros</Text>
                                </View>
                            </View>
                            <View style={styles.iconContainer}>
                                <ChevronRight color={"#292929"} size={40} />
                            </View>
                        </View>
                    </View>
                </View>
                <Button style={styles.finishButton}>
                    <ButtonText style={styles.finishButtonText}>Confirmar</ButtonText>
                </Button>
            </View>

            {/* Inicio dos BottomSheets */}
            <BottomSheet
                ref={bottomSheetrefData}
                snapPoints={snapDataPoints}
                index={-1}
                enablePanDownToClose={true}
                style={Datastyles.container}>
                <SafeAreaView>
                    <View style={Datastyles.headerContainer}>
                        <Text style={Datastyles.headerTitle}>Agendar Empréstimo</Text>
                    </View>
                    <View style={Datastyles.dataOptionsContainer}>
                        <OptionGroup
                            options={['Daqui 7 Dias', 'Daqui 14 Dias',]}
                            doSomethingAfterClick={printOptionLabel}
                        />
                    </View>
                    <View style={Datastyles.hourContainer}>
                        <Text style={Datastyles.headerTitle}>Horário de Entrega</Text>
                        <View style={Datastyles.hourOptionsContainer}>
                            <OptionGroup
                                options={['Entre', 'Entre',]}
                                doSomethingAfterClick={printOptionLabel}
                            />
                        </View>
                    </View>
                    <View style={Datastyles.buttonContainer}>
                        <Button style={Datastyles.buttonStyle} onPress={() => console.log("Clicou em confirmar")}>
                            <ButtonText style={Datastyles.buttonTextStyle}>Confirmar</ButtonText>
                        </Button>
                    </View>
                </SafeAreaView>
            </BottomSheet>
            <BottomSheet
                ref={bottomSheetrefDetails}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose={true}
                style={Detailstyles.container}>
                <SafeAreaView style={Detailstyles.container}>
                    <View style={Detailstyles.headerContainer}>
                        <Text style={Detailstyles.headerText}>DETALHES</Text>
                    </View>
                    <View style={Detailstyles.contentContainer}>
                        <View style={Detailstyles.borrowedBooks}>
                            <Text style={Detailstyles.borrowedBooksText}>Livros Emprestados</Text>
                            <BorrowedBooksCarrosel data={books} />
                        </View>
                    </View>
                </SafeAreaView>
            </BottomSheet>
        </SafeAreaView>

    );
};
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
        left:50
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
    },
    carroselContainer: {
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 20,
        marginTop: 15,
    },
    Image: {
        width: 220,
        height: 180,
        borderRadius: 30,
        marginTop: 20,
        right: 85,
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
        right: 28,
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
