import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddEmergencyContact from "../modals/addEmergencyContact";
const AutocompleteSearchBox = ({ userId, setUpdated }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [newContact, setNewContact] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!searchTerm || searchTerm.length < 5) {
      setEmailList([]);
      return;
    }
    let response = fetch(
      `http://localhost:8080/api/user/contacts/search/${searchTerm}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmailList(data.data);
      })
      .catch((err) => console.error(err));
  }, [searchTerm]);
  const handleEmailPress = (email) => {
    setSearchTerm("");
    setNewContact(email);
    setViewModal(true);
  };
  const handleAdd = (email) => {
    fetch(`http://localhost:8080/api/user/contact`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        emergencyContactEmail: email,
        field: "add",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setTimeout(() => setError(false), 2000);
        }
        setUpdated(true);
        setViewModal(false);
      });
  };
  return (
    <View style={styles.searchBar}>
      <View>
        <Modal visible={viewModal}>
          <AddEmergencyContact
            setViewModal={setViewModal}
            handleAdd={handleAdd}
            newContact={newContact}
          />
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
        {emailList.length === 1 ? (
          <TouchableOpacity
            onPress={() => handleEmailPress(emailList[0].email)}
            style={styles.resultContainer}
          >
            <Text style={styles.resultText}>{emailList[0].email}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#E4D0FF",
    backgroundColor: "#ebe6ef",
    color: "#000000",
    borderRadius: 8,
    width: "75%",
    padding: 16,
    borderColor: "black",
    borderWidth: 1
  },
  searchBar: {
    marginTop: 5,
    padding: 10,
    fontSize: 22,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    width: 450,
    alignItems: "center",
  },
  newContact: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 10,
    width: 320,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  upButton: {
    fontSize: "100px",
    color: "green",
  },
  downButton: {
    fontSize: "100px",
    color: "red",
  },
  buttonText: {
    fontWeight: "bold",
    color: "blue",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: 100,
  },
  suggestionList: {
    position: "relative",
  },
  errorText: {
    color: "red",
  },
  modalText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#525252",
  },
  modalInnerContent: {
    backgroundColor: "#64C5F0",
    borderRadius: 10,
    padding: 10,
  },
  resultContainer: {
    backgroundColor: "white",
    opacity: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginVertical: 12,
    width: 300,
    paddingHorizontal: 15,
    position: "relative",
  },
  resultText: {
    fontSize: 18,
    color: "black",
  },
});
export default AutocompleteSearchBox;
