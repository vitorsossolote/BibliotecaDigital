import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonIcon,
    Pressable,
    Heading,
} from "@gluestack-ui/themed"

import { config } from "@gluestack-ui/config"
import { StyleSheet, Text, View, PressableProps } from "react-native"
import { ArrowLeft, Bell } from 'lucide-react-native';

type Props = PressableProps & {
    title: string;
    subtitle: string;
    onPress: any;
    top:number;
    gap:number
};

const BackHeader = (props: Props) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container} >
            <View style={styles.firstIconContainer}>
                <Pressable onPress={props.onPress}>
                    <ArrowLeft color={"#000"} />
                </Pressable>
            </View>
            <View style={{left:20, top:props.top, gap:props.gap}}>
                <Heading style={styles.title}>{props.title}</Heading>
                <Text style={styles.subtitle}>{props.subtitle}</Text>
            </View>
        </SafeAreaView>
    </GluestackUIProvider>
);

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: "100%",
        flexDirection: 'row',
        padding: 20,
    },
    firstIconContainer: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        left: 20,
    },
    title: {
        fontSize: 28,
        
    },
    subtitle: {
        fontSize: 16,
    },
});


export default BackHeader;