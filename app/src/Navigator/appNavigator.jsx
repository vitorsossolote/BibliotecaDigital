// AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MotiView } from 'moti';
import { Alert } from 'react-native';  // Adicione esta importação
import messaging from '@react-native-firebase/messaging';


// Telas de Autenticação
import UserSelectScreen from '../screens/UserSelectScreen/index';
import StudentScreen from '../screens/StudentScreen/index';
import LibrarianScreen from '../screens/LibrarianScreen/index';
import LoginLibrarian from '../screens/Login/LoginLibrarian/index';
import LoginStudent from '../screens/Login/LoginStudent/index';
import CreateStudentAccount from '../screens/CreateAccount/CreateStudentAccount/index';
import CreateLibrarianAccount from '../screens/CreateAccount/CreateLibrarianAccount/index';
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
import RegisterBooks from '../screens/RegisterBooks';
import EditBooks from '../screens/EditBooks';
import RegisterAutor from '../screens/RegisterAutor';
import RegisterGender from '../screens/RegisterGender';
import StudentManagementScreen from '../screens/StudentManagement';
import EditStudentScreen from '../screens/EditStudent';
import LoanManagement from '../screens/LoanManagement';
import EditAuthor from '../screens/EditAuthor';
import MostViewedBooks from '../screens/MostViewed';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const requestUserPermissions = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      try {
        const tokenFcm = await messaging().getToken();
        console.log('User FCM Token:', tokenFcm);
        
        // Aqui você deve salvar o token no backend ou no estado do app
        // Por exemplo: await saveTokenToDatabase(tokenFcm);

        messaging().onTokenRefresh(newToken => {
          console.log('New FCM Token:', newToken);
          // Atualize o token no backend/estado
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
          // Trate a notificação em primeiro plano
          Alert.alert(
            'Nova Notificação', 
            remoteMessage.notification?.body || 'Você tem uma nova mensagem'
          );
        });

        return unsubscribe;
      } catch (tokenError) {
        console.error('Erro ao obter token FCM:', tokenError);
        // Trate o erro de obtenção do token
      }
    } else {
      // Usuário negou permissão
      Alert.alert(
        'Notificações Desativadas', 
        'Você não receberá notificações do app. Pode ativar nas configurações.'
      );
    }
  } catch (permissionError) {
    console.error('Erro ao solicitar permissão:', permissionError);
    // Trate o erro de permissão
  }

  return null;
};

function HomeTabStudentNavigator() {
  const [isTabBarVisible, setIsTabBarVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTabBarVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: (props) => {
            const isBottomSheetOpen = props.route?.params?.isBottomSheetOpen;
            
            return [
                {
                    position: 'absolute',
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    bottom: 14,
                    marginHorizontal: 20,
                    elevation: 1,
                    borderRadius: 30,
                    height: 60,
                    display: isBottomSheetOpen ? 'none' : 'flex',
                },
            ];
        },
    })}
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
  const [isTabBarVisible, setIsTabBarVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTabBarVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);


  return (
    
    <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: (props) => {
            const isBottomSheetOpen = props.route?.params?.isBottomSheetOpen;
            
            return [
                {
                    position: 'absolute',
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    bottom: 14,
                    marginHorizontal: 20,
                    elevation: 1,
                    borderRadius: 30,
                    height: 60,
                    display: isBottomSheetOpen ? 'none' : 'flex',
                },
            ];
        },
    })}
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
        name="LoanManagement"
        component={LoanManagement}
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
          ),
            tabBarStyle: { display: 'none' }, 
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

export default function AppNavigator() {
  requestUserPermissions()

  const { authData, loading, authLibrarianData} = useAuth(null);
  
  if (loading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authLibrarianData ? (
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
            <Stack.Screen name="RegisterAutor" component={RegisterAutor} />
            <Stack.Screen name="RegisterGender" component={RegisterGender} />
            <Stack.Screen name="CreateLibrarian" component={CreateLibrarianAccount} />
            <Stack.Screen name="CreateStudent" component={CreateStudentAccount} />
            <Stack.Screen name="StudentManagement" component={StudentManagementScreen} />
            <Stack.Screen name="EditStudent" component={EditStudentScreen} />
            <Stack.Screen name="EditAuthor" component={EditAuthor} />
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
            <Stack.Screen name="MostViewed" component={MostViewedBooks} />
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