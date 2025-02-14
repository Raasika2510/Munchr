import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import theme from "../../theme";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";

const SignupNext = () => {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color={theme.colors.primary} />;
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={theme.colors.primary} />

            <View style={styles.titleContainer}>
                <Text style={styles.title}>USER PROFILE</Text>
            </View>

            <TextInput
                placeholder="User Name"
                style={styles.input}
                placeholderTextColor={theme.colors.placeholder}
            />
            <TextInput
                placeholder="Phone Number"
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor={theme.colors.placeholder}
            />
            <TextInput
                placeholder="Email ID"
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor={theme.colors.placeholder}
            />

            <TouchableOpacity style={styles.signupButton} onPress={() => alert("Welcome Aboard 😉")}>
                <Text style={styles.signupButtonText}>Become a Munchr</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupNext;

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
        borderColor: theme.colors.secondary,
        borderWidth: 1.5,
        borderRadius: 30,
        marginBottom: 20,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "white",
        elevation: 3,
        fontSize: 16,
        color: theme.colors.text,
        fontFamily: "Poppins_400Regular"
    },

    signupButton: {
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

    signupButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.buttonText,
        alignSelf: "center",
        letterSpacing: 1,
        fontFamily: "Poppins_700Bold"
    }
});
