import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Alert } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import theme from '../../theme';
import { AuthContext } from '../Context/AuthContext'; 
import { db } from '../Firebase/FirebaseConfig';
import { doc, getDoc, collection, getDocs, updateDoc, arrayRemove, deleteField, setDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth } from 'firebase/auth'; 


const UserCartScreen = ({ navigation }) => {
    const { userloggeduid } = useContext(AuthContext);
    const [cartData, setCartData] = useState({});
    const [cartAlldata, setCartAllData] = useState([]);
    const [foodAlldata, setFoodAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ItemCost, setItemCost] = useState('0');
    const [totalCost, setTotalCost] = useState('0');
    const [deliveryCharges, setDeliveryCharges] = useState('0');
    const [paymentpage, setPaymentPage] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const auth = getAuth(); // ADD THIS
const userEmail = auth.currentUser?.email || '';

    // Fetch Cart Data
    const cardDataHandler = async () => {
        if (!userloggeduid) return;
        
        const docRef = doc(db, 'UserCart', userloggeduid);
    
        try {
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists() && docSnap.data().cartItems) {
                setCartData(docSnap.data());
                setCartAllData(docSnap.data().cartItems);
            } else {
                setCartData({});
                setCartAllData([]);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
            Alert.alert("Error", "Failed to load cart data");
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

            setFoodAllData(foodItems);
        } catch (error) {
            console.error("Error fetching food data:", error);
            Alert.alert("Error", "Failed to load menu items");
        }
    };

    const DeleteButtonhandler = async (item) => {
        if (!userloggeduid) return;
        
        const docRef = doc(db, 'UserCart', userloggeduid);
    
        try {
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const cartData = docSnapshot.data();
                
                if (cartData.cartItems && cartData.cartItems.length === 1) {
                    await updateDoc(docRef, { cartItems: deleteField() });
                } else {
                    await updateDoc(docRef, { cartItems: arrayRemove(item) });
                }
                setCartAllData([]);
                await cardDataHandler();
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            Alert.alert("Error", "Failed to remove item from cart");
        }
    };

    const TotalPriceHandler = () => {
        if (cartAlldata && cartAlldata.length > 0) {
            let totalfoodprice = 0;
            cartAlldata.forEach((item) => {
                totalfoodprice += parseInt(item.totalFoodPrice);
            });
            setItemCost(totalfoodprice.toString());
            setTotalCost(totalfoodprice.toString());
        } else {
            setItemCost('0');
            setTotalCost('0');
        }
    };

    const deleteCart = async () => {
        const docRef = doc(db, 'UserCart', userloggeduid);
        try {
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                await updateDoc(docRef, { cartItems: deleteField() });
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    };
    
    const recreateOrderItems = async (orderId, orderItems) => {
        try {
            const orderItemsRef = doc(db, "OrderItems", orderId);
            await setDoc(orderItemsRef, {
                items: orderItems,
                recreatedAt: new Date().toISOString(),
            });
            console.log("✅ OrderItems document recreated successfully.");
        } catch (error) {
            console.error("❌ Error recreating OrderItems:", error);
        }
    };

    const PlaceNow = async () => {
        try {
            console.log("🛒 Placing order...");
    
            if (!userloggeduid) {
                Alert.alert("Error", "User not logged in. Please log in again.");
                return;
            }
    
            const docid = `${Date.now()}_${userloggeduid}`;
            const cDate = new Date().toISOString();
    
            const orderDocRef = doc(db, "UserOrders", docid);
            const orderItemsDocRef = doc(db, "OrderItems", docid);
    
            const updatedCartData = {
                items: cartData.cartItems?.map(item => ({
                    ...item,
                    orderId: docid,
                    orderDate: cDate,
                })) || [],
                createdAt: cDate,
            };
            const orderItemsSnapshot = await getDoc(orderItemsDocRef);
    
            if (orderItemsSnapshot.exists()) {
                await updateDoc(orderItemsDocRef, updatedCartData);
            } else {
                await setDoc(orderItemsDocRef, updatedCartData);
            }
            await setDoc(orderDocRef, {
                orderid: docid,
                orderstatus: "Pending",
                ordercost: totalCost,
                orderdate: cDate,
                userpayment: "COD",
                paymenttotal: "",
                userId: userloggeduid,
            }, { merge: true });

            await deleteCart();

            console.log("Sending email to:", userEmail);

try {
  const response = await fetch('http://192.168.1.4:3001/send-order-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      toEmail: userEmail,
      orderId: docid,
      orderItems: cartData.cartItems,
      totalCost: totalCost,
    }),
  });

  const resultText = await response.text();

  try {
    const result = JSON.parse(resultText);
    console.log("Email response:", result);
  } catch (jsonError) {
    console.error("JSON parsing error:", jsonError.message);
    console.log("Raw response:", resultText);
  }
} catch (error) {
  console.error("Order placement error:", error);
}

    
            console.log("Order placed successfully!");
            Alert.alert("Order Successful", "Your order has been placed successfully!");
    
            setTimeout(() => {
                navigation.navigate("Home");
            }, 1000);
        } catch (error) {
            console.error("Order placement error:", error);
            Alert.alert("Order Failed", "Failed to place order. Please try again.");
        }
    };


    useEffect(() => {
        cardDataHandler();
        foodDataHandler();
    }, []);

    useEffect(() => {
        if (!loading) {
            TotalPriceHandler();
        }
    }, [cartAlldata, loading]);

    useFocusEffect(
        React.useCallback(() => {
            cardDataHandler();
        }, [])
    );

    if (paymentpage) {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.paymentHeader}>
                    <TouchableOpacity onPress={() => setPaymentPage(false)}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.paymentContainer}>
                    <View>
                        <Text style={styles.sectionTitle}>Payment Options</Text>
                        <TouchableOpacity style={styles.paymentOptionButton}>
                            <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.deliverySection}>
                        <Text style={styles.sectionTitle}>Delivery Location</Text>
                        <TouchableOpacity style={styles.locationButton}>
                            <Text style={styles.locationButtonText}>Current Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.locationButton, styles.changeLocationButton]}>
                            <Text style={styles.locationButtonText}>Change Location</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.placeOrderSection}>
                        <TouchableOpacity 
                            style={styles.placeOrderButton}
                            onPress={PlaceNow}
                            disabled={isPlacingOrder}
                        >
                            <Text style={styles.placeOrderButtonText}>
                                {isPlacingOrder ? 'Processing...' : 'Place Order'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Text style={styles.containerHead}>My Cart</Text>

                <View style={styles.cartout}>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : cartAlldata.length === 0 ? (
                        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
                    ) : (
                        <FlatList
                            data={cartAlldata}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => {
                                const foodItem = foodAlldata.find(food => food.id === item.item_id);
                                
                                return foodItem ? (
                                    <View style={styles.containerCardList}>
                                        <View style={styles.containerCard}>
                                            {/* <Image source={require('../Images/spaghetti.jpg')} style={styles.cardimage} /> */}
                                            <Image source={{ uri: foodItem.image }} style={styles.cardimage} />
                                            
                                            <View style={styles.containerCard_in}>
                                                <View style={styles.containerCard_in1}>
                                                    <Text style={styles.restaurantText}>
                                                        {foodItem.restaurant || 'Thaba Restaurant'}
                                                    </Text>
                                                </View>

                                                <View style={styles.containerCard_in2}>
                                                    <Text style={styles.foodNameText}>{foodItem.FoodName}</Text>
                                                    <Text style={styles.foodPriceText}>Rs.{foodItem.FoodPrice} each</Text>
                                                    <Text style={styles.foodQuantityText}>Qty: {item.FoodQuantity}</Text>
                                                </View>

                                                <View style={styles.containerCard_in3}>
                                                    <TouchableOpacity 
                                                        style={styles.deleteButton}
                                                        onPress={() => DeleteButtonhandler(item)}
                                                    >
                                                        <Text style={styles.deleteButtonText}>Delete</Text>
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
                
                {totalCost !== '0' && (
                    <>
                        <View style={styles.summaryContainer}>
                            <View style={styles.summaryCard}>
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Item Cost</Text>
                                    <Text style={styles.summaryValue}>₹ {ItemCost}</Text>
                                </View>

                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Delivery Charges</Text>
                                    <Text style={styles.summaryValue}>₹ {deliveryCharges}</Text>
                                </View>

                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Service Charges</Text>
                                    <Text style={styles.summaryValue}>₹ 0</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.checkoutContainer}>
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalText}>Total:</Text>
                                <Text style={styles.totalAmount}>₹ {totalCost}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.placeOrderButtonMain}
                                onPress={() => setPaymentPage(true)}
                                disabled={cartAlldata.length === 0}
                            >
                                <Text style={styles.placeOrderButtonMainText}>
                                    {cartAlldata.length === 0 ? 'Cart Empty' : 'Place Order'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: 30,
    },
    paymentHeader: {
        backgroundColor: '#D32F2F',
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: 30,
    },
    closeText: {
        fontSize: 16,
        color: theme.colors.buttonText,
        
    },
    container: {
        flex: 1,
        paddingBottom: 20,
    },
    containerHead: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 15,
        marginLeft: 15,
        color: theme.colors.text,
        fontFamily: theme.fonts.bold,
    },
    emptyCartText: {
        marginHorizontal: 16,
        fontSize: 17,
        color: 'grey',
        textAlign: 'center',
        marginTop: 20,
    },
    containerCardList: {
        marginBottom: 10,
    },
    containerCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.cardBackground,
        marginVertical: 5,
        borderRadius: 15,
        width: '95%',
        alignSelf: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardimage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    containerCard_in: {
        flex: 1,
        padding: 10,
    },
    containerCard_in1: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingBottom: 5,
        marginBottom: 5,
    },
    restaurantText: {
        fontSize: 14,
        color: '#666',
        fontFamily: theme.fonts.medium,
    },
    containerCard_in2: {
        marginBottom: 5,
    },
    foodNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        fontFamily: theme.fonts.semiBold,
    },
    foodPriceText: {
        fontSize: 14,
        color: theme.colors.text,
        fontFamily: theme.fonts.regular,
    },
    foodQuantityText: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        backgroundColor: theme.colors.background,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    deleteButtonText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.medium,
    },
    summaryContainer: {
        marginTop: 15,
        paddingHorizontal: 15,
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        elevation: 3,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 15,
        fontFamily: theme.fonts.medium,
    },
    summaryValue: {
        fontSize: 15,
        fontFamily: theme.fonts.semiBold,
    },
    checkoutContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 15,
        marginBottom: 20,
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalText: {
        fontSize: 18,
        fontFamily: theme.fonts.semiBold,
    },
    totalAmount: {
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        marginLeft: 5,
    },
    placeOrderButtonMain: {
        backgroundColor: '#D32F2F',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    placeOrderButtonMainText: {
        color: 'white',
        fontSize: 16,
        fontFamily: theme.fonts.semiBold,
    },
    paymentContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10,
        marginLeft: 5,
    },
    paymentOptionButton: {
        backgroundColor: '#D32F2F',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    paymentOptionText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    deliverySection: {
        marginTop: 20,
        paddingBottom: 30,
    },
    locationButton: {
        backgroundColor: '#D32F2F',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 10,
    },
    changeLocationButton: {
        backgroundColor: '#D32F2F',
    },
    locationButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
      
    placeOrderSection: {
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
        paddingTop: 20,
    },
    placeOrderButton: {
        backgroundColor: '#D32F2F',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    placeOrderButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    },
});

export default UserCartScreen;