// import CountDown from 'react-native-countdown-component'

// const Timer = ({ duration, isRunning }) => {
//   return (
//     <CountDown
//       until={60 * duration}
//       size={duration >= 60 ? 15 : 25}
//       onFinish={() => alert('Finished')}
//       digitStyle={{ backgroundColor: '#348EC5' }}
//       digitTxtStyle={{ color: 'white' }}
//       timeToShow={duration >= 60 ? ['H', 'M', 'S'] : ['M', 'S']}
//       timeLabels={{ h: '', m: '', s: '' }}
//       running={isRunning}
//     />
//   )
// }

// const styles = StyleSheet.create({

// })

import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Timer = ({ isRunning, setIsRunning, duration }) => {
  const timeFormatter = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (remainingTime % 60).toString().padStart(2, "0");
    return hours > 0
      ? `${hours}:${minutes}:${seconds}`
      : `${minutes}:${seconds}`;
  };

  const sendNotification = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    // got to map through emergency contacts
    let response = await fetch(
      `http://192.168.1.110:8080/api/user/contacts/${userId}`
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
          title: `${userId} didn't get home safe...`,
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
              title: `Someone didnt get home safe...`,
              message: `${contact.id} get in touch!!` ,
              timeSent: new Date(),
            },
          }),
        }
      );
      setIsRunning(false)
    }
  };

  return (
    <View style={styles.timerContainer}>
      <CountdownCircleTimer
        isPlaying={isRunning}
        duration={duration * 60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[
          duration * 60,
          duration * 45,
          duration * 30,
          duration * 15,
        ]}
        updateInterval={1}
        size={120}
      >
        {({ remainingTime, color }) => {
          if (remainingTime === 0 && isRunning) {
            sendNotification();
          }

          return (
            <Text style={{ color: "white", fontSize: 20 }}>
              {timeFormatter({ remainingTime })}
            </Text>
          );
        }}
      </CountdownCircleTimer>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {},
});
export default Timer;
