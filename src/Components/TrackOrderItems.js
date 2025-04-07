import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import {firebase} from '../Firebase/FirebaseConfig'
import { db } from '../Firebase/FirebaseConfig';
import { collection, query, where, getDocs, onSnapshot, doc } from 'firebase/firestore';
import theme from '../../theme';

const TrackOrderItems = ({ foodDataAll, data, navigation }) => {
    const { userloggeduid } = useContext(AuthContext);
    const [orderData, setOrderData] = useState([]);


    const [user, setUser] = useState([]);

    const getuserData = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUser(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserData();
    }, [userloggeduid]);

    // console.log('user is ', user.totalCoin - 5)

    useEffect(() => {
        if (!data) {
            console.log("No order ID provided.");
            return;
        }

        console.log("Fetching Order Items for Order ID:", data);

        // Reference to the specific order document
        const orderDocRef = doc(db, "OrderItems", data);

        // Listening for real-time updates
        const unsubscribe = onSnapshot(orderDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                console.log("Fetched Order Items:", docSnapshot.data());
                setOrderData(docSnapshot.data().items || []);
            } else {
                console.log("No Order Items Found");
                setOrderData([]);
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [data]);

    const getData = (id) => {
        const nData = foodDataAll.filter((items) => items.id === id)
        return nData;
    }

    console.log("Order Items:",orderData);
    return (
        <>
        <View>
            
            {/* <Text>Ye dekh veer</Text> */}

            {orderData && orderData.map((order, index) => (
                 <View key={index} 
                //  style={{ borderRadius: 20, backgroundColor: '#f2f2f2', width: '95%', alignSelf: 'center', marginVertical: 2, elevation: 2 }}
                 >

    
                 <FlatList

                     data={getData(order.item_id)}

                     renderItem={
                         ({ item }) => {
                             return (
                                 <View style={styles.orderItemContainer}>
                                     <View>
                                         <Image source={require('../Images/indian.jpg')} style={styles.cardimage} />
                                     </View>

                                     <View style={styles.orderItemContainer_2}>
                                         <View>
                                             <Text style={styles.orderItemName}>{item.FoodName}</Text>
                                             <Text style={styles.orderItemPrice} >${item.FoodPrice}</Text>
                                             <Text>Qty : {order.FoodQuantity} unit </Text>

                                         </View>
                                     </View>
                                 </View>
                             )
                         }
                     }


                 />
             </View>
            ))}
        </View>
        </>
    )

    }




export default TrackOrderItems

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: 30,
    },
    orderItemContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
        marginVertical: 2,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 2,
        padding: 10,
      },
    cardimage: {
        width: 90,
        height: 80,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20
    },
    orderItemContainer_2: {
        paddingHorizontal: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    orderItemName: {
        fontSize: 16,
        fontWeight: '600'
    },
})