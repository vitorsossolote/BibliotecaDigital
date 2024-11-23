import React, { useState, useEffect } from 'react';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/Navigator/appNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import LoanScreen from './src/screens/LoanScreen';


export default function app() {


  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);

  //Ignore all log notifications
  LogBox.ignoreAllLogs();


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )


};
