import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';


const UserProfile = () => {
  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'#8B0000', paddingVertical:10, paddingHorizontal:10, marginTop:30}}>
        <Text style={{color:'white'}}>My Profile</Text>
        </View>

        <View style={styles.container_Inputfield}>
        <FontAwesome5 name="user-alt" size={20} color="#ccc" style={{paddingLeft:5, paddingTop:7}} />
            <TextInput
                style={styles.input}
                placeholder='Full Name'
                value={'Name'}
                editable={false}
            />
        </View>

        <View style={styles.container_Inputfield}>
        <FontAwesome5 name="envelope" size={20} color="#ccc" style={{paddingLeft:5, paddingTop:7}} />
            <TextInput
                style={styles.input}
                placeholder='Email'
                value={'PNF@gmail.com'}
                editable={false}
            />
        </View>

        <View style={styles.container_Inputfield}>
        <FontAwesome5 name="home" size={20} color="#ccc" style={{paddingLeft:5, paddingTop:7}} />
            <TextInput
                style={styles.input}
                placeholder='Address'
                value={'New PNF Address'}
                editable={false}
            />
        </View>

        <View style={styles.container_Inputfield}>
        <FontAwesome5 name="phone" size={20} color="#ccc" style={{paddingLeft:5, paddingTop:7}} />
            <TextInput
                style={styles.input}
                placeholder='Phone'
                value={'8220xxxx89'}
                editable={false}
            />
        </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext}>Edit Profile </Text>
        </TouchableOpacity>
    </View>
  )
}

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:16,
        backgroundColor: '#fff'
    },
    container_In:{
        backgroundColor: '#FF3F00', 
        paddingVertical: 15, 
        paddingHorizontal: 15, 
        marginTop: 30 
    },
    container_Inputfield:{
        flexDirection:'row',
        height:40,
        borderColor:'#ccc',
        borderWidth:1,
        borderRadius:40,
        paddingHorizontal:10,
        marginTop:10,
        paddingHorizontal:10,
        marginTop:10,
        marginHorizontal:16   
    },
    Input:{
        paddingLeft:7
    },
    button: {
        backgroundColor: '#8B0000', 
        borderRadius: 25,
        width: '93%',
        alignSelf: 'center',
        paddingVertical: 12,
        elevation: 5,
        marginTop:10
    },
    buttontext: {
        fontSize: 17,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center'
    },
})