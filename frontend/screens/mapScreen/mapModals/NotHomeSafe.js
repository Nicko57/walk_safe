import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const NotHomeSafe = ({ setViewNotHomeSafe }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setViewNotHomeSafe(false)}
      >
        <Ionicons name="close" size={40} color={"white"} />
      </TouchableOpacity>
      <View style={styles.modalMainContents}>
        <Text style={styles.header}>You didn't make it home!</Text>
        <Text style={styles.subheader}>
          Your emergency contacts have been notified
        </Text>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => Linking.openURL('tel:999')}
        >
          <Text>Press this button to call 999</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'red',
    color: "white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 46,
  },
  modalMainContents: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 70,
  },
  closeButton: {
    flex: 0.1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingRight: 24,
    marginLeft: 'auto',
  },
  header: {
    fontSize: 24,
    color: "white",
    fontWeight: 'bold',
    marginBottom: 25,
  },
  subheader: {
    fontSize: 20,
    color: "white",
    marginBottom: 25,
  },
  callButton: {
    marginTop: 10,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8
  },
})

export default NotHomeSafe
