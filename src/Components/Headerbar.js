import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const Headerbar = ({navigation, locationName}) => {
  return (
            <View style={styles.container}>
              <TouchableOpacity style={{flexDirection: 'row'}}>
              <Entypo name="location-pin" size={28} color="black" style={{paddingVertical: 6}}/>
              <View style={{paddingHorizontal: 5}}>
                <View>
                <Text style={{paddingRight: 3, fontSize: 16, fontWeight: '700'}}>Location</Text>
                </View>
                
                {
                  locationName ? <Text>{locationName}</Text>
                  : 
                  <Text>Chennai</Text>

                }
              </View>
              
              </TouchableOpacity>
              
            </View>
  )
}

export default Headerbar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 30,
        borderBottomWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})