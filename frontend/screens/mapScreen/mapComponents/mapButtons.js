import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Constant from 'expo-constants'
import Timer from './countdownTimer'

const MapButtons = ({
  distance,
  duration,
  handleSOSbutton,
  started,
  setStarted,
  destination,
  isRunning,
  setIsRunning,
  setViewTimeOut,
  setDestination,
  startJourney,
  handleHomeSafe,
}) => {
  return (
    <>
      <View style={styles.journeyDetailsContainer}>
        {distance ? (
          <>
            <Text style={styles.journeyText}>{`${Math.round(duration)}mins`}</Text>
            <Text style={styles.journeyText}>{`${Math.round(10 * distance) / 10}km`}</Text>
          </>
        ) : (
          <Text style={{fontSize: 20}}>Search for a destination to begin</Text>
        )}
      </View>
      <View style={styles.bottomContainerChild}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={() => {
              handleSOSbutton()
            }}
            disabled={!started}
          >
            <Text style={{ color: 'white', fontSize: 50 }}>SOS</Text>
          </TouchableOpacity>

          <View style={styles.centerButton}>
            {started && destination ? (
              <TouchableOpacity onPress={() => setIsRunning(!isRunning)}>
                <Timer
                  duration={duration}
                  isRunning={isRunning}
                  setIsRunning={setIsRunning}
                  setStarted={setStarted}
                  setViewTimeOut={setViewTimeOut}
                  setDestination={setDestination}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startJourney}>
                <Text style={{ color: 'white', fontSize: 44 }}>Start</Text>
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
            <Text style={{ color: 'white', fontSize: 40 }}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default MapButtons

const styles = StyleSheet.create({
  bottomContainerChild: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 0.5,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    height: '170%',
    backgroundColor: '#2eb82e',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#007aff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  sosButton: {
    flex: 1,
    width: '30%',
    height: '170%',
    backgroundColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginHorizontal: 10,
  },
  centerButton: {
    flex: 1,
    width: '30%',
    height: '170%',
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#007aff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  journeyDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  journeyText: {
    fontSize: 20,
    color: "white"
  },
})
