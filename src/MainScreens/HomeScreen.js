import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Headerbar from '../Components/Headerbar';
import AntDesign from '@expo/vector-icons/AntDesign';
import Categories from '../Components/Categories';
import OfferSlider from '../Components/OfferSlider';
import CardSlider from '../Components/CardSlider';
import theme from '../../theme';

// Firestore Imports
import { db } from '../Firebase/FirebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
    const [foodData, setFoodData] = useState([]);

    useEffect(() => {
        const foodDataQry = collection(db, 'FoodData'); 

        const unsubscribe = onSnapshot(foodDataQry, (snapshot) => {
            setFoodData(snapshot.docs.map(doc => doc.data()));
        });

        return () => unsubscribe(); 
    }, []);

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={theme.colors.primary} />

            <Headerbar />
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



