import * as React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  // const token = (async () => {
  //   const value = await AsyncStorage.getItem('token');
  //   console.log(value);
  //   return value;
  // })();

  // const handleLogout = () => {
  //   AsyncStorage.removeItem('token');
  //   console.log(AsyncStorage.getItem('token'));
  // }

  return (
    <View style={styles.globalContainer}>
      <Text style={styles.title}>Get Home Safe</Text>
      <View style={styles.homeButtonsContainer}>
        {/* {!token && */}
          <View style={styles.button}>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.inputLabel}>Log in</Text>
            </Pressable>
          </View>
        {/* } */}
        {/* {!token && */}
          <View style={styles.button}>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.inputLabel}>Sign up</Text>
            </Pressable>
          </View>
        {/* } */}
      </View>
        {/* {token &&
          <View style={styles.button}>
            <Pressable onPress={handleLogout}>
              <Text style={styles.inputLabel}>Log out</Text>
            </Pressable>
          </View>
        } */}
    </View>
  );
}

export default HomeScreen;


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
