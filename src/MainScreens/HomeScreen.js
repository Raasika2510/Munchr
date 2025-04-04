import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Headerbar from '../Components/Headerbar';
import AntDesign from '@expo/vector-icons/AntDesign';
import Categories from '../Components/Categories';
import OfferSlider from '../Components/OfferSlider';
import CardSlider from '../Components/CardSlider';
import theme from '../../theme';
import * as Location from 'expo-location'

// Firestore Imports
import { db } from '../Firebase/FirebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
    //const [status, requestPermission] = Location.useBackgroundPermissions();
    const [foodData, setFoodData] = useState([]);
    const [location, setLocationName] = useState(null);
    

    useEffect(() => {
        const foodDataQry = collection(db, 'FoodData'); 

        const unsubscribe = onSnapshot(foodDataQry, (snapshot) => {
            setFoodData(snapshot.docs.map(doc => doc.data()));
        });

        return () => unsubscribe(); 
    }, []);

    const requestLocationPermission = async () => {
       
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        // Permission granted, continue with obtaining the location
        getLocation()

    };

    useEffect(() => {
        requestLocationPermission()
    },[])

    const getLocation = async () => {
        try {
          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
     
          console.log('This is the real name of the location,', getLocationName(latitude,longitude) )

          // Do something with the latitude and longitude values
        } catch (error) {
          console.log('Error getting location:', error);
        }
      };

      const getLocationName = async (latitude, longitude) => {
        try {
          const geocode = await Location.reverseGeocodeAsync({
            latitude,
            longitude
          });
    
          if (geocode.length > 0) {
            const { city, country } = geocode[0];
            const locationName = `${city}, ${country}`;
            console.log('Your Current Location is:', city)
            setLocationName(locationName)
            return locationName;
          }
        } catch (error) {
          console.log('Error fetching location name:', error);
        }
    
        return null;
      };



    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={theme.colors.primary} />

            <Headerbar locationName ={location}/>
            <TouchableOpacity style={styles.searchbox}>
                <AntDesign name="search1" size={24} color={theme.colors.primary} />
                <Text style={styles.input}>Search</Text>
            </TouchableOpacity>
            <Categories />
            <OfferSlider />
            <CardSlider navigation={navigation} data={foodData} />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: theme.colors.background
    },
    searchbox: {
        flexDirection: 'row',
        width: '92%',
        backgroundColor: theme.colors.cardBackground,
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        alignSelf: 'center',
        elevation: 2,
        borderRadius: 20
    },
    input: {
        marginLeft: 10,
        width: '90%',
        fontSize: 16,
        color: theme.colors.placeholder,
        fontFamily: theme.fonts.regular
    }
});



