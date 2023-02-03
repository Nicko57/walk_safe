import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";

import Swipelist from "react-native-swipeable-list-view";
import moment from "moment";

const App = () => {
  const data = [
    {
      title: "Will is walking home",
      message: "30 minutes until Will should arrive home",
      timeSent: "2023-02-02 16:00:24"
    },
    {
      title: "Will is home safe",
      message: "Will is home with 5 minutes to spare",
      timeSent: "2023-02-02 13:00:24"
    },
    {
      title: "Andy is walking home",
      message: "45 minutes until Andy should arrive home",
      timeSent: "2023-02-02 12:00:24"
    },
    {
      title: "SOS: Andy is in trouble",
      message: "Andy pressed the SOS button, they need help!",
      timeSent: "2023-02-02 11:00:24"
    },
    {
      title: "Will is walking home",
      message: "30 minutes until Will should arrive home",
      timeSent: "2023-02-01 12:00:24"
    },
    {
      title: "Will is home safe",
      message: "Will is home with 5 minutes to spare",
      timeSent: "2023-02-01 10:00:24"
    },
    {
      title: "Andy is walking home",
      message: "45 minutes until Andy should arrive home",
      timeSent: "2023-01-28 12:00:24"
    },
    {
      title: "SOS: Andy is in trouble",
      message: "Andy pressed the SOS button, they need help!",
      timeSent: "2023-01-25 12:00:24"
    },
    {
      title: "Will is walking home",
      message: "30 minutes until Will should arrive home",
      timeSent: "2023-01-23 12:00:24"
    },
    {
      title: "Will is home safe",
      message: "Will is home with 5 minutes to spare",
      timeSent: "2023-01-17 12:00:24"
    },
    {
      title: "Andy is walking home",
      message: "45 minutes until Andy should arrive home",
      timeSent: "2023-01-16 12:00:24"
    },
    {
      title: "SOS: Andy is in trouble",
      message: "Andy pressed the SOS button, they need help!",
      timeSent: "2023-01-05 12:00:24"
    },
  ];

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Notifications</Text>
      </View>
      <ScrollView>
        <View style={styles.scrollViewContainer}>
          <Swipelist
            data={data}
            renderRightItem={(data, index) => (
              <View key={index} style={styles.notificationContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.notificationTitle}>{data.title}</Text>
                  <Text style={styles.notificationMessage}>{data.message}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.notificationTime}>
                    {moment
                      .utc(data.timeSent)
                      .local()
                      .startOf("seconds")
                      .fromNow()}
                  </Text>
                </View>
              </View>
            )}
            renderHiddenItem={(data, index) => (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.rightAction}
                  onPress={() => {
                    // delete notification
                  }}
                >
                  <Text style={styles.rightActionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={200}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  titleContainer: {
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 50,
    borderBottomWidth: 1,
    borderColor: "#64C5F0",
    backgroundColor: 'white',
    zIndex: 1,
  },
  titleText: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: "center",
    fontSize: 20,
    fontWeight: '500',
    margin: 16,
  },
  scrollViewContainer: {
    marginTop: 106,
    zIndex: 0,
  },
  notificationContainer: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: "#64C5F0",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.85,
    // elevation: 5,
  },
  textContainer: {
    marginRight: 'auto',
  },
  timeContainer: {
    marginTop: 17,
    marginBottom: "auto",
    marginLeft: 'auto',
  },
  notificationTitle: {
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: "600",
  },
  notificationMessage: {
    paddingVertical: 4,
    fontSize: 16,
  },
  notificationTime: {
    float: "right",
  },
  rightAction: {
    backgroundColor: "red",
    width: "100%",
    height: 80,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.85,
    // elevation: 5,
  },
  rightActionText: {
    color: "white",
    fontWeight: '600',
  },
});
