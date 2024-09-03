import React from 'react';
import SplashScreen, {  } from './src/screens/SplashScreen';
import { GluestackUIProvider, Modal } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import LibrarianScreen from './src/screens/LibrarianScreen';
import UserSelectScreen from './src/screens/UserSelectScreen';
import StudentScreen from './src/screens/StudentScreen';
import BackHeader from './src/components/BackHeader';
import LoginLibrarian from './src/screens/Login/LoginLibrarian';
import InputTest from './src/components/InputTest';
import LoginStudent from './src/screens/Login/LoginStudent';
import CreateStudentAccount from './src/screens/CreateAccount/createStudentAccount';
import ModalComp from './src/components/Modal/1Modal';
import VerificationScreen from './src/screens/VerificationScreen';
import CongratulationsScreen from './src/screens/CongratulationsScreen/Index';
export default function app() {
 return (
  <GluestackUIProvider config={config}>
      <CongratulationsScreen/>
   </GluestackUIProvider>
  );
}