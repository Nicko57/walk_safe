import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Button, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";

function SettingsScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [retypedPassword, setRetypedPassword] = useState(null);
  const [error, setError] = useState(null);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  
  const retrieveUserId = async () => {
    const value = await AsyncStorage.getItem('user_id');
    setUserId(value);
    // console.log('userId: ', value);
  };
  // retrieveUserId() currently runs every time the user types a character in the
  // new password field - probably best to put this function call in a useEffect
  // hook once merged and the full logout code is put in this file
  retrieveUserId();

  const handleChangePasswordModal = () => {
    setNewPassword(null);
    setRetypedPassword(null);
    setChangePasswordModalVisible(!changePasswordModalVisible);
  }

  const passwordInputHandler = (enteredText) => {
    setNewPassword(enteredText);
  }

  const retypedPasswordInputHandler = (enteredText) => {
    setRetypedPassword(enteredText);
  }

  const handleChangePassword = async () => {      
    if (newPassword !== retypedPassword) {
      setError('Passwords do not match');
      console.log(error);
      return;
    }
    
    setError(null);

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
      
      console.log('Fetch request ran');

      if(response.status === 200) {
        console.log(data.message);
        handleChangePasswordModal();
      } else {
        setError(data.error);
        console.log('Error:', error);
      }
  }

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Auth');
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
              <Ionicons name={'close'} size={36} color={'white'} />
            </Pressable>
            <View style={styles.modalMainContents}>
              <Text style={styles.passwordLabel}>New password:</Text>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry={true}
                onChangeText={passwordInputHandler}
                value={newPassword}
              />
              <Text style={styles.passwordLabel}>Re-type password:</Text>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry={true}
                onChangeText={retypedPasswordInputHandler}
                value={retypedPassword}
              />
              {/* Add a conditional error div here for if there is an error when changing password, e.g., doesn't match or not strong enough */}
              {error &&
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              }
              <View style={styles.confirmButtonContainer}>
                <Pressable style={styles.confirmButton} onPress={handleChangePassword}>
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      }
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Settings</Text>
      </View>
      <View style={styles.nameContainer}>
        {/* Or add our app logo instead of name */}
        <Text style={styles.nameText}>Will Jones</Text>
      </View>
      <View style={styles.aboutUsContainer}>
        <Text style={styles.aboutUsTitle}>About the app</Text>
        <Text style={styles.aboutUsText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue mauris rhoncus aenean vel elit scelerisque mauris. Risus nec feugiat in fermentum posuere urna. Id nibh tortor id aliquet lectus proin. Nisl purus in mollis nunc sed id. Neque vitae tempus quam pellentesque nec nam aliquam.
        </Text>
      </View>
      <Pressable style={styles.button} onPress={handleChangePasswordModal}>
        <Text style={styles.buttonText}>Change password</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
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
    justifyContent: 'space-between',
    paddingBottom: 50,
    backgroundColor: "#64C5F0",
  },
  titleContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 50,
    borderBottomWidth: 1,
    borderColor: "#64C5F0",
    backgroundColor: 'white',
  },
  titleText: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: "center",
    fontSize: 20,
    fontWeight: '500',
    margin: 16,
  },
  nameContainer: {
  },
  nameText: {
    fontSize: 38,
    fontWeight: '600',
    color: '#ffffff',
  },
  aboutUsContainer: {
    height: 300,
    width: 300,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: '#ffffff',
    borderRadius: 30,
  },
  aboutUsTitle: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 14,
  },
  aboutUsText: {
    fontSize: 16
  },
  button: {
    width: 300,
    height: 44,
    backgroundColor: '#348EC5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteAccountText: {
    color: 'salmon',
    fontSize: 16,
    fontWeight: '600',
  },
  changePasswordModal: {
    flex: 1,
    marginBottom: 100,
    marginTop: 106,
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
    marginBottom: 10,
    alignSelf: 'center',
  },
  passwordInput: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    height: 40,
    width: 200,
    paddingHorizontal: 10,
    marginBottom: 30,
    fontSize: 20,
  },
  errorContainer: {
    marginBottom: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    backgroundColor: '#eeeeee'
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D238FF',
  },
  confirmButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButton: {
    height: 44,
    width: 120,
    marginTop: 10,
    backgroundColor: '#348EC5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
