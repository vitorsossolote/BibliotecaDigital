import React, { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import SplashScreen from './src/screens/SplashScreen/index';
import Navigator from './src/Navigator/index';
import Home from './src/screens/home/index';
import { LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignInStudent from './src/screens/CreateAccount/CreateStudentAccount/SignInStudent';
import Profile from './src/screens/Profile/index';
import VerificationScreen from './src/screens/VerificationScreen';
import NumberScreen from './src/screens/VerificationScreen/numberScreen';
import RegisterBooks from './src/screens/RegisterBooks/index';
import UserProfileScreen from './src/screens/UserProfileScreen/index';


export default function app() {

    // Mudanças do Fausto

    // const [initializing, setInitializing] = useState(true);
    // const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    // useEffect(() => {
    //   const unsubscribe = auth().onAuthStateChanged(_user => {
    //     if (initializing) {
    //       setInitializing(false);
    //     }
    //     setUser(_user);
    //   });

    //   return unsubscribe;
    // }, [initializing]);

    // if (initializing) {
    //   return (
    //     <GestureHandlerRootView>
    //       <>
    //         <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    //         <Home/>
    //       </>
    //     </GestureHandlerRootView>
    //   );
    // }

    // return (
    //   <GestureHandlerRootView style={{ flex: 1 }}>
    //      {user ? <Home /> : <SignInStudent/>} 
    //   </GestureHandlerRootView>
    // )
  //{/* se ele estiver logado vai pra pagina da esquerda, caso nao a da direita */

  return (
    <GestureHandlerRootView>
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <UserProfileScreen/>
      </>
    </GestureHandlerRootView>
  )


  };
