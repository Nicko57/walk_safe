import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingsScreen({ navigation }) {

  // function handleResetPassword() {
  //
  // We want to fetch user, then update their password in the database.
  //
  // Implement 'confirm password' so user has to enter their new password twice.
  //
  // }

  function handleLogout() {
    AsyncStorage.removeItem('token');
    navigation.navigate("Settings");
  }

  // function handleDeleteAccount() {
  
  // We want to fetch user, then delete that user from the database.
  
  // Check how we can find users. 
  
  // Once found user, delete this.
  
  
  // Implement confirmation screen to make sure user doesn't delete their account
  // by accident.
  
  // }

  return (
    <View style={styles.globalContainer}>
      <Text style={styles.name}>Will Jones</Text>
      <View style={styles.aboutUsContainer}>
        <Text style={styles.aboutUsText}>About us:</Text>
      </View>
      <View style={styles.resetPasswordButton}>
        <Button title="Reset Password"></Button>
      </View>
      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout}></Button>
      </View>
      <Pressable>
        <Text style={styles.deleteAccountText}>
          Delete Account
        </Text>
      </Pressable>
    </View>
  );
}

export default SettingsScreen;


const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    backgroundColor: "#64C5F0",
  },
  name: {
    padding: 10,
    fontSize: 38,
    fontWeight: '600',
    color: '#ffffff',
  },
  aboutUsContainer: {
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    paddingVertical: 140,
    paddingBottom: 155,
    marginBottom: 10,
    paddingHorizontal: 120,
    borderRadius: 30,
    justifyContent: 'space-between',
  },
  aboutUsText: {
    width: '100%',
    textAlign: 'right'
  },
  resetPasswordButton: {
    width: 250,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: 'red',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutButton: {
    width: 250,
    marginVertical: 6,
    marginHorizontal: 12,
    backgroundColor: '#348EC5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteAccountText: {
    color: 'red',
  }
});
