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
import {Search, Bell} from 'lucide-react-native';

interface Props{
    title: 'String',
};

const MainHeader = ({title}:Props) => (
    <GluestackUIProvider config={config}>
        <SafeAreaView style={styles.container}>
            <View style={styles.SearchContainer}>
                <Button size="lg" p="$3.5" bg="transparent"marginTop={3}>
                    <Pressable onPress={()=> console.log("teste")}>
                        <ButtonIcon as={Search} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View>
            <View style={styles.textContainer}>
                <Heading style={styles.title}>{title}</Heading>
            </View>
            <View style={styles.bellContainer}>
                <Button size="lg" p="$3.5" bg="transparent"marginTop={3}>
                    <Pressable onPress={()=> console.log("teste")}>
                        <ButtonIcon as={Bell} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View>  
        </SafeAreaView>
    </GluestackUIProvider>
);

const styles = StyleSheet.create({
    container: {
        flex:1,
        height: 50,
        width: 'full',
        backgroundColor: '#fff',
        flexDirection: 'row',
        
    },
    SearchContainer: {
        justifyContent:'center',
    },
    textContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    title: {
        fontSize:24,
    },
    subtitle: {
        fontSize: 16,
        marginTop:10,
    },
    BellContainer:{
        flex:1,
        justifyContent:'center',
    },
});


export default MainHeader;