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

  const contacts = [
    {name: 'bill', _id: '1'},{name:'Bob', _id:'2'}
  ]








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
          <FlatList
            data={contacts}
            renderItem={({ item }) => <Contact name={item.name} />}
            keyExtractor={(item) => item._id}
          />
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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Contact A',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Contact B',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Contact C',
  },
]



