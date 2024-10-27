import React, { useState, useEffect } from 'react';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import SplashScreen from './src/screens/SplashScreen/index';
import Navigator from './src/navigator/index';
import Home from './src/screens/home/index';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ButtonSheet from './src/components/ButtonSheet/index';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);
//Ignore all log notifications
LogBox.ignoreAllLogs();

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
      <Home/>
    </GestureHandlerRootView>
  )
}
