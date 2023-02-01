import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View, Text, Button } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import Constant from 'expo-constants'
import Search from './Search'
import Timer from './countdownTimer'

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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search setDestination={setDestination} setIsRunning={setIsRunning} setStarted={setStarted}/>
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
                    console.log(`Distance: ${distance} km`)
                    console.log(`Duration: ${duration} min.`)
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
              ? `Duration: ${Math.round(
                  duration,
                )}mins      Distance: ${Math.round(10*distance)/10}km`
              : 'Search for a destination to start'}
          </Text>
        </View>
        <View style={styles.bottomContainerChild}>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button color="white" title="SOS" />
            </View>
            <View style={styles.button}>
              {started ? (
                <Timer duration={duration} isRunning={isRunning} />
              ) : (
                <Button
                  color="white"
                  title="Start journey"
                  onPress={startJourney}
                />
              )}
            </View>
            <View style={styles.button}>
              <Button color="white" title="Home safe" />
            </View>
          </View>
        </View>
        <View style={styles.bottomContainerChild}>
          <View style={styles.buttons}>
            <View style={styles.button}>
              {started && (
                <Button
                  color="white"
                  title={isRunning ? 'Pause' : 'Play'}
                  onPress={() => setIsRunning(!isRunning)}
                />
              )}
            </View>
          </View>
          <View style={styles.bottomContainerChild}>
            <Text>NAv bar will go in here</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
  searchContainer: {
    height: Constant.statusBarHeight,
    width: '100%',
    zIndex: 1,
  },
  mapContainer: {
    flex: 1,
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
    height: '80%',
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
    margin: 12
  },
})

export default Map
