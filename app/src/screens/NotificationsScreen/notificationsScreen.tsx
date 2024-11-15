
import React from "react"
import { Center, View, Text, VStack, Image } from "@gluestack-ui/themed"
import { SafeAreaView, StyleSheet } from "react-native"
import { ArrowLeft } from "lucide-react-native"

import notifications from "../../../assets/notifications.png"

const NotificationsScreen = () => (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
            <ArrowLeft color={"#000"} style={styles.arrowLeftIcon}/>
            <Text style={styles.headerText}>Notificações</Text>
        </View>
            <View style={styles.contentContainer}>
                <Image source={notifications} />
                <Text style={styles.mainText}>Sem Notificações</Text>
            </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop:10
    },
    headerContainer: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        right:20,
    },
    headerText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
        left: 10,
    },
    arrowLeftIcon: {
        right: 90
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
        top:20
    }
    
});

export default NotificationsScreen