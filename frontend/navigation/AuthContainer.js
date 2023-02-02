import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AuthScreen from '../screens/AuthScreen';


const Stack = createNativeStackNavigator(); 

function AuthContainer() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{headerShown: true}}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthContainer;
