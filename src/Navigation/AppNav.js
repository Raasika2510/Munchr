// AppNav.js
import { StyleSheet } from 'react-native';
import React from 'react';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../MainScreens/HomeScreen';
import AppStack from './AppStack';

const AppNav = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
