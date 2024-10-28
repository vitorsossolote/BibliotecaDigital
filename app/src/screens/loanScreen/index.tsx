
import React from "react"
import { Center, View, Text, StatusBar } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { GluestackUIProvider, Button, ButtonText, Image } from "@gluestack-ui/themed"
import { StyleSheet, SafeAreaView } from "react-native"
import MainHeader from "../../components/MainHeader"
import { Bell, ChevronRight, MoveLeft, MoveRight } from "lucide-react-native"
import Calendar from "../../../assets/Calendar.png"

const LoanScreen = () => (
    <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.headerContainer}>
            <MoveLeft color={"#000"} size={30} />
            <Text style={styles.headerTitle}>Confirmar Empréstimo</Text>
            <Bell color={"#000"} />
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
                    <Button onPress={() => console.log("pressionado")} style={styles.buttonContainer}>
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
                        <View style={styles.iconContainer}>
                            <ChevronRight color={"#292929"} size={40}/>
                        </View>
                    </View>
                </View>
                <View style={styles.dateHourContainer}>
                    <Text style={styles.dateHourTitle}>Livros</Text>
                    <View style={styles.dateHourContent}>
                        <View style={styles.ImageContainer}>
                            <Image source={Calendar} style={styles.ImageStyle} resizeMode="contain" />
                        </View>
                        <View>
                            <View style={styles.dateHourTextContainer}>
                                <Text style={styles.dateHour}>Livros</Text>
                                <Text style={styles.dateHourSubtitle}>Adicione ou Remova Livros</Text>
                            </View>
                        </View>
                        <View style={styles.iconContainer}>
                            <ChevronRight color={"#292929"} size={40}/>
                        </View>
                    </View>
                </View>
            </View>
            <Button style={styles.finishButton}>
                <ButtonText style={styles.finishButtonText}>Confirmar</ButtonText>
            </Button>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 20
    },
    headerTitle: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
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
    dateHourContent:{
        flexDirection: "row",
        marginTop: 15,
        justifyContent:"space-between" 
    },
    ImageStyle:{ 
        width: 30, 
        height: 30 
    },
    dateHourTextContainer:{
        top: 3, 
        right:25,
        width:180
    },
    dateHour:{ 
        color: "#000", 
        fontSize: 16, 
        fontWeight: "bold" 
    },
    dateHourSubtitle:{
        fontWeight: 'bold'
    },
    iconContainer:{
        alignSelf:"flex-end", 
        bottom:5,
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
    finishButton: {
        backgroundColor: "#ee2d32",
        width: "80%",
        left: 40,
        borderRadius: 25,
        height: 40,
        top: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    finishButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    },
});

export default LoanScreen