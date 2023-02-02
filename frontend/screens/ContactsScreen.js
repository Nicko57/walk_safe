import { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  FlatList,
  StatusBar,
  TextInput,
  Button,
} from 'react-native'
import Contact from '../components/contact'

const ContactsScreen = () => {
  const [error, setError] = useState(null)
  const [contacts, setContacts] = useState(null)


  useEffect(() => {
    console.log('Hello')
      let response = fetch('http://localhost:8080/api/user/contacts/63dbf2dbe7c83add97179bf9', {
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    }).then(response => response.json() )
    .then(async data => {
    //   console.log(data);
    //   if(response.status !== 200) {
    //     setError(response);
    //     console.log('Error:', error);
    //   } else {
    //   console.log(data.emergencyContacts)
    //   setContacts(data.emergencyContacts)
    // }
    console.log(data.emergencyContacts);
    setContacts(data.emergencyContacts)
    })
  },[])








  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.textInput}
          placeholder="Search by email..."
          // onChangeText={contactInputHandler}
          // value={contactEmail}
        />
      </View>
      <View style={styles.contactsList}>
        <SafeAreaView style={styles.contactsListContainer}>
          {contacts && <FlatList
            data={contacts}
            renderItem={({ item }) => <Contact item={item} />}
            keyExtractor={(item) => item.id}
          />}
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    backgroundColor: '#64C5F0',
    marginTop: StatusBar.currentHeight || 0,
  },
  searchBar: {
    padding: 10,
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    width: 500,
    alignItems: 'center',
  },
  contactsList: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    flex: 5,
    width: '100%',
    alignItems: 'center',
  },
  contact: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 700,
  },
  title: {
    fontSize: 32,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#ADDEF3',
    color: '#000000',
    borderRadius: 8,
    width: '75%',
    padding: 16,
  },
  contactsListContainer: {
    flex: 1
  }
})

export default ContactsScreen



