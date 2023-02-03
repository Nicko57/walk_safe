import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native'

const AutocompleteSearchBox = ({ userId, setUpdated }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [emailList, setEmailList] = useState([])
  const [newContact, setNewContact] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  useEffect(() => {
    if (!searchTerm || searchTerm.length < 3) {
      setEmailList([])
      return
    }
    let response = fetch(
      `http://localhost:8080/api/user/contacts/search/${searchTerm}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(data.data)
        console.log(data.emailList)
        setEmailList(data.data)
      })

      .catch((err) => console.error(err))
    console.log(emailList)
  }, [searchTerm])

  const handleEmailPress = (email) => {
    setSearchTerm('')
    setNewContact(email)
    setViewModal(true)
  }

  const handleAdd = (email) => {
    fetch(`http://localhost:8080/api/user/contact`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        emergencyContactEmail: email,
        field: 'add',
      }),
    }).then((response) => {
      console.log(response)
      setUpdated(true)
      setViewModal(false)
    })
  }

  return (
    <View style={styles.searchBar}>
      <View>
      <Modal visible={viewModal}>
        <View style={styles.modalContent}>
          <Text>Add {newContact} as an emergency contact?</Text>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Pressable onPress={() => handleAdd(newContact)}>
                <Text>Yes</Text>
              </Pressable>
            </View>

            <View style={styles.button}>
              <Pressable onPress={() => setViewModal(false)}>
                <Text>No</Text>
              </Pressable>
            
          </View>
        </View></View></Modal></View>
      <TextInput
        style={styles.textInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search email"
      />
      <View style={styles.suggestionList}>
      <FlatList
        data={emailList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleEmailPress(item.email)}>
            <Text>{item.email}</Text>
          </Pressable>
        )}
      />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#ADDEF3',
    color: '#000000',
    borderRadius: 8,
    width: '75%',
    padding: 16,
  },
  searchBar: {
    padding: 10,
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    width: 450,
    alignItems: 'center',
  },
  newContact: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    width: 320,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 50,
    width: 50,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 100
  },
  suggestionList: {
    zIndex: 2,
    position: 'relative'
  }
})
export default AutocompleteSearchBox
