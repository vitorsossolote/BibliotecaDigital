import UserSelectScreen from '../screens/UserSelectScreen';
import StudentScreen from '../screens/StudentScreen';
import LibrarianScreen from '../screens/LibrarianScreen';
import LoginLibrarian from '../screens/Login/LoginLibrarian';
import LoginStudent from '../screens/Login/LoginStudent';
import CreateStudentAccount from '../screens/CreateAccount/createStudentAccount';
import CreateLibrarianAccount from '../screens/CreateAccount/createLibrarianAccount';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VerificationScreen from '../screens/VerificationScreen';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='UserSelectScreen'>
      <Stack.Screen name="UserSelectScreen" component={UserSelectScreen}options={{ headerShown:false}} />
      <Stack.Screen name="StudentScreen" component={StudentScreen} options={{ headerShown:false}}/>
      <Stack.Screen name="LibrarianScreen" component={LibrarianScreen} options={{ headerShown:false}} />
      <Stack.Screen name="LoginLibrarian" component={LoginLibrarian} options={{ headerShown:false}} />
      <Stack.Screen name="LoginStudent" component={LoginStudent} options={{ headerShown:false}} />
      <Stack.Screen name="CreateLibrarian" component={CreateLibrarianAccount} options={{ headerShown:false}} />
      <Stack.Screen name="CreateStudent" component={CreateStudentAccount} options={{ headerShown:false}} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} options={{ headerShown:false}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Navigator;