import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../MainScreens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Home1') {
            iconName = 'person';
          } else if (route.name === 'Home2') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: styles.tabBarLabel
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Home1" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Home2" component={HomeStack} options={{ headerShown: false }} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default AppStack;


const styles = StyleSheet.create({
  tabBar: {
    height: 55,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'grey'
  },
  tabBarLabel:{
    paddingBottom: 5
  }
});
