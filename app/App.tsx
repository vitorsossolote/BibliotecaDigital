import React from 'react';
import SplashScreen, {  } from './src/screens/SplashScreen';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import LibrarianScreen from './src/screens/LibrarianScreen';
import UserSelectScreen from './src/screens/UserSelectScreen';
import StudentScreen from './src/screens/StudentScreen';

export default function app() {
 return (
  <GluestackUIProvider config={config}>
   <SplashScreen/>
   </GluestackUIProvider>
  );
}