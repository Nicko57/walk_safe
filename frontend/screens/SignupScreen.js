import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerIndieID } from "native-notify";

function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const nameInputHandler = (enteredName) => {
    setName(enteredName);
  }

  const emailInputHandler = (enteredEmail) => {
    setEmail(enteredEmail);
  }

  const passwordInputHandler = (enteredPassword) => {
    setPassword(enteredPassword);
  }

  const handleSignup = async () => {
    setError(null);
    
    let response = await fetch('http://localhost:8080/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
    })
    
    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      console.log("token:", data.token);
      console.log('user_id:', data.user_id);
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("user_id", data.user_id);
      setName('');
      setEmail('');
      setPassword('');

      // await registerIndieID(`${data.user_id}`, 6193, "rWR1WMqaI8HcWYDUZQFStS");
      // await fetch("https://app.nativenotify.com/api/indie/notification", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     subID: `${data.user_id}`,
      //     appId: 6193,
      //     appToken: "rWR1WMqaI8HcWYDUZQFStS",
      //     title: "You've logged in",
      //     message: "Nice one",
      //   }),
      // });
      navigation.replace('NavbarContainer');
    } else {
      setError(data.error);
      console.log('Error:', error);
    }
  }

  return (
    <View style={styles.globalContainer}>
      <Text style={styles.title}>Signup</Text>
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
        value={email}
      />
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Your password here!"
        onChangeText={passwordInputHandler}
        value={password}
      />
        {error &&
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        }
        <View style={styles.button}>
          <Pressable onPress={handleSignup}>
            <Text style={styles.inputLabel}>Sign up</Text>
          </Pressable>
          {/* <Button title="Sign up" onPress={handleSignup} /> */}
        </View>
        <Pressable onPress={(() => navigation.navigate('Login'))}>
        <Text style={styles.loginButtonText}>Or log in here</Text>
      </Pressable>
    </View>
  );
}

export default SignupScreen;


const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    backgroundColor: "#64C5F0",
  },
  title: {
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
    color: '#000000',
    borderRadius: 8,
    width: '75%',
    padding: 16,
  },
  homeButtonsContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 120,
    marginVertical: 24,
    marginHorizontal: 12,
    backgroundColor: '#348EC5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButtonText: {
    color: '#ffffff',
  },
  errorContainer: {
    marginTop: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    backgroundColor: '#dddddd'
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D238FF',
  },
});
