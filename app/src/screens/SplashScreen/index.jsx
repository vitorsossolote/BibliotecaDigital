import React from "react";
import {
  GluestackUIProvider,
  Button,
  Spinner,
  ButtonText,
  SafeAreaView,
  Image,
} from "@gluestack-ui/themed"
import { StyleSheet, Text, View } from "react-native"
import { config } from "@gluestack-ui/config"

const SplashScreen = () => (
  <GluestackUIProvider config={config}>
    <SafeAreaView style={styles.container}>
      <View style = {styles.imageContainer}>
      <Image size='xs'style={styles.logo}source={require('../../../assets/logo.png')} alt ="Logo Sesi Senai"/>
      <Spinner size='large' color='#fff'></Spinner>
      </View>
    </SafeAreaView>
  </GluestackUIProvider>
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: '#EE2D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer:{
    marginBottom:200,
  },  
  logo:{
    width:310,
    height:40,
    marginBottom:10,
  },
});


export default SplashScreen;