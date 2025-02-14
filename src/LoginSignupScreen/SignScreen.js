import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import theme from "../../theme";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";

const SignScreen = ({ navigation }) => {
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
                <Text style={styles.title}>SIGN UP</Text>
            </View>

            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor={theme.colors.placeholder}
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={true}
                placeholderTextColor={theme.colors.placeholder}
            />
            <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                secureTextEntry={true}
                placeholderTextColor={theme.colors.placeholder}
            />

            <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUpNext')}>
                <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already a Munchr?</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignScreen;

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

    signUpButton: {
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

    signUpButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.buttonText,
        alignSelf: "center",
        letterSpacing: 1,
        fontFamily: "Poppins_700Bold"
    },

    loginContainer: {
        marginTop: 15,
        width: "95%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    loginText: {
        fontSize: 16,
        color: theme.colors.text,
        fontFamily: "Poppins_400Regular"
    },

    loginButton: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 25,
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 4
    },

    loginButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.buttonText,
        fontFamily: "Poppins_600SemiBold"
    }
});
