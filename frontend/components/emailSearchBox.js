import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';

const AutocompleteSearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [emailList, setEmailList] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setEmailList([]);
      return;
    }
  //   useEffect(() => {
  //     let response = fetch(, {
  //   }).then(response => response.json() )
  //   .then(async data => {
  //   setUpdated(false)
  //   setContacts(data.emergencyContacts)
  //   })
  // },[updated])

      console.log(searchTerm)
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
    <View>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search email"
      />
      {emailList.length > 0 && <FlatList
        data={emailList}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Text>{item.email}</Text>
        )}
      />}
    </View>
  );
};

export default AutocompleteSearchBox;
