import React, { useState, useEffect } from 'react';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import SplashScreen from './src/screens/SplashScreen/index';
import Navigator from './src/navigator/index';
import Home from "./src/screens/Home/index";
import { LogBox,StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Author from './src/screens/authors/index';
import ForgotPassword from './src/screens/forgotPassword/index';
import LoanScreen from './src/screens/loanScreen/index';
import BorrowedBooks from './src/screens/borrowedBooks/index';
import NotificationsScreen from './src/screens/notificationsScreen/notificationsScreen';
import CreateLibrarianAccount from './src/screens/CreateAccount/createLibrarianAccount/index';
import SignInStudent from './src/screens/CreateAccount/CreateStudentAccount/SignInStudent';
import LoginStudent from './src/screens/Login/LoginStudent/index';
import MainHeader from './src/components/MainHeader/index';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
//Ignore all log notifications
LogBox.ignoreAllLogs();

import { Search, Bell } from 'lucide-react-native';
import VerificationScreen from './src/screens/VerificationScreen/index';

export default function app() {
  //     const [isShowSplash, setIsShowSplash] = useState(true);

  //   useEffect(()=> {
  //     setTimeout(()=> {
  //       setIsShowSplash(false);
  //     },3000);
  //   });
  //  return (
  //     <>{isShowSplash ? <SplashScreen/> : <Navigator/>}</>
  //   );
  return (
    <GestureHandlerRootView>
      <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <VerificationScreen/>
      </>
    </GestureHandlerRootView>
  )
}
