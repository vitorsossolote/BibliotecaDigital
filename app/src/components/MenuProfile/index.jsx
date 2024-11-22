import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    ScrollView,
    Image
} from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { StyleSheet, Text, View, Pressable,} from "react-native"
import { ChevronRight } from "lucide-react-native";
//Componentes Utilizados

//Imagens Utilizadas

//Inicio Do Codigo



export const MenuProfile = ({ image, alt, onPress, title}) => {
    return (
        <View style={styles.menuContainer}>
                <Pressable onPress={onPress}>
                    <View style={styles.menuContent}>
                        <View style={styles.menuOptionContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={image} alt={alt} style={{ width: 20, height: 20, }} resizeMode="contain" />
                            </View>
                            <View style={styles.menuTitleContainer}>
                                <Text style={styles.menuText}>{title}</Text>
                            </View>
                        </View>
                        <View>
                            <ChevronRight color={"#a1a1a1"} />
                        </View>
                    </View>
                </Pressable>
            </View>
    );
};
const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: "column",
        marginTop: 5,
    },
    menuContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 70,
        paddingTop: 10,
        alignItems: "center",
        paddingHorizontal: 20,
    },
    menuOptionContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30
    },
    iconContainer: {
        backgroundColor: "#EBF2EF",
        borderRadius: 30,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {

    },
    menuTitleContainer: {
        right: 10,
    },
    menuText: {
        color: "#000",
        fontWeight: "700",
        fontSize: 18
    },
});