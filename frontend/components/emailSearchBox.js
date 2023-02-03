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
import Ionicons from 'react-native-vector-icons/Ionicons'

const AutocompleteSearchBox = ({ userId, setUpdated }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [emailList, setEmailList] = useState([])
  const [newContact, setNewContact] = useState(null)
  const [viewModal, setViewModal] = useState(false)
  const [error, setError] = useState(null)
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
        setEmailList(data.data)
      })

      .catch((err) => console.error(err))
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
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setTimeout(() => setError(false), 2000)
        }
        setUpdated(true)
        setViewModal(false)
      })
  }

  return (
    <View style={styles.searchBar}>
      <View>
        <Modal visible={viewModal}>
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
        </Modal>
      </View>
      <TextInput
        style={styles.textInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search email"
      />
      {error && (
        <View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
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
  suggestionList: {
    zIndex: 2,
    position: 'relative',
  },
  errorText: {
    color: 'red',
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
export default AutocompleteSearchBox
