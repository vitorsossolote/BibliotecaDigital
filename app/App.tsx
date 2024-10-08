import React, {useState,useEffect} from 'react';


import SplashScreen from './src/screens/SplashScreen/index';
import ButtonSheet from './src/Components/ButtonSheet/index';
import Navigator from './src/Navigator/index';
import Home from './src/screens/Home/index';

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
// return(
//   <ButtonSheet/>
// )
    


}
