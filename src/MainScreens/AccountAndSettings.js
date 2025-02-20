import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import theme from '../../theme';

const AccountAndSettings = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
              <Text style={styles.headerText}>Account and Settings</Text>
        </View>

        <View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext}>Edit Profile</Text>
            </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutButtontext}>Log Out</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default AccountAndSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 30
    },
    headerText: {
        color: theme.colors.buttonText,
        fontSize: 18,
        fontFamily: theme.fonts.bold
    },
    button: {
        backgroundColor: theme.colors.primary, 
        borderRadius: 25,
        width: '93%',
        alignSelf: 'center',
        paddingVertical: 12,
        elevation: 5,
        marginTop: 10
    },
    buttontext: {
        fontSize: 17,
        color: theme.colors.buttonText,
        alignSelf: 'center',
        fontFamily: theme.fonts.semiBold
    },
    logoutButton: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        padding: 15
    },
    logoutButtontext: {
        color: theme.colors.text,
        fontSize: 16,
        fontFamily: theme.fonts.bold
    }
});
