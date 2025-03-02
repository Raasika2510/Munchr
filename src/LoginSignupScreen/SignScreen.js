import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import theme from "../../theme"; // Ensure `theme.js` exists and is correctly exported

const SignScreen = () => {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const auth = getAuth(); // Firebase authentication initialization

    const createAccountHandler = async () => {
        if (!email || !password || !cpassword) {
            alert("Please fill all the fields");
            return;
        }

        if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account created successfully:", userCredential.user.uid);
        } catch (error) {
            console.log("Error:", error.message);
            alert(error.message);
        }
    };

    if (!fontsLoaded) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={20} color={theme.colors.text} style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={theme.colors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color={theme.colors.text} style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={theme.colors.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color={theme.colors.text} style={styles.icon} />
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor={theme.colors.placeholder}
                    value={cpassword}
                    onChangeText={setCPassword}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={createAccountHandler}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

// ✅ Styles with Theme and Font Fixes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: theme.colors.background,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontFamily: "Poppins_700Bold",
        color: theme.colors.primary,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        backgroundColor: theme.colors.inputBackground,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        color: theme.colors.text,
    },
    icon: {
        marginRight: 10,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 35,
        borderRadius: 10,
        marginTop: 20,
        width: "90%",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        color: "#fff",
    },
});

export default SignScreen;
