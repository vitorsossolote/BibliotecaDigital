
import React from "react"
import { Center, View, Text, VStack, Image } from "@gluestack-ui/themed"
import { SafeAreaView, StyleSheet } from "react-native"
import { Bell } from "lucide-react-native"

import borrowBook from "../../../assets/borrowbook.png"

const BorrowedBooks = () => (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Livros Emprestados</Text>
            <Bell color={"#000"} style={styles.bellIcon} />
        </View>
            <View style={styles.contentContainer}>
                <Image source={borrowBook} style={{right:10}}/>
                <Text style={styles.mainText}>Você não tem livros emprestados no momento</Text>
            </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:"#fff"
    },
    headerContainer: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    headerText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        left: 10,
    },
    bellIcon: {
        alignSelf: "flex-end",
        left: 80,
    },
    contentContainer:{
        alignSelf:"center", 
        height:550, 
        justifyContent:"center",
        width:230, 
        alignItems:"center"
    },
    mainText:{
        color:"#000",
        fontWeight:'bold',
        textAlign:"center",
    }
    
});

export default BorrowedBooks