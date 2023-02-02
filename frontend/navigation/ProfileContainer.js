import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/Profile';


const Stack = createNativeStackNavigator(); 

function SettingsContainer() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{headerShown: true}}
      >
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default SettingsContainer;
