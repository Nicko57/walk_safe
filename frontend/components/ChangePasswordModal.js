import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";

const ChangePasswordModal = ({ userId, changePasswordModalVisible, setChangePasswordModalVisible }) => {
  const [newPassword, setNewPassword] = useState(null);
  const [retypedPassword, setRetypedPassword] = useState(null);
  const [error, setError] = useState(null);
  
  const handleModal = () => {
    setNewPassword(null);
    setRetypedPassword(null);
    setError(null);
    setChangePasswordModalVisible(!changePasswordModalVisible);
  }

  const passwordInputHandler = (enteredText) => {
    setNewPassword(enteredText);
  }

  const retypedPasswordInputHandler = (enteredText) => {
    setRetypedPassword(enteredText);
  }

  const checkPasswordsAreValid = () => {
    // checks for errors not handled in backend (maybe move first one to backend)
    if (newPassword === null) {
      setError('All fields must be filled');
      console.log(error);
      return true;
    } else if (newPassword !== retypedPassword) {
      setError('Passwords do not match');
      console.log(error);
      return true;
    }
  }

  const handleChangePassword = async () => {      
    if (checkPasswordsAreValid() === true) return;
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
      
      if(response.status === 200) {
        console.log(data.message);
        handleModal();
      } else {
        setError(data.error);
        console.log('Error:', error);
      }
  }

  return (
    <Modal>
      <View style={styles.changePasswordModal}>
        <Pressable style={styles.closeButton} onPress={handleModal}>
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
  );
}

export default ChangePasswordModal;

const styles = StyleSheet.create({
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
