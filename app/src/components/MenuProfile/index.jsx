import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";

const MenuProfile = ({ 
    icon: Icon = ChevronRight, 
    iconColor = "#ee2d32", 
    onPress, 
    title 
}) => {
    return (
        <View style={styles.menuContainer}>
            <Pressable onPress={onPress}>
                <View style={styles.menuContent}>
                    <View style={styles.menuOptionContainer}>
                        <View style={styles.iconContainer}>
                            <Icon size={23} color={iconColor} />
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

MenuProfile.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.elementType, 
        PropTypes.func
    ]),
    iconColor: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

MenuProfile.defaultProps = {
    icon: ChevronRight,
    iconColor: "#ee2d32"
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
        backgroundColor: "#fafafa",
        borderRadius: 30,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        elevation:1
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

export default MenuProfile;