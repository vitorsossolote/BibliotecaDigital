import React from 'react';
import SplashScreen, {  } from './src/screens/SplashScreen';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import WelcomeScreen from './src/screens/WelcomeScreen';

export default function app() {
 return (
  <GluestackUIProvider config={config}>
   <WelcomeScreen/>
   </GluestackUIProvider>
  );
}