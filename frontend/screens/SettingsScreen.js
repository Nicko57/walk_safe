import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangePasswordModal from '../components/ChangePasswordModal';
import DeleteAccountModal from '../components/DeleteAccountModal';

function SettingsScreen({ navigation }) {
  const [userId, setUserId] = useState(null);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  
  const retrieveUserId = async () => {
    const value = await AsyncStorage.getItem('user_id');
    setUserId(value);
    console.log('userId: ', value);
  };
  retrieveUserId();

  const handleChangePasswordModal = () => {
    setChangePasswordModalVisible(!changePasswordModalVisible);
  }
  
    const handleDeleteAccountModal = () => {
      setDeleteAccountModalVisible(!deleteAccountModalVisible);
    }

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Auth');
  }

  return (
    <View style={styles.globalContainer}>
      {changePasswordModalVisible &&
        <ChangePasswordModal
          userId={userId}
          changePasswordModalVisible={changePasswordModalVisible}
          setChangePasswordModalVisible={setChangePasswordModalVisible}
        />
      }
      {deleteAccountModalVisible &&
        <DeleteAccountModal
          userId={userId}
          deleteAccountModalVisible={deleteAccountModalVisible}
          setDeleteAccountModalVisible={setDeleteAccountModalVisible}
          handleLogout={handleLogout}
        />
      }
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Settings</Text>
      </View>
      <View style={styles.nameContainer}>
        {/* Add logo instead of text below once finalised */}
        <Text style={styles.nameText}>Get Home Safe</Text>
      </View>
      <View style={styles.aboutUsContainer}>
        <Text style={styles.aboutUsTitle}>About the app</Text>
        <Text style={styles.aboutUsText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Congue mauris rhoncus aenean vel elit scelerisque mauris. Risus nec feugiat in fermentum posuere urna. Id nibh tortor id aliquet lectus proin. Nisl purus in mollis nunc sed id. Neque vitae tempus quam pellentesque nec nam aliquam.
        </Text>
      </View>
      <Pressable style={styles.button} onPress={handleChangePasswordModal}>
        <Text style={styles.buttonText}>Change password</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
      <Pressable onPress={handleDeleteAccountModal}>
        <Text style={styles.deleteAccountText}>
          Delete Account
        </Text>
      </Pressable>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
    backgroundColor: "#64C5F0",
  },
  titleContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 50,
    borderBottomWidth: 1,
    borderColor: "#64C5F0",
    backgroundColor: 'white',
  },
  titleText: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: "center",
    fontSize: 20,
    fontWeight: '500',
    margin: 16,
  },
  nameContainer: {
  },
  nameText: {
    fontSize: 38,
    fontWeight: '600',
    color: '#ffffff',
  },
  aboutUsContainer: {
    height: 300,
    width: 300,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: '#ffffff',
    borderRadius: 30,
  },
  aboutUsTitle: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 14,
  },
  aboutUsText: {
    fontSize: 16
  },
  button: {
    width: 300,
    height: 44,
    backgroundColor: '#348EC5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  deleteAccountText: {
    color: 'salmon',
    fontSize: 16,
    fontWeight: '600',
  },
});
