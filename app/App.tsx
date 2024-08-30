import React from 'react';
import SplashScreen, {  } from './src/screens/SplashScreen';
import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import LibrarianScreen from './src/screens/LibrarianScreen';
import UserSelectScreen from './src/screens/UserSelectScreen';
import StudentScreen from './src/screens/StudentScreen';
import BackHeader from './src/components/BackHeader';
import LoginLibrarian from './src/screens/Login/LoginLibrarian';
import InputTest from './src/components/InputTest';

export default function app() {
 return (
  <GluestackUIProvider config={config}>
    <LoginLibrarian/>
   </GluestackUIProvider>
  );
}