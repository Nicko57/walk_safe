import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import Constant from 'expo-constants'
import Search from './Search'
import Timer from './countdownTimer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const GOOGLE_MAPS_APIKEY = 'AIzaSyB01WnR0NuaVmUBTY-897JYHHizmMUc0ek'

const Map = () => {
  const [destination, setDestination] = useState(null)
  const [location, setLocation] = useState(null)
  const [duration, setDuration] = useState(null)
  const [distance, setDistance] = useState(null)
  const [mapRegion, setMapRegion] = useState(null)
  const [started, setStarted] = useState(false)
  const [addedTime, setAddedTime] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return
      }

      let currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
      const { width, height } = Dimensions.get('window')
      const ASPECT_RATIO = width / height
      const LATITUDE_DELTA = 0.02
      const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
    }
    getPermissions()
  }, [])

  useEffect(() => {
    if (destination) {
      const { latitude, longitude } = location.coords
      const { lat, lng } = destination

      const minLat = Math.min(latitude, lat)
      const maxLat = Math.max(latitude, lat)
      const minLng = Math.min(longitude, lng)
      const maxLng = Math.max(longitude, lng)

      setMapRegion({
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: maxLat - minLat + 0.015,
        longitudeDelta: maxLng - minLng + 0.015,
      })
    }
  }, [destination, addedTime])

  const increaseDuration = (time) => {
    setDuration((prevDuration) => prevDuration + time)
  }

  const startJourney = () => {
    setStarted(true)
    setIsRunning(true)
  }

  const sendSOSNotification = async (userId, data) => {
    for (const contact of data.emergencyContacts) {
      await fetch('https://app.nativenotify.com/api/indie/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subID: `${contact.id}`,
          appId: 6193,
          appToken: 'rWR1WMqaI8HcWYDUZQFStS',
          title: `${userId} hit SOS!!!`,
          message: 'Get in touch ASAP!!!',
        }),
      })
      await fetch(
        `http://localhost:8080/api/user/notifications/${contact.id}/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notification: {
              title: `Someone hit SOS!`,
              message: `${contact.id} hit SOS get in touch!!`,
              timeSent: new Date(),
            },
          }),
        },
      )
    }
  }

  const sendSafeNotification = async (userId, data) => {
    for (const contact of data.emergencyContacts) {
      await fetch('https://app.nativenotify.com/api/indie/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subID: `${contact.id}`,
          appId: 6193,
          appToken: 'rWR1WMqaI8HcWYDUZQFStS',
          title: `${userId} got home safe`,
          message: 'All good',
        }),
      })
      await fetch(
        `http://localhost:8080/api/user/notifications/${contact.id}/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notification: {
              title: `Someone got home safe!`,
              message: `${contact.id} got home safe`,
              timeSent: new Date(),
            },
          }),
        },
      )
    }
  }

  const handleSOSbutton = async () => {
    const userId = await AsyncStorage.getItem('user_id')
    // got to map through emergency contacts
    let response = await fetch(
      `http://localhost:8080/api/user/contacts/${userId}`,
    )
    let data = await response.json()
    if (response.status === 200) {
      sendSOSNotification(userId, data)
      setStarted(false)
    }
  }

  const handleHomeSafe = async () => {
    const userId = await AsyncStorage.getItem('user_id')
    let response = await fetch(
      `http://localhost:8080/api/user/contacts/${userId}`,
    )
    let data = await response.json()
    if (response.status === 200) {
      sendSafeNotification(userId, data)
      setStarted(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search
          setDestination={setDestination}
          setIsRunning={setIsRunning}
          setStarted={setStarted}
        />
      </View>
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.map}
            region={mapRegion}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
          >
            {destination && (
              <>
                <Marker
                  coordinate={{
                    latitude: destination.lat,
                    longitude: destination.lng,
                  }}
                  title="Destination"
                ></Marker>
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
                  onReady={(result) => {
                    setDistance(result.distance)
                    setDuration(result.duration)
                  }}
                />
              </>
            )}
          </MapView>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.journeyDetailsContainer}>
          <Text style={styles.journeyDetails}>
            {distance
              ? `Duration: ${Math.round(duration)}mins      Distance: ${
                  Math.round(10 * distance) / 10
                }km`
              : 'Search for a destination to start'}
          </Text>
        </View>
        <View style={styles.bottomContainerChild}>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleSOSbutton()
              }}
              disabled={!started}
            >
              <Text style={{ color: 'white' }}>SOS</Text>
            </TouchableOpacity>

            <View style={styles.button}>
              {started && destination ? (
                <TouchableOpacity onPress={() => setIsRunning(!isRunning)}>
                  <Timer
                    duration={duration}
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    setStarted={setStarted}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={startJourney}>
                  <Text>Start Journey</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleHomeSafe()
              }}
              disabled={!started}
            >
              <Text style={{ color: 'white' }}>Home Safe</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainerChild}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    paddingTop: 40,
    marginBottom: 10,
  },
  searchContainer: {
    height: Constant.statusBarHeight,
    width: '100%',
    zIndex: 1,
  },
  mapContainer: {
    flex: 3,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContainer: {
    flex: 1,
  },
  bottomContainerChild: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  button: {
    flex: 1,
    width: '30%',
    height: '170%',
    backgroundColor: '#348EC5',
    borderRadius: 15,
    margin: 5,
    justifyContent: 'center',
  },
  journeyDetailsContainer: {
    flex: 0.3,
  },
  journeyDetails: {
    fontSize: 22,
    marginHorizontal: 12,
  },
})

export default Map
