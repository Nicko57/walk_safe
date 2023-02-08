import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Constant from "expo-constants";
import Timer from "./countdownTimer";

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
      {distance ? (
        <>
          <View style={styles.journeyDetailsContainer}>
            <Text style={styles.journeyText}>{`${Math.round(
              duration
            )}mins`}</Text>
            {/* to help space out the journey and duration */}
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.journeyText}>{`${
              Math.round(10 * distance) / 10
            }km`}</Text>
          </View>
        </>
      ) : (
        <View style={styles.journeyReminderContainer}>
          <Text style={styles.journeyReminderText}>
            Search for a destination to begin
          </Text>
        </View>
      )}

      <View style={styles.bottomContainerChild}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.sosButton}
            onPress={() => {
              handleSOSbutton();
            }}
            disabled={!started}
          >
            <Text style={{ color: "red", fontSize: 30 }}>SOS</Text>
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
                <Text style={{ color: "black", fontSize: 30 }}>Start</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleHomeSafe();
            }}
            disabled={!started}
          >
            <Text style={{ color: "green", fontSize: 30 }}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MapButtons;

const styles = StyleSheet.create({
  bottomContainerChild: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 0.5,
    marginBottom: 4,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    height: "170%",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "green",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    color: "#007aff",
    shadowColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 4,
  },
  sosButton: {
    flex: 1,
    width: "30%",
    height: "170%",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 4,
    marginHorizontal: 10,
  },
  centerButton: {
    flex: 1,
    width: "30%",
    height: "170%",
    borderRadius: 8,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    color: "#007aff",
    shadowColor: "black",
    // borderWidth: 1,
    // borderColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 4,
  },
  journeyDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderColor: "black",
    // borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 5,
  },
  journeyText: {
    fontSize: 20,
    color: "black",
  },
  journeyReminderContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    // borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 3,
    padding: 10,
  },
  journeyReminderText: {
    fontSize: 20,
  },
});
