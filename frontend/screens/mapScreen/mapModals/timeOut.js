import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Timeout = ({ setViewTimeOut, setViewSOS, handleHomeSafe }) => {
  const [timer, setTimer] = useState(10);
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  // maybe put in a useEffect hook when refactoring
  const retrieveUserInfo = async () => {
    const userName = await AsyncStorage.getItem('name');
    setName(userName);
    console.log('name: ', userName);
    const phone = await AsyncStorage.getItem('phoneNumber');
    setPhoneNumber(phone);
    console.log('phoneNumber: ', phoneNumber);
  }
  retrieveUserInfo();

  const sendNotification = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    // got to map through emergency contacts
    let response = await fetch(
      `http://localhost:8080/api/user/contacts/${userId}`
    );
    let data = await response.json();
    if (response.status === 200) {
      sendTimer0Notification(userId, data);
    }
  };

  const sendTimer0Notification = async (userId, data) => {
    for (const contact of data.emergencyContacts) {
      await fetch("https://app.nativenotify.com/api/indie/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subID: `${contact.id}`,
          appId: 6193,
          appToken: "rWR1WMqaI8HcWYDUZQFStS",
          title: `${name} didn't get home safe...`,
          message: "Get in touch ASAP!!!",
        }),
      });
      await fetch(
        `http://localhost:8080/api/user/notifications/${contact.id}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notification: {
              title: `${name} didnt get home safe...`,
              message: `Tap here to see more info` ,
              timeSent: new Date(),
              name: name,
              phoneNumber: phoneNumber,
            },
          }),
        }
      );
    }
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      // perform fetch request here
      clearInterval(interval);
    }
    if (timer === 0) {
      setViewTimeOut(false);
      setViewSOS(true);
      sendNotification();
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <View style={styles.modalContent}>
      <Text>{timer}</Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setViewTimeOut(false)}
      >
        <Text>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.homeSafeButton}
        onPress={() => {
          setTimer(0)
          setViewTimeOut(false)
          handleHomeSafe()
        }}
      >
        <Text>Home Safe</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'amber',
    color: "black",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    color: 'white',
    backgroundColor: 'red',
  },
  homeSafeButton: {
    padding: 10,
    color: 'white',
    backgroundColor: 'green',
    marginTop: 20,
  },
})

export default Timeout
