import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CardSlider = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>
        Today's Special Food
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

      
      <TouchableOpacity style={styles.card}>
        <View>
          <Image source={require('../Images/pizza3.jpg')} style={styles.cardimage} />
        </View>

      <View style={styles.cardin1}>
        <Text style={styles.cardin1txt}>Pizza</Text>

        <View style={styles.cardin2}>
          <Text style={styles.cardin2txt1}>Fast Food</Text>
          <Text style={styles.cardin2txt1}>Price - 
            <Text style={{textDecorationLine: 'line-through'}}>100Rs</Text>
            <Text> 90Rs</Text>
          </Text>
          <Text style={styles.cardin2txt3}>VEG</Text>
        </View>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View>
          <Image source={require('../Images/pizza2.jpg')} style={styles.cardimage} />
        </View>

      <View style={styles.cardin1}>
        <Text style={styles.cardin1txt}>Pizza</Text>

        <View style={styles.cardin2}>
          <Text style={styles.cardin2txt1}>Fast Food</Text>
          <Text style={styles.cardin2txt1}>Price - 
            <Text style={{textDecorationLine: 'line-through'}}>200Rs</Text>
            <Text> 190Rs</Text>
          </Text>
          <Text style={styles.cardin2txt3}>VEG</Text>
        </View>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View>
          <Image source={require('../Images/pizza1.jpg')} style={styles.cardimage} />
        </View>

      <View style={styles.cardin1}>
        <Text style={styles.cardin1txt}>Pizza</Text>

        <View style={styles.cardin2}>
          <Text style={styles.cardin2txt1}>Fast Food</Text>
          <Text style={styles.cardin2txt1}>Price - 
            <Text style={{textDecorationLine: 'line-through'}}>300Rs</Text>
            <Text> 290Rs</Text>
          </Text>
          <Text style={styles.cardin2txt3}>VEG</Text>
        </View>
      </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};


export default CardSlider

const styles = StyleSheet.create({
  container:{
    marginVertical:10
  },

  cardouthead:{
    fontSize:20,
    fontweight:'600',
    marginHorizontal:10,
    paddingLeft:5,
  },

  cardimage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  
  card: {
    width: 300,
    height: 200,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'grey'
  },

  cardin1: {
    // backgroundColor: 'red',
    marginHorizontal: 3,
    marginTop: 3,
  },
  
  cardin1txt: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 5,
  },
  
  cardin2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  
  cardin2txt1: {
    fontSize: 12,
    marginRight: 10,
    fontWeight: '500',
  },
  
  cardin2txt3: {
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    fontSize: 10,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  }
  
  
  

})


