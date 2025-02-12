// AppNav.js
import { StyleSheet } from 'react-native';
import React from 'react';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';

const AppNav = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
