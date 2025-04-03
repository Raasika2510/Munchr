import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React from 'react'
import theme from '../../theme';
  import { AuthContext } from '../Context/AuthContext';
import {firebase} from '../Firebase/FirebaseConfig'
import {useState, useEffect, useContext} from 'react';
import { db } from '../Firebase/FirebaseConfig';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import TrackOrderItems from '../Components/TrackOrderItems'

const TrackOrderScreen = ({navigation}) => {
  const { userloggeduid } = useContext(AuthContext);
  
  const [orders, setOrders] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [foodDataAll, setFoodDataAll] = useState([]);

  useEffect(() => {
    console.log("User UUID:", userloggeduid);
  }, [userloggeduid]);

  // ✅ Fetch User Orders
  const getOrders = async () => {
    if (!userloggeduid) {
      console.log("No user UUID found.");
      return;
    }

    try {
      console.log("Fetching orders for:", userloggeduid);
      
      const ordersRef = collection(db, "UserOrders");
      const q = query(ordersRef, where("userId", "==", userloggeduid));

      const querySnapshot = await getDocs(q);
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Orders:", ordersList);
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // ✅ Fetch Order Items
  const getOrdersItems = async () => {
    if (!userloggeduid) {
      console.log("No user UUID found.");
      return;
    }

    try {
      console.log("Fetching orders for:", userloggeduid);
      
      const ordersRef = collection(db, "OrderItems");
      const q = query(ordersRef, where("userId", "==", userloggeduid));

      const querySnapshot = await getDocs(q);
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Orders:", ordersList);
      setFoodData(ordersList);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  // ✅ Fetch All Food Data
  const getFoodDataAll = async () => {
    try {
      console.log("Fetching all food data...");
      
      const foodRef = collection(db, "FoodData"); // No userId filter
  
      const querySnapshot = await getDocs(foodRef);
      const foodList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      console.log("Fetched Food Data:", foodList);
      setFoodDataAll(foodList);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };
  

  useEffect(() => {
    getOrders();
  }, [userloggeduid]);

  useEffect(() => {
    getOrdersItems();
    getFoodDataAll();
  }, []);

  console.log("User Orders", orders);
  console.log("Order Items", foodData);
  console.log("Food Data", foodDataAll);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>

      <FlatList
  data={orders}
  keyExtractor={(order, index) => index.toString()} // Ensure keys are unique
  renderItem={({ item: order }) => (
    <View style={styles.mainContainer}>
      <Text style={styles.orderId}>Order id : {(order.orderid).substring(0,15)}</Text>
      <Text style={styles.orderTime}>Time : 4:10 AM </Text>
      <TrackOrderItems foodDataAll={foodDataAll} data={order.orderid} navigation={navigation} />
      <Text style={styles.orderTotal}>Total: Rs.{order.ordercost}</Text>
    </View>
  )}
/>
    </View>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 30,
  },
  closeText: {
    color: theme.colors.buttonText,
    fontFamily: theme.fonts.regular,
  },
  mainHeading: {
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text,
  },
  mainContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 2,
    backgroundColor: theme.colors.cardBackground,
    paddingVertical: 5,
    borderRadius: 20,
  },
  orderId: {
    fontSize: 18,
    color: theme.colors.placeholder,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  orderTime: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  orderTotal: {
    fontSize: 17,
    textAlign: 'right',
    marginVertical: 5,
    marginRight: 20,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  cardimage: {
    width: 90,
    height: 80,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
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
  orderItemContainer_2: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  orderItemName: {
    fontSize: 16,
    fontFamily: theme.fonts.semiBold,
    color: theme.colors.text,
  },
  orderPrice: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
  },
  orderQuantity: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.placeholder,
  },
});
