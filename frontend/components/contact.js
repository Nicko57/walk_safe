import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Contact = ({ item }) => {
  const deleteContact = () => {
    console.log('deleted');
  };

  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <Pressable onPress={() => deleteContact()}>
        <Ionicons name="trash-outline" />
      </Pressable>
    </View>
  );
};


export default Contact
