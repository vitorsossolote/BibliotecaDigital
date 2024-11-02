import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonIcon,
    Pressable,
    Heading,
    PressableProps
} from "@gluestack-ui/themed"
import { MotiView } from 'moti'
import { config } from "@gluestack-ui/config"
import { StyleSheet, Text, View } from "react-native"
import { Search, Bell } from 'lucide-react-native';

type Props = PressableProps & {
    title: string;
    onPress: any;
    icon1: any,
    icon2: any
};

const MainHeader = (props: Props) => (
    <GluestackUIProvider config={config}>
        <View style={styles.container}>
            <View style={styles.FirstIconContainer}>
                <Button size="lg" p="$3.5" bg="transparent" marginTop={3}>
                    <Pressable onPress={props.onPress}>
                        <ButtonIcon as={props.icon1} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.SecondIconContainer}>
                <Button size="lg" p="$3.5" bg="transparent" marginTop={3}>
                    <Pressable onPress={() => console.log("teste")}>
                        <ButtonIcon as={props.icon2} color={'$black'} size={30} />
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
        backgroundColor:"#fafafa"
    },
    textContainer: {
        fleX:0.5,
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
        backgroundColor:"#fafafa"
    },
});



export default MainHeader;