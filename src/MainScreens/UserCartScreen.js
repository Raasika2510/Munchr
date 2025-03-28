import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';  // ✅ Fixed FlatList import
import React, { useEffect, useContext, useState } from 'react';
import theme from '../../theme';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../Firebase/FirebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';  // ✅ Added collection & getDocs import

const UserCartScreen = ({ navigation }) => {
    const { userloggeduid } = useContext(AuthContext);
    const [cartData, setCartData] = useState([]);
    const [cartAlldata, setCartAllData] = useState([]);
    const [foodAlldata, setFoodAllData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Cart Data
    const cardDataHandler = async () => {
        if (!userloggeduid) return;
        
        const docRef = doc(db, 'UserCart', userloggeduid);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log('Cart Data:', docSnap.data());
                setCartData(docSnap.data());
                setCartAllData(docSnap.data().cartItems || []);
            } else {
                console.log("No data found in UserCart");
                setCartData([]);
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
                        <Text>Your cart is empty!</Text>
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
                                                    <TouchableOpacity style={styles.containerCard_in3_btn}>
                                                        <Text style={styles.containerCard_in3_btn_txt}>Delete</Text>
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
            </View>
        </View>
    );
};

export default UserCartScreen;

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
});
