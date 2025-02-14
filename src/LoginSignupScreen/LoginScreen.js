import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import theme from "../../theme";

const LoginScreen = ({ navigation  }) => {
    console.log("Navigation prop:", navigation);
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#8B0000" />;
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#8B0000" />

            {/* Login Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>LOGIN</Text>
            </View>

            {/* Email Input */}
            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#666"
            />

            {/* Password Input */}
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor="#666"
            />

            {/* Login Button */}
            <TouchableOpacity style={styles.loginbutton} onPress={() => alert("Login Successful!")}>
                <Text style={styles.loginbuttontext}>Login</Text>
            </TouchableOpacity>

            {/* Signup Section */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>New to Munchr?</Text>
                
                <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("SignUp")}>
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
        justifyContent: "center",
        backgroundColor: theme.colors.background,
        width: "100%",
        paddingHorizontal: 20
    },
    titleContainer: {
        paddingVertical: 12,
        width: "85%",
        alignSelf: "center",
        marginBottom: 10
    },
    title: {
        alignSelf: "center",
        fontSize: 28,
        fontWeight: "700",
        color: theme.colors.text,
        letterSpacing: 1,
        fontFamily: "Poppins_700Bold"
    },
    input: {
        padding: 15,
        borderColor: theme.colors.primary,
        borderWidth: 1.5,
        borderRadius: 30,
        marginBottom: 20,
        width: "90%",
        alignSelf: "center",
        backgroundColor: theme.colors.cardBackground,
        elevation: 3,
        fontSize: 16,
        color: theme.colors.text,
        fontFamily: "Poppins_400Regular"
    },
    loginbutton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 30,
        width: "85%",
        alignSelf: "center",
        paddingVertical: 12,
        elevation: 5,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10
    },
    loginbuttontext: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.buttonText,
        alignSelf: "center",
        letterSpacing: 1,
        fontFamily: "Poppins_400Regular"
    },
    signupContainer: {
        marginTop: 15,
        width: "95%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    signupText: {
        fontSize: 16,
        color: theme.colors.text,
        fontFamily: "Poppins_400Regular"
    },
    signupButton: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 4
    },
    signupButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.buttonText,
        fontFamily: "Poppins_600SemiBold"
    }
});
