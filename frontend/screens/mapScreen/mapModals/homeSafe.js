import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native'

const HomeSafe = ({ setViewHomeSafe }) => {
  return (
    <View style={styles.modalContent}>
      <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWVRlfbwP4fr4V0uEM_MSa7k2CQPJEeWb86A&usqp=CAU" }} style={styles.houseIcon} />
      <Text style={styles.header}>You got home safe!</Text>
      <Text style={styles.subheader}>
        Your emergency contacts have been notified - take it easy!
      </Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setViewHomeSafe(false)}
      >
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#90EE90',
    color: "black",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseIcon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    color: "black",
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  subheader: {
    fontSize: 20,
    color: "black",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    color: "black"
  },
  callButton: {
    padding: 10,
    color: "black"
  },
})

export default HomeSafe


