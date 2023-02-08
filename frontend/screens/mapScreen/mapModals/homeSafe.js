import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeSafe = ({ setViewHomeSafe }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setViewHomeSafe(false)}
      >
        <Ionicons name="close" size={40} color={"black"} />
      </TouchableOpacity>
      <View style={styles.modalMainContents}>
        {/* <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWVRlfbwP4fr4V0uEM_MSa7k2CQPJEeWb86A&usqp=CAU" }} style={styles.houseIcon} /> */}
        <Text style={styles.header}>You got home safe!</Text>
        <Text style={styles.subheader}>
          Your emergency contacts have been notified - take it easy!
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#00FF7F',
    color: "black",
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
    marginBottom: 90,
  },
  closeButton: {
    flex: 0.1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingRight: 24,
    marginLeft: 'auto',
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
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  subheader: {
    fontSize: 20,
    color: "black",
    marginBottom: 25,
    paddingHorizontal: 20,
    textAlign: "center"
  },
  callButton: {
    padding: 10,
    color: "black"
  },
})

export default HomeSafe


