import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react'


const UserCartScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
                <TouchableOpacity>
                    <Text style={{ fontSize: 16, color: 'white' }}>Close</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerHead}>
                <Text style={styles.containerHead}>Cart Items</Text>
            </View>

            <View style={styles.containerCardList}>
                <View style={styles.containerCard}>
                    <Image source={require('../Images/pizza2.jpg')} style={styles.cardimage} />
                    
                    <View style={styles.containerCard_in}>
                    <View style={styles.containerCard_in1}>
                        <Text>Hera Dhaba</Text>
                    </View>

                    <View style={styles.containerCard_in2}>
                        <Text style={styles.containerCard_in2_itemName}>Samosa</Text>
                        <Text style={styles.containerCard_in2_itemPrice}>Rs.50 each</Text>
                        <Text style={styles.containerCard_in2_itemQty}>Quantity: 1</Text>
                    </View>

                    <View style={styles.containerCard_in3}>
                        <TouchableOpacity style={styles.containerCard_in3_btn}>
                            <Text style = {styles.containerCard_in3_btn_txt}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default UserCartScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#edeef0',
        width: '100%',
    },
    containerHead: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 5,
        marginLeft: 5,
        paddingHorizontal: 10,
    },
    containerCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 5,
        borderRadius: 25,
        width: '95%',
        alignSelf: 'center',
        elevation: 2,
        alignItems: 'center',
    },
    cardimage: {
        width: 100,
        height: '100%',
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
        backgroundColor: '#edeef0',
        marginVertical: 5,
        padding: 5,
        elevation: 2
    },
    containerCard_in2_itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3
    },
    containerCard_in2_itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2
    },
    containerCard_in3_btn_txt: {
        fontSize: 16,
        fontWeight: 'bold',
    },
})