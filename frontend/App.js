import * as React from 'react';
import { useState } from 'react';
import { Text, View, Button, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Log in"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
}

function LoginScreen() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  function emailInputHandler(enteredEmail) {
    setEmailAddress(enteredEmail);
  };

  function passwordInputHandler(enteredPassword) {
    setPassword(enteredPassword);
  }
  
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login</Text>
        <Text>Email address</Text>
        <TextInput 
          placeholder="Enter your email here!"
          onChangeText={emailInputHandler}
          value={emailAddress}
        />
        <Text>Password</Text>
        <TextInput 
          placeholder="Enter your password here!"
          secureTextEntry={true}
          onChangeText={passwordInputHandler}
          value={password}
        />
        <Pressable></Pressable>
      </View>
  );
}

function SignupScreen() {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const nameInputHandler = (enteredName) => {
    setName(enteredName);
  }
  const emailInputHandler = (enteredEmail) => {
    setEmailAddress(enteredEmail);
  }
  const passwordInputHandler = (enteredPassword) => {
    setPassword(enteredPassword);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Signup Screen</Text>
      <Text>Name</Text>
      <TextInput
        placeholder="Your name here!"
        onChangeText={nameInputHandler}
        value={name}
      />
      <Text>Email address</Text>
      <TextInput
        placeholder="Your email here!"
        onChangeText={emailInputHandler}
        value={emailAddress}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="Your password here!"
        onChangeText={passwordInputHandler}
        value={password}
      />
    </View>
  );
}


const Stack = createNativeStackNavigator();  

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Signup' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
