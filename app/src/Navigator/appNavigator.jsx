// AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Animated, { 
  useAnimatedScrollHandler, 
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation 
} from 'react-native-reanimated';

// Telas de Autenticação
import UserSelectScreen from '../screens/UserSelectScreen/index';
import StudentScreen from '../screens/StudentScreen/index';
import LibrarianScreen from '../screens/LibrarianScreen/index';
import LoginLibrarian from '../screens/Login/LoginLibrarian/index';
import LoginStudent from '../screens/Login/LoginStudent/index';
import CreateStudentAccount from '../screens/CreateAccount/CreateStudentAccount/index';
import CreateLibrarianAccount from '../screens/CreateAccount/createLibrarianAccount/index';
import ForgotPassword from '../screens/ForgotPassword/index';
import NewPasswordScreen from '../screens/ForgotPassword/newPassword';

// Telas do App
import SearchAuthorScreen from '../screens/SearchScreen/author';
import FavoritesScreen from '../screens/FavoritesScreen';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import LoanScreen from '../screens/LoanScreen';
import AuthorsScreen from '../screens/AuthorsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import BorrowedBooks from '../screens/BorrowedBooks';
import SearchGenderScreen from '../screens/SearchScreen/gender';
import SearchScreen from '../screens/SearchScreen/search';
import LoanHistory from '../screens/LoanHistory';
import RegisterBooks from '../screens/RegisterBooks'

//Components
import { MotiView } from 'moti';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator Component
function HomeTabStudentNavigator() {
  const scrollY = useSharedValue(0);
  const [isTabBarVisible, setIsTabBarVisible] = useState(false);

  // Delay tab bar visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTabBarVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });

  const tabBarAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 50], // Ajuste esses valores para sensibilidade do scroll
      [0, 100], 
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: -translateY }],
      opacity: interpolate(
        scrollY.value,
        [0, 50], 
        [1, 0], 
        Extrapolation.CLAMP
      )
    };
  });
  return (
    
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: 'absolute',
            backgroundColor: "#fff",
            borderTopWidth: 0,
            bottom: 14,
            marginHorizontal: 20,
            elevation: 1,
            borderRadius: 30,
            height: 60,
          },
          isTabBarVisible ? tabBarAnimatedStyle : { display: 'none' }
        ]
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 4000 }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={focused ? 26 : size}
                color={focused ? "#ee2d32" : "#a6a6a6"}
              />
            </MotiView>
          )
        }}
      />
      <Tab.Screen
        name="LoanScreen"
        component={LoanScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 4000 }}>
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                size={focused ? 26 : size}
                color={focused ? "#ee2d32" : "#a6a6a6"}
              />
            </MotiView>
          )
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 4000 }}>
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={focused ? 26 : size}
                color={focused ? "#ee2d32" : "#a6a6a6"}
              />
            </MotiView>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 4000 }}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={focused ? 26 : size}
                color={focused ? "#ee2d32" : "#a6a6a6"}
              />
            </MotiView>
          )
        }}
      />
    </Tab.Navigator>
  );
}

function HomeTabLibrarianNavigator() {
  const scrollY = useSharedValue(0);
  const [isTabBarVisible, setIsTabBarVisible] = useState(false);

  // Delay tab bar visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTabBarVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });

  const tabBarAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 50], // Ajuste esses valores para sensibilidade do scroll
      [0, 100], 
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: -translateY }],
      opacity: interpolate(
        scrollY.value,
        [0, 50], 
        [1, 0], 
        Extrapolation.CLAMP
      )
    };
  });
  return (
    
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: 'absolute',
            backgroundColor: "#fff",
            borderTopWidth: 0,
            bottom: 14,
            marginHorizontal: 20,
            elevation: 1,
            borderRadius: 30,
            height: 60,
          },
          isTabBarVisible ? tabBarAnimatedStyle : { display: 'none' }
        ]
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 4000 }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={focused ? 26 : size}
                color={focused ? "#ee2d32" : "#a6a6a6"}
              />
            </MotiView>
          )
        }}
      />
      <Tab.Screen
        name="LoanScreen"
        component={LoanScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 4000 }}>
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                size={focused ? 26 : size}
                color={focused ? "#ee2d32" : "#a6a6a6"}
              />
            </MotiView>
          )
        }}
      />
      <Tab.Screen
        name="RegisterBooks"
        component={RegisterBooks}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 4000 }}>
              <Ionicons
                name={focused ? "add-circle" : "add-circle-outline"}
                size={focused ? 30 : size}
                color={focused ? "#ee2d32" : "#a6a6a6"}
              />
            </MotiView>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ duration: 4000 }}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={focused ? 26 : size}
                color={focused ? "#ee2d32" : "#a6a6a6"}
              />
            </MotiView>
          )
        }}
      />
    </Tab.Navigator>
  );
}
// Main Navigator Component
export default function AppNavigator() {
  const { authData, loading, authLibrarianData} = useAuth(null);
  

  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authLibrarianData ? (
          // Librarian Routes
          <>
            <Stack.Screen name="HomeTabLibrarian" component={HomeTabLibrarianNavigator} />
            <Stack.Screen name="AuthorsScreen" component={AuthorsScreen} />
            <Stack.Screen name="LoanHistory" component={LoanHistory} />
            <Stack.Screen name="SearchAuthorScreen" component={SearchAuthorScreen} />
            <Stack.Screen name="SearchGenderScreen" component={SearchGenderScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="BorrowedBooks" component={BorrowedBooks} />
            <Stack.Screen name="RegisterBooks" component={RegisterBooks} />
            <Stack.Screen name="EditBooks" component={EditBooks} />
          </>
        ) : authData ? (
          // Student Routes
          <>
            <Stack.Screen name="HomeTabStudentNavigator" component={HomeTabStudentNavigator} />
            <Stack.Screen name="AuthorsScreen" component={AuthorsScreen} />
            <Stack.Screen name="LoanHistory" component={LoanHistory} />
            <Stack.Screen name="SearchAuthorScreen" component={SearchAuthorScreen} />
            <Stack.Screen name="SearchGenderScreen" component={SearchGenderScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen}/>
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="BorrowedBooks" component={BorrowedBooks} />
            <Stack.Screen name="RegisterBooks" component={RegisterBooks} />
          </>
        ) : (
          // Authentication Routes
          <>
            <Stack.Screen name="UserSelectScreen" component={UserSelectScreen} />
            <Stack.Screen name="StudentScreen" component={StudentScreen} />
            <Stack.Screen name="LibrarianScreen" component={LibrarianScreen} />
            <Stack.Screen name="LoginLibrarian" component={LoginLibrarian} />
            <Stack.Screen name="LoginStudent" component={LoginStudent} />
            <Stack.Screen name="CreateStudent" component={CreateStudentAccount} />
            <Stack.Screen name="CreateLibrarian" component={CreateLibrarianAccount} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}