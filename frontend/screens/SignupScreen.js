import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';


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

    if (response === 200) {
      console.log('Success:', data);
      setName('');
      setEmail('');
      setPassword('');
      navigation.navigate('Home');
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
        <View style={styles.button}>
          <Pressable onPress={handleSignup}>
            <Text style={styles.inputLabel}>Sign up</Text>
          </Pressable>
          {/* <Button title="Sign up" onPress={handleSignup} /> */}
        </View>
        {error && <View><Text>{error}</Text></View>}
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
});
