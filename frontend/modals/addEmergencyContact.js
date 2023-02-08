import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const AddEmergencyContact = ( { setViewModal, handleAdd, newContact } ) => {
  return (
      <View style={styles.addContactModal}>
        <Pressable style={styles.closeButton} onPress={() => setViewModal(false)}>
          <Ionicons name={'close'} size={36} color={'black'} />
        </Pressable>
        <View style={styles.modalMainContents}>
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>
            Add {newContact} as an emergency contact?
            </Text>
          </View>
          <View style={styles.confirmButtonContainer}>
            <Pressable style={styles.yesButton} onPress={() => handleAdd(newContact)}>
              <Text style={styles.yesButtonText}>YES</Text>
            </Pressable>
          </View>
          <View style={styles.confirmButtonContainer}>
            <Pressable style={styles.noButton} onPress={() => setViewModal(false)}>
              <Text style={styles.noButtonText}>NO</Text>
            </Pressable>
          </View>
        </View>
      </View>


  )
}

const styles = StyleSheet.create({
  addContactModal: {
    flex: 1,
    marginBottom: 100,
    marginTop: 46,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
    position: "relative"
  },
  closeButton: {
    flex: 0.1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingRight: 24,
    marginLeft: 'auto',
  },
  modalMainContents: {
    flex: 0.9,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
  },
  confirmButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmationContainer: {
    height: 60,
    width: 250,
  },
  confirmationText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  noButton: {
    height: 44,
    width: "75%",
    marginVertical: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF5151",
    alignItems: 'center',
    justifyContent: 'center',
  },
  noButtonText: {
    color: '#FF5151',
    fontSize: 16,
    fontWeight: '600',
  },
  yesButton: {
    height: 44,
    width: "75%",
    marginVertical: 16,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yesButtonText: {
    color: 'green',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default AddEmergencyContact
