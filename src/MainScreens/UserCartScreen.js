import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import theme from '../../theme';

const UserCartScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: theme.colors.primary, paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
                <TouchableOpacity>
                    <Text style={{ fontSize: 16, color: theme.colors.buttonText }}>Close</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerHead}>
                <Text style={styles.containerHead}>Cart Items</Text>
            </View>

            <View style={styles.containerCardList}>
                <View style={styles.containerCard}>
                    <Image source={require('../Images/spaghetti.jpg')} style={styles.cardimage} />
                    
                    <View style={styles.containerCard_in}>
                    <View style={styles.containerCard_in1}>
                        <Text style={styles.text}>Hera Dhaba</Text>
                    </View>

                    <View style={styles.containerCard_in2}>
                        <Text style={styles.containerCard_in2_itemName}>spaghetti</Text>
                        <Text style={styles.containerCard_in2_itemPrice}>Rs.180 each</Text>
                        <Text style={styles.containerCard_in2_itemQty}>Qty: 1</Text>
                    </View>

                    <View style={styles.containerCard_in3}>
                        <TouchableOpacity style={styles.containerCard_in3_btn}>
                            <Text style={styles.containerCard_in3_btn_txt}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
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
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        width: '100%',
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
        backgroundColor: theme.colors.background,
        marginVertical: 5,
        padding: 5,
        elevation: 2
    },
    containerCard_in2_itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
        color: theme.colors.text,
        fontFamily: theme.fonts.semiBold
    },
    containerCard_in2_itemPrice: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
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
