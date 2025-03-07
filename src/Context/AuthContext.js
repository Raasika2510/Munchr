import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [userloggeduid, setUserloggeduid] = useState(null)
  
  const userloggeduidHandler = (userid) => {
    setUserloggeduid(userid);
    AsyncStorage.setItem('userloggeduid',userid);
  }
  
  const checkIsLogged = async () => {
    try {
        const value = await AsyncStorage.getItem('userloggeduid');
        if (value !== null) {
            // console.log('User logged UID retrieved from AsyncStorage:', value);
            setUserloggeduid(value);
        } else {
            console.log('User logged UID not found in AsyncStorage');
        }
    } catch (error) {
        console.log('Error retrieving userloggeduid:', error);
    }
};


  console.log("From Context(UID",userloggeduid)
  const data1 = 'Context Data1'
  return <AuthContext.Provider value={{ data1, userloggeduid,userloggeduidHandler, checkIsLogged }}>
    {children}
    {/* {!loading && children } */}
</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
