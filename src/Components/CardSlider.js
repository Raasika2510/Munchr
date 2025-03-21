import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList, SafeAreaView } from 'react-native';

const CardSlider = ({navigation, data}) => {

  console.log('Card slider Data', data)
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>
        Today's Special Food
      </Text>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}

    <SafeAreaView>
      
      <FlatList
        style={styles.flatliststyle}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        //data={[{ key: '1' }]} // Dummy data to prevent errors
        renderItem={({item,index}) => (
          <TouchableOpacity  style={styles.card} onPress={() => navigation.navigate('ProductScreen')}>
            <View>
              <Image source={require('../Images/indian.jpg')} style={styles.cardimage} />
            </View>
            <View style={styles.cardin1}>
              <Text style={styles.cardin1txt}>{item.FoodName}</Text>
              <View style={styles.cardin2}>
                <Text style={styles.cardin2txt1}>Indian Food</Text>
                <Text style={styles.cardin2txt1}>
                  Price - <Text style={{ textDecorationLine: 'line-through' }}> Rs</Text>
                  <Text> {item.FoodPrice}Rs</Text>
                </Text>
                <Text style={styles.cardin2txt3}>VEG</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>

      {/* <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductScreen')}>
        <View>
          <Image source={require('../Images/briyani.jpg')} style={styles.cardimage} />
        </View>

      <View style={styles.cardin1}>
        <Text style={styles.cardin1txt}>Chicken Briyani</Text>

        <View style={styles.cardin2}>
          <Text style={styles.cardin2txt1}>Indian Food</Text>
          <Text style={styles.cardin2txt1}>Price - 
            <Text style={{textDecorationLine: 'line-through'}}>200Rs</Text>
            <Text> 190Rs</Text>
          </Text>
          <Text style={styles.cardin2txt2}>Non-Veg</Text>
        </View>
      </View>
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductScreen')}>
        <View>
          <Image source={require('../Images/pizza1.jpg')} style={styles.cardimage} />
        </View>

      <View style={styles.cardin1}>
        <Text style={styles.cardin1txt}>Pizza</Text>

        <View style={styles.cardin2}>
          <Text style={styles.cardin2txt1}>Italian Food</Text>
          <Text style={styles.cardin2txt1}>Price - 
            <Text style={{textDecorationLine: 'line-through'}}>300Rs</Text>
            <Text> 290Rs</Text>
          </Text>
          <Text style={styles.cardin2txt3}>Non-VEG</Text>
        </View>
      </View>
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductScreen')}>
        <View>
          <Image source={require('../Images/sesame.jpg')} style={styles.cardimage} />
        </View>

      <View style={styles.cardin1}>
        <Text style={styles.cardin1txt}>Chicken Noodles</Text>

        <View style={styles.cardin2}>
          <Text style={styles.cardin2txt1}>Chinese Food</Text>
          <Text style={styles.cardin2txt1}>Price - 
            <Text style={{textDecorationLine: 'line-through'}}>200Rs</Text>
            <Text> 150Rs</Text>
          </Text>
          <Text style={styles.cardin2txt3}>VEG</Text>
        </View>
      </View>
      </TouchableOpacity> */}
      {/* </ScrollView> */}
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
    color: "#424242"
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
    borderColor: 'grey',
    // backgroundColor: '#dedede'
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
  },
  cardin2txt2: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#9E0D0E',
    fontSize: 10,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4
  }
})


