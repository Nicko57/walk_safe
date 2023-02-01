import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SettingsScreen from '../screens/SettingsScreen';


const Stack = createNativeStackNavigator(); 

function SettingsContainer() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={{headerShown: true}}
      >
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SettingsContainer;
