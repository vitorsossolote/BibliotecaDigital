import React from "react";
import {
  GluestackUIProvider,
  Button,
  Spinner,
  ButtonText,
  SafeAreaView,
  Image,
} from "@gluestack-ui/themed"
import { StyleSheet, Text } from "react-native"
import { config } from "@gluestack-ui/config"

const SplashScreen = () => (
  <GluestackUIProvider config={config}>
    <SafeAreaView style={styles.container}>
      <Image size='xs'style={styles.logo}source={require('../../../assets/logo.png')} alt ="Logo Sesi Senai"/>
      <Spinner size='large' color='#fff'></Spinner>
    </SafeAreaView>
  </GluestackUIProvider>
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: '#EE2D32',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    width:600,
    height:65,
  },
});


export default SplashScreen;