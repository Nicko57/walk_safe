import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import {
  StyleSheet,
  View
} from 'react-native'
import Constant from 'expo-constants'


const Map = ({location, destination, GOOGLE_MAPS_APIKEY, calculateDuration, setDistance, mapRegion}) => {
  return ( 
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
                    calculateDuration(result.duration)
                  }}
                />
              </>
            )}
          </MapView>
        )}
      </View>
   );
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
    height: 400,
    margin: 10,
    marginTop: 35,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: "center"
  },
  journeyDetailsContainer: {
    flex: 0.3,
    color: "white"
  },
  journeyDetails: {
    fontSize: 22,
    marginHorizontal: 12,
  },
})


export default Map;