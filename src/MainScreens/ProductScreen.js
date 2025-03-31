import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, Alert, TextInput } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import theme from '../../theme';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Notification Configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ProductScreen = ({ navigation, route }) => {
  const { userloggeduid } = useContext(AuthContext);
  const [quantity, setQuantity] = useState('1');
  const [expoPushToken, setExpoPushToken] = useState(null);

  const data = route.params;

  useEffect(() => {
    const registerForPushNotifications = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          console.log('Failed to get push token for push notification!');
          return;
        }

        const projectId = '9aef5ea8-3b08-46af-82e8-24339e38221e';
        const token = (
          await Notifications.getExpoPushTokenAsync({ projectId })
        ).data;
        console.log(`Expo Push Token: ${token}`);
        setExpoPushToken(token);
      } else {
        console.log('Must use a physical device for Push Notifications');
      }
    };

    registerForPushNotifications();
  }, []);

  const showAlert = (message) => {
    Alert.alert('Cart Update', message, [{ text: 'OK' }]);
  };

  const sendPushNotification = async (message) => {
    if (!expoPushToken) {
      console.error('Expo Push Token not available');
      return;
    }

    const messageBody = {
      to: expoPushToken,
      sound: 'default',
      title: 'Cart Update',
      body: message,
      data: { screen: 'CartScreen' },
    };

    try {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageBody),
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const AddtoCartHandler = async () => {
    console.log('✅ AddtoCartHandler triggered');

    if (parseInt(quantity, 10) <= 0) {
      showAlert('Quantity must be greater than 0');
      sendPushNotification('Quantity must be greater than 0');
      return;
    }

    const date = new Date().getTime().toString();
    const userCartRef = doc(db, 'UserCart', userloggeduid);

    const foodData = {
      item_id: data.id,
      FoodQuantity: parseInt(quantity, 10),
      userid: userloggeduid,
      cartItemId: date + userloggeduid,
      totalFoodPrice: parseInt(data.FoodPrice) *  parseInt(quantity),
    };

    try {
      const docSnap = await getDoc(userCartRef);

      if (docSnap.exists()) {
        const cartItems = docSnap.data().cartItems || [];

        const existingItemIndex = cartItems.findIndex((item) => item.item_id === data.id);

        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].FoodQuantity += parseInt(quantity, 10);

          await updateDoc(userCartRef, { cartItems });
          showAlert('Quantity updated in cart');
          sendPushNotification('Quantity updated in cart');
        } else {
          await updateDoc(userCartRef, {
            cartItems: arrayUnion(foodData),
          });
          showAlert('Item added to cart');
          sendPushNotification('Item added to cart');
        }
      } else {
        await setDoc(userCartRef, { cartItems: [foodData] });
        showAlert('Cart created and item added');
        sendPushNotification('Cart created and item added');
      }
    } catch (error) {
      console.error('❌ Firestore error:', error);
      showAlert('Failed to add item to cart');
      sendPushNotification('Failed to add item to cart');
    }
  };

  const IncreaseQuantityHandler = () => {
    setQuantity((parseInt(quantity) + 1).toString());
  };

  const DecreaseQuantityHandler = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.headerText}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerIn}>
        <View style={styles.containerIn1}>
          <Image source={require('../Images/indian.jpg')} style={styles.cardimage} />
        </View>

        <View style={styles.containerIn2}>
          <View style={styles.containerIn2_s1}>
            <Text style={styles.containerIn2_s1_foodname}>{data.FoodName}</Text>
            <Text style={styles.containerIn2_s1_foodprice}>Rs. {data.FoodPrice}</Text>
          </View>

          <View style={styles.containerIn2_s2}>
            <Text style={styles.containerIn2_s2_head}>About item:</Text>
            <Text style={styles.containerIn2_s2_description}>
              Mozzarella cheese pizza is a classic favorite known for its gooey, stretchy cheese and rich, savory flavor.
            </Text>
            <Text style={styles.containerIn2_s2_veg}>VEG</Text>
          </View>

          <View style={styles.containerIn2_s3}>
            <Text style={styles.containerIn2_s3_restaurantnameheading}>Restaurant Name:</Text>
            <Text style={styles.containerIn2_s3_restaurantname}>Papa John's Pizza</Text>
          </View>

          <View style={styles.containerIn2_s4}>
            <Text style={styles.containerIn2_s4_heading}>Quantity:</Text>
            <View style={styles.containerIn2_s4_QuantityCont}>
              <Text style={styles.containerIn2_s4_QuantityCont_MinusText} onPress={DecreaseQuantityHandler}>-</Text>
              <TextInput style={styles.containerIn2_s4_QuantityCont_TextInput} value={quantity} />
              <Text style={styles.containerIn2_s4_QuantityCont_PlusText} onPress={IncreaseQuantityHandler}>+</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerIn3}>
          <TouchableOpacity style={styles.containerIn3_buybtn} onPress={AddtoCartHandler}>
            <Text style={styles.containerIn3_buybtn_text}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    width: '100%',
    height: '100%'
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 25
  },
  headerText: {
    color: theme.colors.buttonText,
    fontSize: 16,
    fontFamily: theme.fonts.medium
  },
  containerIn: {
    backgroundColor: theme.colors.background
  },
  containerIn1: {
    width: '100%',
    height: 220,
    backgroundColor: theme.colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardimage: {
    width: '100%',
    height: '100%'
  },
  containerIn2: {
    width: '100%',
    padding: 20,
    position: 'relative',
    top: -30,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerIn2_s1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  containerIn2_s1_foodname: {
    fontSize: 25,
    fontFamily: theme.fonts.bold,
    width: 220,
    marginRight: 10
  },
  containerIn2_s1_foodprice: {
    fontSize: 26,
    fontFamily: theme.fonts.bold
  },
  containerIn2_s2: {
    backgroundColor: theme.colors.cardBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20
  },
  containerIn2_s2_head: {
    fontSize: 18,
    fontFamily: theme.fonts.bold
  },
  containerIn2_s2_description: {
    paddingTop: 10,
    fontSize: 15,
    fontFamily: theme.fonts.regular
  },
  containerIn2_s2_veg: {
    backgroundColor: theme.colors.success,
    color: theme.colors.buttonText,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    width: 70,
    textAlign: 'center',
    marginTop: 5
  },
  containerIn2_s3: {
    backgroundColor: theme.colors.secondaryBackground,
    width: '100%',
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 2,
    alignItems: 'center'
  },
  containerIn2_s3_restaurantnameheading: {
    color: theme.colors.textSecondary,
    fontSize: 20,
    fontFamily: theme.fonts.medium
  },
  containerIn2_s3_restaurantname: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    marginVertical: 10
  },
  containerIn3: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  containerIn2_s4:{
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  containerIn2_s4_heading:{
    color: 'grey',
    fontSize: 18,
    fontWeight: '600'
  },
  containerIn2_s4_QuantityCont:{
    flexDirection: 'row',
    alignItems:'center',
    margin: 10,
  },
  containerIn2_s4_QuantityCont_MinusText:{
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 2,
    padding: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerIn2_s4_QuantityCont_PlusText:{
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 2,
    padding: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerIn2_s4_QuantityCont_TextInput:{
    backgroundColor: theme.colors.secondaryBackground,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    padding: 10,
    width: 50,
    borderRadius: 20,
    marginHorizontal: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  containerIn3_buybtn: {
    width: '90%',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    margin: 10,
    alignSelf: 'center'
  },
  containerIn3_buybtn_text: {
    color: theme.colors.buttonText,
    fontSize: 17,
    fontFamily: theme.fonts.semiBold,
    textAlign: 'center'
  }
});
