import React from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
const data1 = 'Context Data1'
  return <AuthContext.Provider value={{ data1 }}>
    {children}
    {/* {!loading && children } */}
</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
