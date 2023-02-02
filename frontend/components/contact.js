import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Contact = ({ name }) => (
  <View >
    <Text>{name}</Text>
    <Pressable onPress={() => console.log('deleted')}>
      <Ionicons name='trash-outline' />
    </Pressable>
  </View>
)

export default Contact
