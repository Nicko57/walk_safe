import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Timer = ({ isRunning, setIsRunning, duration, setStarted, setViewTimeOut, setDestination }) => {
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

  const sendUserNotification = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    await fetch("https://app.nativenotify.com/api/indie/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subID: `${userId}`,
          appId: 6193,
          appToken: "rWR1WMqaI8HcWYDUZQFStS",
          title: `You have 1 minute to click home safe!!`,
          message: "If you do not your emergency contacts will be notified.",
        }),
      });
  }
  return (
    <View style={styles.timerContainer}>
      <CountdownCircleTimer
        isPlaying={isRunning}
        duration={duration * 60}
        colors={["#479761", "#FAED26", "#FF9900", "red"]}
        colorsTime={[
          duration * 60,
          duration * 45,
          duration * 30,
          duration * 15,
        ]}
        updateInterval={1}
        size={100}
      >
        {({ remainingTime, color }) => {
          if (remainingTime === 0 && isRunning) {
            setStarted(false);
            sendUserNotification();
            setViewTimeOut(true);
            setIsRunning(false);
            setDestination(null)
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
