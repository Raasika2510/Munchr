import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#8B0000' />

            <View style={{ paddingVertical: 12, width: '85%', alignSelf: 'center', marginBottom: 10 }}>
                <Text style={{ alignSelf: "center", fontSize: 28, fontWeight: '700', color: 'black', letterSpacing: 1 }}>
                    LOGIN
                </Text>
            </View>

            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#666"
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
                placeholderTextColor="#666"
            />

            <TouchableOpacity style={styles.loginbutton} onPress={() => alert('Login Successful!')}>
                <Text style={styles.loginbuttontext}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>New to Munchr?</Text>
                
                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff8f2', // Warm background
        width: '100%',
        paddingHorizontal: 20
    },

    input: {
        padding: 15,
        borderColor: '#B22222', // Deep red border for premium look
        borderWidth: 1.5,
        borderRadius: 30,
        marginBottom: 20,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 3, // Light shadow for depth
        fontSize: 16,
        color: '#333',
    },

    loginbutton: {
        backgroundColor: '#8B0000', // Deep maroon for a sophisticated feel
        borderRadius: 30,
        width: '85%',
        alignSelf: 'center',
        paddingVertical: 12,
        elevation: 5, // Stronger shadow for a floating effect
        shadowColor: '#8B0000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10
    },

    loginbuttontext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        letterSpacing: 1, // Stylish text spacing
    },

    signupContainer: {
        marginTop: 15,
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    signupText: {
        fontSize: 16,
        color: '#444'
    },

    signupButton: {
        backgroundColor: '#B22222', // Rich burgundy for signup button
        borderRadius: 25,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 4
    },

    signupButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
});
