import React from "react";
import {
    GluestackUIProvider,
    SafeAreaView,
    Button,
    ButtonIcon,
    Pressable,
    Heading,
} from "@gluestack-ui/themed"
import {MotiView} from 'moti'
import { config } from "@gluestack-ui/config"
import { StyleSheet, Text, View } from "react-native"
import {Search, Bell} from 'lucide-react-native';

interface Props{
    title: 'String',
    icon1:any,
    icon2:any
};

const MainHeader = ({title,icon1,icon2}:Props) => (
    <GluestackUIProvider config={config}>
      <MotiView from={{translateY:-50}} animate={{translateY:[10]}} transition={{duration:3000}}>
        <SafeAreaView style={styles.container}>
            <View style={styles.SearchContainer}>
                <Button size="lg" p="$3.5" bg="transparent"marginTop={3}>
                    <Pressable onPress={()=> console.log("teste")}>
                        <ButtonIcon as={icon1} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>TESTE</Text>
            </View>
            <View style={styles.BellContainer}>
                <Button size="lg" p="$3.5" bg="transparent"marginTop={3}>
                    <Pressable onPress={()=> console.log("teste")}>
                        <ButtonIcon as={icon2} color={'$black'} size={30} />
                    </Pressable>
                </Button>
            </View>  
        </SafeAreaView>
        </MotiView>
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
        fontSize:50,
        color:"#000"
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