import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Map from "../screens/Map";
import NotificationsScreen from "../screens/NotificationsScreen";
import ContactsScreen from "../screens/ContactsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

function NavbarContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? "map" : "map-outline";
          } else if (rn === "Notifications") {
            iconName = focused ? "notifications-outline" : "notifications";
          } else if (rn === "Auth") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (rn === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (rn === "Contacts") {
            iconName = focused ? "people-circle-outline" : "people-circle";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={40} color={color} />;
        },
        tabBarActiveTintColor: "#348EC5",
        tabBarInactiveTintColor: "grey",
        // tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: [{ display: "flex", height: 110, padding: 10 }, null],
      })}
    >
      <Tab.Screen name="Home" component={Map} options={{ title: "" }} />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: "" }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: "" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
}

export default NavbarContainer;
