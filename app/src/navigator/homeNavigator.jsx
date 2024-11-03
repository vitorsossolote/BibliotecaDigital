// Navegação Pela Home
//Bibliotecas Utilizadas
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { House } from 'lucide-react-native';
import { createStackNavigator } from '@react-navigation/stack';
//Telas Importadas
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Home from '../screens/Home/index';
import Profile from '../screens/Profile/index';
import LoanScreen from '../screens/LoanScreen';
import AuthorsScreen from '../screens/AuthorsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import BorrowedBooks from '../screens/BorrowedBooks';
//Inicio do Código
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function HomeNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home"
        screenOptions={{
          headerShown: false, tabBarShowLabel: false,
          tabBarStyle: {
            positon: 'absolute',
            backgroundColor: "#fff",
            borderTopWidth: 0,
            bottom: 14,
            marginHorizontal: 20,
            elevation: 1,
            borderRadius: 30,
            height: 60,
          }
        }}>
        <Tab.Screen name="Home" component={Home}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              if (focused) {
                return <Ionicons name="home" size={26} color={"#ee2d32"} />
              }
              return <Ionicons name="home-outline" size={size} color={"#ee2d32"} />
            }
          }}
        />
        <Tab.Screen name="LoanScreen" component={LoanScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              if (focused) {
                return <Ionicons name="receipt" size={26} color={"#ee2d32"} />
              }
              return <Ionicons name="receipt-outline" size={size} color={"#ee2d32"} />
            },
            tabBarStyle: { display: 'none' }
          }} />
        <Tab.Screen name="Favorites" component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              if (focused) {
                return <Ionicons name="heart" size={26} color={"#ee2d32"} />
              }
              return <Ionicons name="heart-outline" size={size} color={"#ee2d32"} />
            },

          }} />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              if (focused) {
                return <Ionicons name="person" size={26} color={"#ee2d32"} />
              }
              return <Ionicons name="person-outline" size={size} color={"#ee2d32"} />
            },
            // tabBarStyle:{display: 'none'}
          }} />
        <Tab.Screen name="AuthorsScreen" component={AuthorsScreen} options={{ headerShown: false,  tabBarButton: (props) => null }}/>
        <Tab.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false,  tabBarButton: (props) => null, tabBarStyle:{display:'none'} }}/>
        <Tab.Screen name="BorrowedBooks" component={BorrowedBooks} options={{ headerShown: false,  tabBarButton: (props) => null,}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default HomeNavigator