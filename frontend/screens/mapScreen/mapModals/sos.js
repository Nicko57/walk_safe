import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'

const SOS = ({ setViewSOS }) => {
  return (
    <View style={styles.modalContent}>
      <Text style={styles.header}>You hit the SOS button!</Text>
      <Text style={styles.subheader}>
        Your emergency contacts have been notified
      </Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setViewSOS(false)}
      >
        <Text>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.callButton}
        onPress={() => Linking.openURL('tel:999')}
      >
        <Text>Press this button to call 999</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'red',
    color: "white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: "white",
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    color: "white"
  },
  callButton: {
    padding: 10,
    color: "white"
  },
})

export default SOS
