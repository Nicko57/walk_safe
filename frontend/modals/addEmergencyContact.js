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
    <View style={styles.modalContent}>
      <View style={styles.modalInnerContent}>
        <Text style={styles.modalText}>
          Add {newContact} as an emergency contact?
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => handleAdd(newContact)}>
            <Ionicons name="thumbs-up" style={styles.upButton} />
          </Pressable>
          <Pressable onPress={() => setViewModal(false)}>
            <Ionicons name="thumbs-down" style={styles.downButton} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  upButton: {
    fontSize: '100px',
    color: 'green',
  },
  downButton: {
    fontSize: '100px',
    color: 'red',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 100,
  },
  modalText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#525252',
  },
  modalInnerContent: {
    backgroundColor: '#64C5F0',
    borderRadius: 10,
    padding: 10,
  },
})

export default AddEmergencyContact
