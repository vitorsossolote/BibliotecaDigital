import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Image,
} from "@gluestack-ui/themed"



const ProfileScreen = () => {
    return(
        <View style={styles.card}>
            <Text>Screen</Text>
        </View>
);
};

const styles = StyleSheet.create({
    card: {
        flex:1,
        marginHorizontal: 20,
        height: 160,
        flexDirection:'row',
        backgroundColor:"#f6f6f6",
        borderRadius:20,
        marginTop:15,
    },
});

export default ProfileScreen;