import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

const AutocompleteSearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [emailList, setEmailList] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setEmailList([]);
      return;
    }
      let response = fetch(`http://localhost:8080/api/user/contacts/search/${searchTerm}`)
      .then(res => res.json()).then(data => {

        console.log(data) 
          console.log(data.data)
          console.log(data.emailList)
          setEmailList(data.data)})
      
      .catch(err => console.error(err));
      console.log(emailList)
  }, [searchTerm]);

  return (
    <View style={styles.searchBar}>
      <TextInput
      style={styles.textInput}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search email"
      />
      <FlatList
        data={emailList}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Text>{item.email}</Text>
        )}
      />
    </View>
  );
};



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
  }
})
export default AutocompleteSearchBox;
