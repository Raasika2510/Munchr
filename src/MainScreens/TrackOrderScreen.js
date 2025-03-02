import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import theme from '../../theme';

const TrackOrderScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Text style={styles.mainHeading}>My Orders</Text>
          <View style={styles.mainContainer}>
            <Text style={styles.orderId}>Order id : 4455545ad</Text>
            <Text style={styles.orderTime}>Time : 4:10 AM</Text>
            
            <View style={styles.orderItemContainer}>
              <View>
                <Image source={require('../Images/indian.jpg')} style={styles.cardimage} />
              </View>
<<<<<<< HEAD
              <View style={styles.orderItemContainer_2}>
                <Text style={styles.orderItemName}>Pizza</Text>
                <Text style={styles.orderPrice}>$ 150</Text>
                <Text style={styles.orderQuantity}>Qty: 1 unit</Text>
=======
            <View style={styles.orderItemContainer_2}>
              <View>
                <Text style={styles.orderItemName}> Indian Thali </Text>
                <Text> $ 290 </Text>
                <Text> Qty: 1 unit </Text>
>>>>>>> 9bcd9c3000cb99073545bc8670cbcddeb936dbc3
              </View>
            </View>

            <View style={styles.orderItemContainer}>
              <View>
                <Image source={require('../Images/pizza1.jpg')} style={styles.cardimage} />
              </View>
<<<<<<< HEAD
              <View style={styles.orderItemContainer_2}>
                <Text style={styles.orderItemName}>Pizza Toppings</Text>
                <Text style={styles.orderPrice}>$ 350</Text>
                <Text style={styles.orderQuantity}>Qty: 1 unit</Text>
=======
            <View style={styles.orderItemContainer_2}>
              <View>
                <Text style={styles.orderItemName}> Pizza  </Text>
                <Text> $ 150 </Text>
                <Text> Qty: 1 unit </Text>
>>>>>>> 9bcd9c3000cb99073545bc8670cbcddeb936dbc3
              </View>
            </View>

            <View style={styles.orderItemContainer}>
              <View>
                <Image source={require('../Images/mojito.jpg')} style={styles.cardimage} />
              </View>
<<<<<<< HEAD
              <View style={styles.orderItemContainer_2}>
                <Text style={styles.orderItemName}>Pizza Samosa</Text>
                <Text style={styles.orderPrice}>$ 50</Text>
                <Text style={styles.orderQuantity}>Qty: 1 unit</Text>
=======
            <View style={styles.orderItemContainer_2}>
              <View>
                <Text style={styles.orderItemName}> Virgin Mojito </Text>
                <Text> $ 50 </Text>
                <Text> Qty: 2 unit </Text>
>>>>>>> 9bcd9c3000cb99073545bc8670cbcddeb936dbc3
              </View>
            </View>

<<<<<<< HEAD
            <Text style={styles.orderTotal}>Total: $300</Text>
=======
            <Text style={styles.orderTotal}>Total : $490</Text>
>>>>>>> 9bcd9c3000cb99073545bc8670cbcddeb936dbc3
          </View>
        </ScrollView>
    </View>
  )
}

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
