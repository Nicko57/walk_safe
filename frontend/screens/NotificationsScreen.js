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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Notifications</Text>
        </View>
        <Swipelist
          data={data}
          renderRightItem={(data, index) => (
            <View key={index} style={styles.innerContainer}>
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
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: "#64C5F0",
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
    margin: 16,
  },
  innerContainer: {
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
