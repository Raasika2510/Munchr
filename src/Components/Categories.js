import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
const Categories = () => {
  return (
    <View style ={styles.container}>
      <Text style={styles.head}>categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={[styles.box, {backgroundColor:'#f5e5ff'}]}>
            <Image source={require('../Images/icon_1.jpg')} style={styles.image}/>
            <Text style={styles.text}> Italian Food </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, {backgroundColor:'#ddfbf3'}]}>
            <Image source={require('../Images/icon_5.jpg')} style={styles.image}/>
            <Text style={styles.text}> Indian Food </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, {backgroundColor:'#ebfde5'}]}>
            <Image source={require('../Images/icon_4.png')} style={styles.image}/>
            <Text style={styles.text}> Chinese Noodles </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.box, {backgroundColor:'#e5f1ff'}]}>
            <Image source={require('../Images/icon_3.png')} style={styles.image}/>
            <Text style={styles.text}> Beverages </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius:'10'
    },
    head:{
        fontSize:20,
        fontWeight:'600',
        margin:10,
        paddingBottom:5,
        paddingLeft:5
    },
    image:{
        width: 30,
        height: 30
    },
    box:{
        //backgroundColor:'#f5e5ff',
        flexDirection:'row',
        marginHorizontal:10,
        marginBottom:10,
        padding:10,
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        elevation:2
    },
    text:{
        marginLeft:5
    }
})