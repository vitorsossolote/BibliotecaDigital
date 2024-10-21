import React, {useState,useEffect} from 'react';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import SplashScreen from './src/screens/SplashScreen/index';
import ButtonSheet from './src/Components/ButtonSheet/index';
import Navigator from './src/navigator/index';
import Home from './src/screens/home';
import Authors from './src/screens/authors/index';
import VerificationScreen from './src/screens/VerificationScreen';

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
return(
  <Home/>
)
    


}
