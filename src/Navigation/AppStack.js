import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../MainScreens/HomeScreen';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name = "Home" component={HomeScreen} options={{headerShown: false}}/>
        {/* <Stack.Screen name = "Notifications" component={Notifications}/>
        <Stack.Screen name = "Profile" component={Profile}/>
        <Stack.Screen name = "Settings" component={Settings}/> */}
    </Stack.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})