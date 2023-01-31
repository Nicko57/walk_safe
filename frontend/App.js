import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.globalContainer}>
      <Text>Home Screen</Text>
      <View style={styles.homeButtonContainer}>
        <Button
          title="Log in"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  function emailInputHandler(enteredEmail) {
    setEmailAddress(enteredEmail);
  };

  function passwordInputHandler(enteredPassword) {
    setPassword(enteredPassword);
  }

  const handleLogin = () => {
    // add code for handling sign up: validate token, navigate to home page, etc.
    setEmailAddress('');
    setPassword('');
    navigation.navigate('Home');
  }
  
  return (
      <View style={styles.globalContainer}>
        <Text style={styles.inputTitle}>Login</Text>
        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Your email here!"
          onChangeText={emailInputHandler}
          value={emailAddress}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Your password here!"
          secureTextEntry={true}
          onChangeText={passwordInputHandler}
          value={password}
        />
        <View style={styles.inputButtonContainer}>
          <Button title="Log in" onPress={handleLogin} />
        </View>
      </View>
  );
}

function SignupScreen({ navigation }) {
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

  const handleSignup = () => {
    // add code for handling sign up: trigger post request, navigate to home page, etc.
    setName('');
    setEmailAddress('');
    setPassword('');
    navigation.navigate('Home');
  }

  return (
    <View style={styles.globalContainer}>
      <Text style={styles.inputTitle}>Signup</Text>
      <Text style={styles.inputLabel}>Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Your name here!"
        onChangeText={nameInputHandler}
        value={name}
      />
      <Text style={styles.inputLabel}>Email address</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Your email here!"
        onChangeText={emailInputHandler}
        value={emailAddress}
      />
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Your password here!"
        onChangeText={passwordInputHandler}
        value={password}
      />
        <View style={styles.inputButtonContainer}>
          <Button title="Sign up" onPress={handleSignup} />
        </View>
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

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    backgroundColor: "#64C5F0",
  },
  inputTitle: {
    padding: 10,
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
  },
  inputLabel: {
    padding: 16,
    fontSize: 18,
    color: '#ffffff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: "#ADDEF3",
    color: '#ffffff',
    borderRadius: 8,
    width: '75%',
    padding: 16,
  },
  inputButtonContainer: {
    padding: 16,
  },
  homeButtonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
});