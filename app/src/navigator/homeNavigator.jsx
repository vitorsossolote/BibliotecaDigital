import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/index';
import Profile from '../screens/Profile/index';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export function HomeNavigator() {
  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} screenOptions={{ headerShown: false }}/>
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
    </NavigationContainer>
  );
}

export default HomeNavigator;