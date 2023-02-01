import React, { Component, useState, useEffect } from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import MapView from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import Search from './Search'

const GOOGLE_MAPS_APIKEY = 'AIzaSyB01WnR0NuaVmUBTY-897JYHHizmMUc0ek'

export default function Map() {
  const [destination, setDestination] = useState(null)
  const [location, setLocation] = useState(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return
      }

      let currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
      console.log(currentLocation)
    }
    getPermissions()
  }, [])

  return (
    <View style={styles.parent}>
      <View style={styles.child1}>
        <Search setDestination={setDestination} setStart={setStart}/>
      </View>
      <View style={styles.child2}>
        {start && (
          <MapView style={styles.map}>
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              destination={{
                latitude: destination.lat,
                longitude: destination.lng,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="hotpink"
              mode="WALKING"
            />
          </MapView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  child1: {
    flex: 1,
    width: '80%',
    margin: '10%',
  },
  child2: {
    flex: 90,
    width: '80%',
    margin: '10%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    width: '100%',
    padding: 16,
  },
})
