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
import { StyleSheet, Text, View } from "react-native"
import { ArrowLeft } from 'lucide-react-native';

type Props = PressableProps & {
    title: string;
    subtitle: string;
    margin : int;
    onPress : any;
};

const BackHeader = ({ onPress, title, subtitle,margin,}: Props) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container} marginTop={margin}>
            <View style={styles.FirstIconContainer}>
                <Button
                    size="lg"
                    p="$3.5"
                    bg="transparent"
                >
                    <Pressable onPress={onPress}>
                        <ButtonIcon as={ArrowLeft} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View>
            {/* <View style={styles.SecondIconContainer}>
                <Button
                    size="lg"
                    p="$3.5"
                    bg="transparent"
                    marginBottom={30}
                >
                    <Pressable onPress={onPress}>
                        <ButtonIcon as={ArrowLeft} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View> */}
            <View style={styles.textContainer}>
                <Heading style={styles.title}>{title}</Heading>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </SafeAreaView>
    </GluestackUIProvider>
);

const styles = StyleSheet.create({
    container: {
        height: 140,
        width: "100%",
        flexDirection: 'row',
    },
    FirstIconContainer: {
        backgroundColor:"#ee2d",
        flex:0.5,
        width:25,
        height:25,
        justifyContent:"center",
        alignItems:'center'
    },
    textContainer:{
        marginTop:60,
        marginRight:40,
        backgroundColor:"#ee2d32"
    },
    title: {
        fontSize:28,
    },
    subtitle: {
        fontSize: 16,
        marginTop:10,
    },
});


export default BackHeader;