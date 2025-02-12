// AuthStack.js
import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../LoginSignupScreen/LoginScreen';
import SignScreen from '../LoginSignupScreen/SignScreen';
import SignupNext from '../LoginSignupScreen/SignupNext';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SignUpNext" component={SignupNext} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default AuthStack;

const styles = StyleSheet.create({});
