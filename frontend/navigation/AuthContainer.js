import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import AuthScreen from "../screens/AuthScreen";

const Stack = createNativeStackNavigator();

function AuthContainer() {
  return (
    <Stack.Navigator
      initialRouteName="Auth1"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="Auth1" component={AuthScreen} />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: "Signup" }}
      />
    </Stack.Navigator>
  );
}

export default AuthContainer;
