import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { AuthContext } from '../Context/AuthContext';
import { useContext } from "react";

const AppNav = () => {


  const {userloggeduid, checkIsLogged} = useContext(AuthContext);
  
  useEffect(() => {
    checkIsLogged()
  }, [])
  console.log("From AppNav (UID",userloggeduid)
  return (
    <NavigationContainer>
      {userloggeduid ? 
      <AppStack /> 
      : 
      <AuthStack />
      }
      
    </NavigationContainer>
  );
};

export default AppNav;
