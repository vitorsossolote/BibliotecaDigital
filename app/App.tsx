import React, { useState, useEffect } from 'react';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/Navigator/appNavigator';
import { AuthProvider } from './src/contexts/AuthContext';


export default function app() {


  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);

  //Ignore all log notifications
  LogBox.ignoreAllLogs();

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
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
      </>
    </GestureHandlerRootView>
  )


};
