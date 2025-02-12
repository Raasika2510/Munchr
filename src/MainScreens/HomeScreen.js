import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
    return (
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor="#FF3F00" />
  
        <View style={{ marginTop: 50, borderBottomWidth: 1, borderColor: 'grey' }}>
          <Text>Icon</Text>
          <Text>Location</Text>
        </View>
  
        <View style={{ height: 40, borderWidth: 0.6, borderColor: 'red', borderRadius: 25 }}>
          <Text>Search Bar</Text>
        </View>
  
        <View>
          <Text>Categories</Text>
          <Text>All Categories</Text>
        </View>
  
        <View>
          <Text>Slider (Offers for user, advertisements)</Text>
        </View>

        <View>
            <Text> Foods </Text>
        </View>
      </View>
    );
  };
  

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        height: '100%'
    }
})