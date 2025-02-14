import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
const AppNav = () => {
  return (
    <NavigationContainer>
      {/* <AppStack />  */}
      <AuthStack />
    </NavigationContainer>
  );
};

export default AppNav;
