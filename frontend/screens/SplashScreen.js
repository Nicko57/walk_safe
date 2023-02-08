import React, { useState, useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { registerIndieID } from "native-notify";

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false)
      const userId = await AsyncStorage.getItem('user_id')
      if (userId) {
        await registerIndieID(`${userId}`, 6193, 'rWR1WMqaI8HcWYDUZQFStS')
        let response = await fetch('http://localhost:8080/api/user/' + userId)
        let data = await response.json();
        await AsyncStorage.setItem("walkingSpeed", data.walkingSpeed)
        await AsyncStorage.setItem("name", data.name);
        await AsyncStorage.setItem("phoneNumber", data.phoneNumber);
      }
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'NavbarContainer'),
      )
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Home Safe</Text>
      {/* Can add our logo once finalised using code below (and deleting above text) */}
      {/* <Image
        source={require('../Image/aboutreact.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      /> */}
      <ActivityIndicator
        animating={animating}
        // color="#black"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: 40,
    fontWeight: '500'
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
})
