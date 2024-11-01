import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonIcon,
    Pressable,
    Heading,
} from "@gluestack-ui/themed"
import { MotiView } from 'moti'
import { config } from "@gluestack-ui/config"
import { StyleSheet, Text, View } from "react-native"
import { Search, Bell } from 'lucide-react-native';

interface Props {
    title: 'String',
    icon1: any,
    icon2: any
};

const MainHeader = ({ title, icon1, icon2 }: Props) => (
    <GluestackUIProvider config={config}>
        <View style={styles.container}>
            <View style={styles.FirstIconContainer}>
                <Button size="lg" p="$3.5" bg="transparent" marginTop={3}>
                    <Pressable onPress={() => console.log("teste")}>
                        <ButtonIcon as={icon1} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.SecondIconContainer}>
                <Button size="lg" p="$3.5" bg="transparent" marginTop={3}>
                    <Pressable onPress={() => console.log("teste")}>
                        <ButtonIcon as={icon2} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View>
        </View>
    </GluestackUIProvider>
);

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 'full',
        flexDirection: 'row',
        justifyContent:"space-between",
        paddingHorizontal:20
    },
    FirstIconContainer: {
        alignSelf:"center",
        justifyContent: 'center',
        width:50,
    },
    textContainer: {
        fleX:0.5,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        color: "#000",
    },
    SecondIconContainer: {
        width:50,
        justifyContent: 'center',
    },
});



export default MainHeader;