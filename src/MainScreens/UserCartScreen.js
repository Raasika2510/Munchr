import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';  // ✅ Fixed FlatList import
import React, { useEffect, useContext, useState } from 'react';
import theme from '../../theme';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../Firebase/FirebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { updateDoc, arrayRemove, deleteField } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const UserCartScreen = ({ navigation }) => {
    const { userloggeduid } = useContext(AuthContext);
    const [cartData, setCartData] = useState([]);
    const [cartAlldata, setCartAllData] = useState([]);
    const [foodAlldata, setFoodAllData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [ItemCost, setItemCost] = useState('0')
    const [totalCost, setTotalCost] = useState('0')
    const [deliveryCharges, setDeliveryCharges] = useState('0')
    

    // Fetch Cart Data
   
    const cardDataHandler = async () => {
        if (!userloggeduid) return;
        
        const docRef = doc(db, 'UserCart', userloggeduid);
    
        try {
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists() && docSnap.data().cartItems) {
                console.log('Cart Data:', docSnap.data());
                setCartData(docSnap.data());
                setCartAllData(docSnap.data().cartItems);
            } else {
                console.log("No data found in UserCart");
                setCartData([]);
                setCartAllData([]);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch Food Data
    const foodDataHandler = async () => {
        try {
            const foodCollectionRef = collection(db, 'FoodData');
            const querySnapshot = await getDocs(foodCollectionRef);

            const foodItems = [];
            querySnapshot.forEach((doc) => {
                foodItems.push({ id: doc.id, ...doc.data() });
            });

            console.log('Food Data:', foodItems);
            setFoodAllData(foodItems);
        } catch (error) {
            console.error("Error fetching food data:", error);
        }
    };

    useEffect(() => {
        cardDataHandler();
        foodDataHandler();
    }, []);


    const DeleteButtonhandler = async (item) => {
        if (!userloggeduid) return;
        
        console.log("item no 1")
        const docRef = doc(db, 'UserCart', userloggeduid);
    
        try {
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const cartData = docSnapshot.data();
                
                if (cartData.cartItems && cartData.cartItems.length === 1) {
                    await updateDoc(docRef, { cartItems: deleteField() });
                    console.log("item no 2")
                } else {
                    await updateDoc(docRef, { cartItems: arrayRemove(item) });
                    console.log("item no 3")
                }

                cardDataHandler();
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };



    const TotalPriceHandler = () => {
        if (cartAlldata && cartAlldata.length > 0) {
            let totalfoodprice = 0;
            cartAlldata.forEach((item) => {
                totalfoodprice += parseInt(item.totalFoodPrice);
            });
            console.log("Total food price calculated:", totalfoodprice);
            setItemCost(totalfoodprice.toString());
            setTotalCost(totalfoodprice.toString());
        }
    };

    useEffect(() => {
        console.log("cartAlldata updated:", cartAlldata);
        if (!loading) {
            TotalPriceHandler();
        }
    }, [cartAlldata, loading]);


    console.log("item's dataa", ItemCost, totalCost, )
    
    useFocusEffect(
        React.useCallback(() => {
            cardDataHandler();
            TotalPriceHandler();
            console.log('Triggered Cart')
        }, [])
    );

    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: theme.colors.primary, paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 16, color: theme.colors.buttonText }}>Close</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={styles.containerHead}>My Cart</Text>

                <View style={styles.cartout}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : cartAlldata.length === 0 ? (
                        <Text style={{ marginHorizontal: 16, fontSize: 17, color: 'grey' }}>Your cart is empty!</Text>
                    ) : (
                        <FlatList
                            style={styles.FlatListCont}
                            data={cartAlldata}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                const nData = foodAlldata.find(food => food.id === item.item_id);
                                console.log('Cart item:', item);

                                return nData ? (
                                    <View style={styles.containerCardList}>
                                        <View style={styles.containerCard}>
                                            <Image source={require('../Images/spaghetti.jpg')} style={styles.cardimage} />
                                            
                                            <View style={styles.containerCard_in}>
                                                <View style={styles.containerCard_in1}>
                                                    <Text style={styles.text}>{nData.restaurant || 'Unknown Restaurant'}</Text>
                                                </View>

                                                <View style={styles.containerCard_in2}>
                                                    <Text style={styles.containerCard_in2_itemName}>{nData.FoodName || 'Item'}</Text>
                                                    <Text style={styles.containerCard_in2_itemPrice}>Rs.{nData.FoodPrice || 'N/A'} each</Text>
                                                    <Text style={styles.containerCard_in2_itemQty}>Qty: {item.FoodQuantity}</Text>
                                                </View>

                                                <View style={styles.containerCard_in3}>
                                                    <TouchableOpacity style={styles.containerCard_in3_btn} onPress={() => { DeleteButtonhandler(item) }} >
                                                        <Text style={styles.containerCard_in3_btn_txt}>Deletee </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ) : null;
                            }}
                        />
                    )}
                </View>
                
                {totalCost && totalCost !== '0' ?
                    <>
                    <View style = {{ marginTop: 10}}>
                        <View style={{
                            backgroundColor: 'white',
                            borderColor: 'grey',
                            borderRadius: 15,
                            width: '95%',
                            alignSelf: 'center',
                            marginVertical: 5,
                            paddingVertical: 5,
                            elevation:3                        
                        }}>
                        
                        <View style= {{flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center'}} >
                            <Text style= {{ fontWeight: '600'}}> Item Cost</Text>
                            <Text style= {{ fontWeight: '600'}}> ₹ {ItemCost} </Text>
                        </View>

                        <View style= {{flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center'}} >
                            <Text style= {{ fontWeight: '600'}}> Delivery Charges</Text>
                            <Text style= {{ fontWeight: '600'}}> ₹ {deliveryCharges} </Text>
                        </View>

                        <View style= {{flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center'}} >
                            <Text style= {{ fontWeight: '600'}}> Service Charges </Text>
                            <Text> ₹ 0 </Text>
                        </View>

                        </View>
                    
                    </View>

                    <View style= {styles.btnCont}>
                        <View style= {{flexDirection: 'row'}}>
                            <Text style= {{fontSize: 20, fontWeight: '600'}}> Total: </Text>
                            <Text style= {{fontSize: 20, fontWeight: '600', paddingLeft: 5}}> ₹ {totalCost} </Text>
                        </View>
                        <TouchableOpacity style={{backgroundColor:'#eb242e', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20}}>
                            <Text style={{fontSize: 17, fontWeight: '500', color: 'white'}} onPress={() => GoToPaymentPage()}> Place Order </Text>

                        </TouchableOpacity>

                    </View>
                    </>
                    :
                    null
                }
                
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.background
    },
    containerHead: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 5,
        marginLeft: 5,
        paddingHorizontal: 10,
        color: theme.colors.text,
        fontFamily: theme.fonts.bold
    },
    containerCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.cardBackground,
        marginVertical: 5,
        borderRadius: 25,
        width: '95%',
        alignSelf: 'center',
        elevation: 2,
        alignItems: 'center',
    },
    cardimage: {
        width: 100,
        height: 100,
        borderBottomLeftRadius: 25,
        borderTopLeftRadius: 25
    },
    containerCard_in: {
        flexDirection: 'column',
        margin: 5,
        width: '69%',
        alignItems: 'flex-end',
    },
    containerCard_in1: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 3,
        paddingVertical: 2,
        borderBottomWidth: 1,
    },
    containerCard_in2: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 3,
        paddingVertical: 2,
    },
    containerCard_in3: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 100,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
        marginVertical: 5,
        padding: 5,
        elevation: 2
    },
    containerCard_in2_itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        fontFamily: theme.fonts.semiBold
    },
    containerCard_in2_itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
        fontFamily: theme.fonts.regular
    },
    containerCard_in3_btn_txt: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.primary,
        fontFamily: theme.fonts.bold
    },
    btnCont :{
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        paddingHorizontal: 10,
        paddingTop: 10
    }
});


export default UserCartScreen;