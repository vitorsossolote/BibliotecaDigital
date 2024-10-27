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
            <View style={styles.searchContainer}>
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
            </View>
            <View style={styles.bellContainer}>
                <Button
                    size="lg"
                    p="$3.5"
                    bg="transparent"
                    marginBottom={30}
                >
                    <Pressable onPress={onPress}>
                        {/* EditIcon is imported from 'lucide-react-native' */}
                        <ButtonIcon as={ArrowLeft} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View>
            <View style={styles.textContainer}>
                <Heading style={styles.title}>{title}</Heading>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </SafeAreaView>
    </GluestackUIProvider>
);

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 375,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    searchContainer: {
        position: 'absolute'
    },
    Container: {
        position: 'absolute'
    },
    searchContainer: {
        position: 'absolute'
    },
    textContainer:{
        marginTop:60,
        marginLeft: 30,
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