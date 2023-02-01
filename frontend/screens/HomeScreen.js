import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {

  return (
    <View style={styles.globalContainer}>
      <Text style={styles.title}>Get Home Safe</Text>
      <Text>Home screen with map</Text>
    </View>
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 60,
    backgroundColor: "#64C5F0",
  },
  title: {
    padding: 10,
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
  },
});
