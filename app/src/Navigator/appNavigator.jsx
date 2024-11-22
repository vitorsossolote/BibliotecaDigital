// AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import {useAuth} from '../contexts/AuthContext';

// Telas de Autenticação
import UserSelectScreen from '../screens/UserSelectScreen';
import StudentScreen from '../screens/StudentScreen';
import LibrarianScreen from '../screens/LibrarianScreen';
import LoginLibrarian from '../screens/Login/LoginLibrarian';
import LoginStudent from '../screens/Login/LoginStudent';
import CreateStudentAccount from '../screens/CreateAccount/CreateStudentAccount';
import CreateLibrarianAccount from '../screens/CreateAccount/createLibrarianAccount';
import SignInStudent from '../screens/CreateAccount/CreateStudentAccount/SignInStudent';
import ForgotPassword from '../screens/ForgotPassword';
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


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator Component
function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: "#fff",
          borderTopWidth: 0,
          bottom: 14,
          marginHorizontal: 20,
          elevation: 1,
          borderRadius: 30,
          height: 60,
        }
      }}
    >
      <Tab.Screen 
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={focused ? 26 : size} 
              color="#ee2d32" 
            />
          )
        }}
      />
      <Tab.Screen 
        name="LoanScreen" 
        component={LoanScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "receipt" : "receipt-outline"} 
              size={focused ? 26 : size} 
              color="#ee2d32" 
            />
          )
        }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "heart" : "heart-outline"} 
              size={focused ? 26 : size} 
              color="#ee2d32" 
            />
          )
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={focused ? 26 : size} 
              color="#ee2d32" 
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

// Main Navigator Component
export default function AppNavigator() {
    const { authData, loading } = useAuth();

    if (loading) {
        return null; // ou um componente de loading
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!authData ? (
                    // Auth Stack
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
                ) : (
                    // App Stack
                    <>
                        <Stack.Screen name="MainTabs" component={HomeTabNavigator} />
                        <Stack.Screen name="AuthorsScreen" component={AuthorsScreen} />
                        <Stack.Screen name="LoanHistory" component={LoanHistory} />
                        <Stack.Screen name="SearchAuthorScreen" component={SearchAuthorScreen} />
                        <Stack.Screen name="SearchGenderScreen" component={SearchGenderScreen} />
                        <Stack.Screen name="SearchScreen" component={SearchScreen} />
                        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
                        <Stack.Screen name="BorrowedBooks" component={BorrowedBooks} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}