import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AccountAndSettings = () => {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'#8B0000', paddingVertical:10, paddingHorizontal:10, marginTop:30}}>
              <Text style={{color:'white'}}>Account and Settings </Text>
        </View>

        <View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext}>Profile </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext}>Edit Profile </Text>
            </TouchableOpacity>
        </View>

        <View style={{flex:1}}>
        <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutButtontext}> Log Out </Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default AccountAndSettings

const styles = StyleSheet.create({
    container: {
        flex:1,
        //padding:16,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#8B0000', 
        borderRadius: 25,
        width: '93%',
        alignSelf: 'center',
        paddingVertical: 12,
        elevation: 5,
        marginTop:10
    },
    buttontext: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center'
    },
    logoutButton:{
        position:'absolute',
        left:0,
        bottom:0,
        padding:15
    },
    logoutButtontext:{
        color:'#4e4e4e',
        fontSize:16,
        fontWeight:'bold'
    }
})