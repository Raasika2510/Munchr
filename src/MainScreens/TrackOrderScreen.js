import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const TrackOrderScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{backgroundColor:'#8B0000', paddingVertical:15, paddingHorizontal:15, marginTop:30}}>
          <TouchableOpacity>
            <Text style={{color:'white'}}> close  </Text>
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
            <View style={styles.orderItemContainer_2}>
              <View>
                <Text style={styles.orderItemName}> Indian Thali </Text>
                <Text> $ 290 </Text>
                <Text> Qty: 1 unit </Text>
              </View>
            </View>
            </View>

            <View style={styles.orderItemContainer}>
              <View>
                <Image source={require('../Images/pizza1.jpg')} style={styles.cardimage} />
              </View>
            <View style={styles.orderItemContainer_2}>
              <View>
                <Text style={styles.orderItemName}> Pizza  </Text>
                <Text> $ 150 </Text>
                <Text> Qty: 1 unit </Text>
              </View>
            </View>
            </View>

            <View style={styles.orderItemContainer}>
              <View>
                <Image source={require('../Images/mojito.jpg')} style={styles.cardimage} />
              </View>
            <View style={styles.orderItemContainer_2}>
              <View>
                <Text style={styles.orderItemName}> Virgin Mojito </Text>
                <Text> $ 50 </Text>
                <Text> Qty: 2 unit </Text>
              </View>
            </View>
            </View>

            <Text style={styles.orderTotal}>Total : $490</Text>
          </View>
        </ScrollView>

    </View>
  )
}

export default TrackOrderScreen

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  mainHeading: {
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontWeight: '500'
  },  
  mainContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 2,
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 20
  },
  orderId:{
    fontSize: 18,
    color:'grey',
    paddingVertical:5,
    paddingHorizontal:10,
    borderBottom:1,
    borderColor:'#d9d9d9'
  },
  orderTime:{
    paddingVertical:5,
    paddingHorizontal:10,
  },
  orderTotal:{
    fontSize:17,
    textAlign:'right',
    marginVertical:5,
    marginRight:20,
    fontWeight: '600'
  },
  cardimage:{
    width:90,
    height:80,
    borderBottomLeftRadius:20,
    borderTopLeftRadius:20
  },
  orderItemContainer:{
    flexDirection:'row',
    backgroundColor:'#f2f2f2', 
    marginVertical:2, 
    width:'95%', 
    alignSelf:'center', 
    borderRadius:20, 
    elevation:2
  },
  orderItemContainer_2:{
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  orderItemName:{
    fontSize:16,
    fontWeight:'600'
  }
})