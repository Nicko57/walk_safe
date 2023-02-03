import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

function SettingsScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [error, setError] = useState(null);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  
  const retrieveUserId = async () => {
    const value = await AsyncStorage.getItem('user_id');
    setUserId(value);
    console.log('userId: ', value);
  };
  retrieveUserId();

  const handleChangePasswordModal = () => {
    setChangePasswordModalVisible(!changePasswordModalVisible);
  }

  const passwordInputHandler = (enteredPassword) => {
    setNewPassword(enteredPassword);
  }

  const handleChangePassword = async () => {
  // We want to fetch user, then update their password in the database.
  // Implement 'confirm password' so user has to enter their new password twice.
    setError(null);
    console.log('userId:', userId)

    let response = await fetch(`http://localhost:8080/api/user/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        password: newPassword,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })

      let data = await response.json()
      
      if(response.status === 200) {
        console.log(data.message);
        setNewPassword('');
        navigation.navigate('Settings');
      } else {
        setError(data.error);
        console.log('Error:', error);
      }
  }

  const handleLogout = () => {
    AsyncStorage.removeItem('token');
    navigation.navigate("Settings");
  }

  // const handleDeleteAccount = () => {
  
  // We want to fetch user, then delete that user from the database.
  
  // Check how we can find users. 
  
  // Once found user, delete this.
  
  
  // Implement confirmation screen to make sure user doesn't delete their account
  // by accident.
  
  // }

  return (
    <View style={styles.globalContainer}>
      {changePasswordModalVisible &&
        <Modal>
          <View style={styles.changePasswordModal}>
            <Pressable style={styles.closeButton} onPress={handleChangePasswordModal}>
              <Text style={styles.confirmButtonText}>Close</Text>
            </Pressable>
            <View style={styles.modalMainContents}>
              <Text style={styles.passwordLabel}>New password</Text>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry={true}
                onChangeText={passwordInputHandler}
                value={newPassword}
              ></TextInput>
              {/* <Text style={styles.passwordLabel}>Re-type password</Text>
              <TextInput style={styles.passwordInput} secureTextEntry={true}></TextInput> */}
              <View style={styles.confirmButtonContainer}>
                <Pressable style={styles.confirmButton} onPress={handleChangePassword}>
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      }
      <Text style={styles.name}>Will Jones</Text>
      <View style={styles.aboutUsContainer}>
        <Text style={styles.aboutUsText}>About us:</Text>
      </View>
      <View style={styles.changePasswordButton}>
        <Button title="Change Password" onPress={handleChangePasswordModal}></Button>
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
  changePasswordModal: {
    flex: 1,
    marginBottom: 100,
    marginTop: 103,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#64C5F0",
  },
  closeButton: {
    flex: 0.1,
    justifyContent: 'flex-start',
    padding: 20,
    marginLeft: 'auto',
  },
  modalMainContents: {
    flex: 0.9,
    justifyContent: 'center',
    marginBottom: 80,
  },
  passwordLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginVertical: 10
  },
  passwordInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 40,
    width: 200,
    marginVertical: 10,
    fontSize: 20,
    type: 'password',
  },
  confirmButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButton: {
    height: 40,
    width: 120,
    marginVertical: 24,
    marginHorizontal: 12,
    backgroundColor: '#348EC5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmButtonText: {
    color: 'white',
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
  changePasswordButton: {
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
