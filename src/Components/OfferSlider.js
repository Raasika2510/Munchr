import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { MaterialIcons } from '@expo/vector-icons';


const OfferSlider = () => {
    return (
        <View style={styles.container}>
            <Swiper
                autoplay={true}
                autoplayTimeout={3}
                showButtons={true}
                removeClippedSubviews={false}
                dotColor={'red'}
                activeDotColor={'black'}
                nextButton={<Text style={styles.nextButton}>›</Text>}
                prevButton={<Text style={styles.nextButton}>‹</Text>}

            >
                <View style={styles.slide}>
                    <Image source={require('../Images/off.jpg')} style={styles.image} />
                </View>
                <View style={styles.slide}>

                    <Image source={require('../Images/del.jpg')} style={styles.image} />
                </View>
                <View style={styles.slide}>

                    <Image source={require('../Images/offer.jpg')} style={styles.image} />
                </View>

            </Swiper>
        </View>
    )
}

export default OfferSlider

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 150,
        alignSelf: 'center'

    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 25 
    },
    slide : {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    nextButton : {
        color : 'black',
       fontSize: 20,
       fontWeight: '600',
       backgroundColor: 'white',
       borderRadius: 20,
       width: 20,
       height: 20,
       textAlign: 'center',
       lineHeight: 20 
    }
})