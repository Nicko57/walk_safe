import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Modal,
  Pressable,
  Linking
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipelist from "react-native-swipeable-list-view";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState(null);
  const [notificationModalIsVisible, setNotificationModalIsVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const loadNotifications = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    let response = await fetch(
      `http://localhost:8080/api/user/notifications/${userId}`
    );

    let data = await response.json();

    if (response.status === 200) {
      setNotifications(data.notifications);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadNotifications();
    }, 60000);
    loadNotifications();
    return () => clearInterval(intervalId);
  }, []);

  const deleteNotification = async (index) => {
    const userId = await AsyncStorage.getItem("user_id");
    let response = await fetch(
      `http://localhost:8080/api/user/notifications/${userId}/${index}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data = await response.json();

    if (response.status === 200) {
      setNotifications(data.updatedNotifications);
    }
  };

  const handleRefresh = () => {
    loadNotifications();
  }

  const handleNotificationModal = () => {
    setNotificationModalIsVisible(!notificationModalIsVisible);
  }

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Notifications</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name="refresh-circle-outline" size={50} />
        </TouchableOpacity>
      </View>
      {notifications && (
        <ScrollView>
          <View style={styles.scrollViewContainer}>
            <Swipelist
              data={notifications}
              renderRightItem={(notifications, index) => (
                <View>
                  { !notifications.title.includes('got home safe') &&
                    <TouchableOpacity
                      key={index}
                      style={styles.notificationContainer}
                      onPress={() => {
                        setSelectedNotification(notifications);
                        handleNotificationModal();
                      }}
                    >
                      <View style={styles.textContainer}>
                        <Text style={styles.notificationTitle}>
                          {notifications.title}
                        </Text>
                        <Text style={styles.notificationMessage}>
                          {notifications.message}
                        </Text>
                      </View>
                      <View style={styles.timeContainer}>
                        <Text style={styles.notificationTime}>
                          {moment
                            .utc(notifications.timeSent)
                            .local()
                            .startOf("seconds")
                            .fromNow()}
                        </Text>
                      </View>
                      {notificationModalIsVisible && selectedNotification &&
                        <Modal>
                          <View style={styles.emergencyModal}>
                            <Pressable style={styles.closeButton} onPress={handleNotificationModal}>
                              <Ionicons name={'close'} size={36} color={'black'} />
                            </Pressable>
                            <View style={styles.modalMainContents}>
                              <Text style={styles.modalText}>{selectedNotification.name} didn't make it home!</Text>
                              <Text style={styles.lastLocationText}>Their last location:</Text>
                              <View style={styles.mapContainer}>
                                <Text>Map with latest location goes here</Text>
                              </View>
                              <TouchableOpacity
                                style={styles.callButton}
                                onPress={() => Linking.openURL(`tel:${selectedNotification.phoneNumber}`)}
                              >
                                <Text style={styles.callButtonText}>Call {selectedNotification.name}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.callButton}
                                onPress={() => Linking.openURL('tel:999')}
                              >
                                <Text style={styles.callButtonText}>Call 999</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                      }
                    </TouchableOpacity>
                  }
                  { notifications.title.includes('got home safe') &&
                    <View key={index} style={styles.notificationContainer}>
                      <View style={styles.textContainer}>
                        <Text style={styles.notificationTitle}>
                          {notifications.title}
                        </Text>
                        <Text style={styles.notificationMessage}>
                          {notifications.message}
                        </Text>
                      </View>
                      <View style={styles.timeContainer}>
                        <Text style={styles.notificationTime}>
                          {moment
                            .utc(notifications.timeSent)
                            .local()
                            .startOf("seconds")
                            .fromNow()}
                        </Text>
                      </View>
                    </View>
                  }
                </View>
              )}
              renderHiddenItem={(notifications, index) => (
                <View style={styles.rightAction}>
                  <TouchableOpacity
                    onPress={() => {
                      deleteNotification(index);
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
      )}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 50,
    borderBottomWidth: 1,
    borderColor: "#64C5F0",
    backgroundColor: "white",
    zIndex: 1,
    flexDirection: "row",
  },
  titleText: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
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
    marginRight: "auto",
  },
  timeContainer: {
    marginTop: 17,
    marginBottom: "auto",
    marginLeft: "auto",
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
    fontWeight: "600",
  },
  emergencyModal: {
    flex: 1,
    marginTop: 46,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
  },
  closeButton: {
    flex: 0.1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingRight: 20,
    marginLeft: 'auto',
  },
  modalMainContents: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 70,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
    alignSelf: 'center',
  },
  lastLocationText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
    // alignSelf: 'left',
  },
  mapContainer: {
    height: 500,
    width: 400,
    margin: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    width: 400,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  callButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
});
