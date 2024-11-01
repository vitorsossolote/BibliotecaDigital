import UserSelectScreen from '../screens/UserSelectScreen/index';
import StudentScreen from '../screens/StudentScreen/index';
import LibrarianScreen from '../screens/LibrarianScreen/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginLibrarian from '../screens/Login/LoginLibrarian/index';
import LoginStudent from '../screens/Login/LoginStudent/index';
import CreateStudentAccount from '../screens/CreateAccount/CreateStudentAccount/index';
import CreateLibrarianAccount from '../screens/CreateAccount/createLibrarianAccount/index';
import SignInStudent from '../screens/CreateAccount/createStudentAccount';

const Stack = createStackNavigator();

export function Navigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='UserSelectScreen'>
      <Stack.Screen name="UserSelectScreen" component={UserSelectScreen}options={{ headerShown:false}} />
      <Stack.Screen name="StudentScreen" component={StudentScreen} options={{ headerShown:false}}/>
      <Stack.Screen name="LibrarianScreen" component={LibrarianScreen} options={{ headerShown:false}} />
      <Stack.Screen name="LoginLibrarian" component={LoginLibrarian} options={{ headerShown:false}} />
      <Stack.Screen name="LoginStudent" component={LoginStudent} options={{ headerShown:false}} />
      <Stack.Screen name="CreateStudent" component={SignInStudent} options={{ headerShown:false}} />
      <Stack.Screen name="CreateLibrarian" component={CreateLibrarianAccount} options={{ headerShown:false}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator;