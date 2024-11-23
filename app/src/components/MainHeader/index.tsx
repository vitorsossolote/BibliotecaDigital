import React from "react";
import {
    GluestackUIProvider,
    Button,
    ButtonIcon,
    Pressable,
} from "@gluestack-ui/themed"
import { MotiView } from 'moti'
import { config } from "@gluestack-ui/config"
import { StyleSheet, Text, View,PressableProps } from "react-native"
import { Search, Bell } from 'lucide-react-native';

type Props = PressableProps & {
    title: string;
    onPress: any;
    icon1: any,
    icon2: any,
    onPress2: any;
    marginRight: any
};

const MainHeader = (props: Props) => (
    <GluestackUIProvider config={config}>
        <View style={styles.container}>
            <View style={[styles.FirstIconContainer, {marginRight:props.marginRight}]}>
                <Button size="lg" p="$3.5" bg="transparent" marginTop={3}>
                    <Pressable onPress={props.onPress}>
                        <ButtonIcon as={props.icon1} color={'$black'} size={'xl'} />
                    </Pressable>
                </Button>
            </View>
            <MotiView style={styles.textContainer} from={{translateY:-50, opacity:0}} animate={{translateY:0, opacity:1}} transition={{duration:2000, type:"timing"}}>
                <Text style={styles.title}>{props.title}</Text>
            </MotiView>
            <View style={styles.SecondIconContainer}>
                <Button size="lg" p="$3.5" bg="transparent" marginTop={3}>
                    <Pressable onPress={props.onPress2}>
                        <ButtonIcon as={props.icon2} color={'$black'} size={'xl'} />
                    </Pressable>
                </Button>
            </View>
        </View>
    </GluestackUIProvider>
);

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent:"space-between",
        paddingHorizontal:20
    },
    FirstIconContainer: {
        alignSelf:"center",
        justifyContent: 'center',
        width:50,
        backgroundColor:"#fff",
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: "#000",
        fontWeight:"bold",
        top:2,
    },
    SecondIconContainer: {
        width:50,
        justifyContent: 'center',
        backgroundColor:"#fff"
    },
});



export default MainHeader;