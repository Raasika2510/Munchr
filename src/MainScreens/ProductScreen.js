import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import theme from '../../theme';

const ProductScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerText}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerIn}>
        <View style={styles.containerIn1}>
          <Image source={require('../Images/indian.jpg')} style={styles.cardimage} />
        </View>

        <View style={styles.containerIn2}>
          <View style={styles.containerIn2_s1}>
            <Text style={styles.containerIn2_s1_foodname}>Pizza</Text>
            <Text style={styles.containerIn2_s1_foodprice}>Rs. 90</Text>
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
        </View>

        <View style={styles.containerIn3}>
          <TouchableOpacity style={styles.containerIn3_buybtn}>
            <Text style={styles.containerIn3_buybtn_text}>Buy</Text>
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
