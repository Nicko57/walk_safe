import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Map from "../screens/Map";
import AuthContainer from "./AuthContainer";
import SettingsContainer from "./SettingsContainer";
import NotificationsScreen from "../screens/NotificationsScreen";

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
      <Tab.Screen
        name="Home"
        component={Map}
        options={{ title: ""}}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: "" }}
      />
      <Tab.Screen
        name="Auth"
        component={AuthContainer}
        options={{ title: "" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsContainer}
        options={{ title: "" }}
      />
    </Tab.Navigator>
  );
}

export default NavbarContainer;
