import React, { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import SplashScreen from './src/screens/SplashScreen/index';
import Navigator from './src/Navigator/index';
import Home from './src/screens/Home/index';
import { LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Author from './src/screens/authors';
import ForgotPassword from './src/screens/forgotPassword';
import LoanScreen from './src/screens/loanScreen';
import BorrowedBooks from './src/screens/borrowedBooks';
import NotificationsScreen from './src/screens/notificationsScreen/notificationsScreen';
import CreateLibrarianAccount from './src/screens/CreateAccount/createLibrarianAccount/index';
import SignInStudent from './src/screens/CreateAccount/CreateStudentAccount/SignInStudent';
import LoginStudent from './src/screens/Login/LoginStudent/index';
import UserSelectScreen from './src/screens/UserSelectScreen/index';
import VerificationScreen from './src/screens/VerificationScreen/index';
import CongratulationsScreen from './src/screens/CongratulationsScreen/Index';
import Authors from './src/components/Authors/index';
import StudentScreen from './src/screens/StudentScreen/index';

export default function app() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
      const unsubscribe = auth().onAuthStateChanged(_user => {
        if (initializing) {
          setInitializing(false);
        }
        setUser(_user);
      });

      return unsubscribe;
    }, [initializing]);

    if (initializing) {
      return (
        <GestureHandlerRootView>
          <>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <SplashScreen />
          </>
        </GestureHandlerRootView>
      );
    }

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         {user ? <Home /> : <SignInStudent/>} 
      </GestureHandlerRootView>
    )
  //{/* se ele estiver logado vai pra pagina da esquerda, caso nao a da direita */

  // return (
  //   <GestureHandlerRootView>
  //     <>
  //       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
  //       <Home />
  //     </>
  //   </GestureHandlerRootView>
  // )
  };
