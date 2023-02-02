import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Map from './screens/Map';
import Search from './screens/Search';
import ProfileContainer from './navigation/ProfileContainer';
import SettingsContainer from './navigation/SettingsContainer';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Home") {
              iconName = focused ? 'map' : 'map-outline';
              
            } else if (rn === "Profile") {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            else if (rn === "Settings") {
              iconName = focused ? 'settings' : 'settings-outline';
            }



            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#348EC5',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: [
            { display: 'flex', height: 100 },
            null
          ]
        })}
      >
        <Tab.Screen name="Home" component={Map} />
        <Tab.Screen name="Profile" component={ProfileContainer} options={{ title: 'Profile' }} />
        <Tab.Screen name="Settings" component={SettingsContainer} options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
