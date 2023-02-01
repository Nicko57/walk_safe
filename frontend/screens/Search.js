import React from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const GooglePlacesInput = ({setDestination, setStarted, setIsRunning}) => {

  return (
    <View style={styles.searchContainer}>
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        fetchDetails={true} // you need this to fetch the details object onPress
        placeholder="Search"
        query={{
          key: 'AIzaSyB01WnR0NuaVmUBTY-897JYHHizmMUc0ek',
          language: "en", // language of the results
        }}
        onPress={(data, details = null) => {
          console.log("data", data);
          console.log("details", details);
          console.log(JSON.stringify(details?.geometry?.location));
          setDestination(details?.geometry?.location)
          setStarted(false)
          setIsRunning(false)
        }}
        onFail={(error) => console.error(error)} />
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
  },
})

export default GooglePlacesInput

////this is a component not a screen



