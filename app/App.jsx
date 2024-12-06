import React, { useState, useEffect } from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { LogBox, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/Navigator/appNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { initializeApp } from 'firebase-admin/app';


// Inicializar Firebase antes de qualquer uso
firebase.initializeApp();

export default function App() {
  useEffect(() => {
    // Solicitar permissão de notificações
    async function requestNotificationPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // Obter token FCM
        const token = await messaging().getToken();
        console.log('Firebase Token:', token);
        
        // Enviar token para seu backend
        // Você precisará implementar a lógica de envio do token
      }
    }

    requestNotificationPermission();

    // Lidar com notificações em primeiro plano
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notificação recebida em primeiro plano:', remoteMessage);
      // Aqui você pode personalizar como as notificações são exibidas
    });

    return unsubscribe;
  }, []);

  // Ignorar logs (opcional)
  LogBox.ignoreLogs(['Warning: ...']);
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
  );
}