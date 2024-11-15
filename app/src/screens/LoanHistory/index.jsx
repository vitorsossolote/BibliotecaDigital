import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    Image
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, } from "react-native"
import { MoveLeft } from "lucide-react-native";
//Componentes Utilizados
import MainHeader from "../../components/MainHeader";
//Imagens Utilizadas
import book from "../../../assets/book6.png"
import book2 from "../../../assets/book7.png"
import book3 from "../../../assets/book8.png"
//Inicio Do Codigo

export default function LoanHistory({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <MainHeader title="Histórico de Empréstimo" icon1={MoveLeft} onPress={() => navigation.navigate("Profile")} marginRight={10} />
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.loanContainer}>
                        <Text style={styles.monthText}>Agosto 2024</Text>
                        <View style={styles.loanSection}>
                            {/* Começo detalhes de empréstimo */}
                            <View style={styles.loanDetailsContainer}>
                                <Image source={book} style={styles.loanImage} />
                                <View style={styles.loanDetailsTextContainer}>
                                    <Text style={styles.loanDetailsText}>Dia 15 | The Da Vinci ...</Text>
                                    <View style={styles.loanStatus}>
                                        <Text style={styles.loanStatusText}>Devolvido </Text>
                                        <Text style={styles.loanItems}>• 1 item</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{height:1.5,width:"100%", backgroundColor:"#e6e6e6"}}/>
                            {/* Fim Detalhes de empréstimo */}
                            <View style={styles.loanDetailsContainer}>
                                <Image source={book2} style={styles.loanImage} />
                                <View style={styles.loanDetailsTextContainer}>
                                    <Text style={styles.loanDetailsText}>Dia 7 | Harry Potter</Text>
                                    <View style={styles.loanStatus}>
                                        <Text style={styles.loanStatusText}>Devolvido </Text>
                                        <Text style={styles.loanItems}>• 3 items</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{height:1.5,width:"100%", backgroundColor:"#e6e6e6"}}/>
                            <View style={styles.loanDetailsContainer}>
                                <Image source={book3} style={styles.loanImage} />
                                <View style={styles.loanDetailsTextContainer}>
                                    <Text style={styles.loanDetailsText}>Dia 1 | The Good Doctor</Text>
                                    <View style={styles.loanStatus}>
                                        <Text style={[styles.loanStatusText, {color:"#ee2d32"}]}>Atrasado </Text>
                                        <Text style={styles.loanItems}>• 2 items</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: '#fff',
        alignItems: "center"
    },
    headerContainer: {
        marginTop: 15,
    },
    contentContainer: {
        padding: 35
    },
    loanContainer: {

    },
    monthText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 20,
    },
    loanSection: {
        marginTop: 20,
        borderWidth: 1.5,
        borderColor: "#e6e6e6",
        borderRadius: 10,
        padding: 15,
        gap:20
    },
    loanDetailsContainer: {
        flexDirection: 'row',
    },
    loanImage: {
        width: 60,
        height: 60,
        borderRadius: 10
    },
    loanDetailsTextContainer: {
        marginLeft: 20,
        gap: 8,
        top: 5,
    },
    loanStatus: {
        flexDirection: "row"
    },
    loanDetailsText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold"
    },
    loanStatusText: {
        color: "#34A853",
        fontWeight: "700"
    },
    loanItems: {
        fontWeight: "bold"
    }
});