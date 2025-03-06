import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../Firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    console.log("Navigation prop:", navigation);
    
    // Load fonts
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
    });

    const isLoading = !fontsLoaded;
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LoginHandler = async () => {
        if (email.trim() !== "" && password.trim() !== "") {
            try {
                const userCredentials = await signInWithEmailAndPassword(auth, email, password); // Use `auth`
                alert(`UID of User: ${userCredentials.user.uid}`);
            } catch (error) {
                console.log("Error: ", error.message);
                alert(`Login failed: ${error.message}`);
            }
        } else {
            alert("Email and password cannot be empty.");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#8B0000" />
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8B0000" />
                </View>
            ) : (
                <>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>LOGIN</Text>
                    </View>
                    <View style={styles.inputCont}>
                        <FontAwesome name="user" size={24} color="black" style={styles.icon} />
                        <TextInput
                            placeholder="Email"
                            keyboardType="email-address"
                            style={styles.input}
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputCont}>
                        <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            style={styles.input}
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginbutton} onPress={LoginHandler}>
                        <Text style={styles.loginbuttontext}>Login</Text>
                    </TouchableOpacity>
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>New to Munchr?</Text>
                        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("SignUp")}>
                            <Text style={styles.signupButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        marginBottom: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#8B0000'
    },
    inputCont: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
        width: '80%'
    },
    icon: {
        marginRight: 10
    },
    input: {
        flex: 1,
        fontSize: 16
    },
    loginbutton: {
        backgroundColor: '#8B0000',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 20
    },
    loginbuttontext: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    signupText: {
        fontSize: 16,
        marginRight: 5
    },
    signupButton: {
        borderBottomWidth: 1,
        borderBottomColor: '#8B0000'
    },
    signupButtonText: {
        color: '#8B0000',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default LoginScreen;
