import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

const DeleteAccountModal = ({
    userId,
    deleteAccountModalVisible,
    setDeleteAccountModalVisible,
    handleLogout
  }) => {

  const handleModal = () => {
    setDeleteAccountModalVisible(!deleteAccountModalVisible);
  }

  const handleDeleteAccount = async () => {
    handleLogout();

    let response = await fetch(`http://localhost:8080/api/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })

      let data = await response.json()

      if(response.status === 200) {
        console.log(data.message);
        handleModal();
      } else {
        console.log('Delete unsuccessful');
      }
  }
  
  return (
    <Modal>
    <View style={styles.deleteAccountModal}>
      <Pressable style={styles.closeButton} onPress={handleModal}>
        <Ionicons name={'close'} size={36} color={'white'} />
      </Pressable>
      <View style={styles.modalMainContents}>
        <View style={styles.warningMessageContainer}>
          <Text style={styles.warningText}>
            Are you sure you want to delete your account?
          </Text>
        </View>
        <View style={styles.confirmButtonContainer}>
          <Pressable style={styles.yesButton} onPress={handleDeleteAccount}>
            <Text style={styles.yesNoButtonText}>Yes</Text>
          </Pressable>
        </View>
        <View style={styles.confirmButtonContainer}>
          <Pressable style={styles.noButton} onPress={handleModal}>
            <Text style={styles.yesNoButtonText}>No</Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
  );
}
 
export default DeleteAccountModal;

const styles = StyleSheet.create({
  deleteAccountModal: {
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
  confirmButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  warningMessageContainer: {
    height: 60,
    width: 250,
  },
  warningText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  yesButton: {
    height: 44,
    width: 120,
    marginVertical: 10,
    backgroundColor: '#FF5151',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButton: {
    height: 44,
    width: 120,
    marginTop: 10,
    backgroundColor: '#33F18A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesNoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
