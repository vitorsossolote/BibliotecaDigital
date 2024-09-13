import React from 'react';
import {useState,useEffect} from 'react';
import { GluestackUIProvider} from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import SplashScreen from './src/screens/SplashScreen';
import Navigator from './src/navigator';
import Home from './src/screens/home'
import Carrosel from './src/components/Carrousel';
import Login from './src/screens/Login/LoginStudent';


export default function app() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(()=> {
    setTimeout(()=> {
      setIsShowSplash(false);
    },3000);
  });
 return (
    <>{isShowSplash ? <SplashScreen/> : <Navigator/>}</>
  );
// return (
//     <GluestackUIProvider config={config}>
//     <SplashScreen/>
//      </GluestackUIProvider>
//     );

}