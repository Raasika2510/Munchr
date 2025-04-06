import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FlatList, SafeAreaView } from "react-native";

const CardSlider = ({ navigation, data }) => {
  console.log("Card slider Data", data);
  
  const openProductHandler = (item) => {
    navigation.navigate("ProductScreen",item)
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>Today's Special</Text>

      <SafeAreaView>
        <FlatList
          style={styles.flatliststyle}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openProductHandler(item)}
            >
              <View>
              <Image source={{ uri: item.image }} style={styles.cardimage} />
              </View>
              <View style={styles.cardin1}>
                <Text style={styles.cardin1txt}>{item.FoodName}</Text>
                <View style={styles.cardin2}>
                  <Text style={styles.cardin2txt1}>{item.Category}</Text>
                  <Text style={styles.cardin2txt1}>
                    Price -{" "}
                    <Text style={{ textDecorationLine: "line-through" }}>
                      {" "}
                      Rs
                    </Text>
                    <Text> {item.FoodPrice}Rs</Text>
                  </Text>
                  <Text
                    style={[
                      item.FoodType === "Veg" ? styles.vegTag : styles.nonVegTag
                    ]}
                  >
                    {item.FoodType}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default CardSlider;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  // cardouthead: {
  //   fontSize: 20,
  //   fontweight: "600",
  //   marginHorizontal: 10,
  //   paddingLeft: 5,
  //   color: "#424242",
  // },
  cardouthead: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 15,
    marginBottom: 5,
    color: "black",
    paddingLeft: 5,
    borderLeftWidth: 4,
    backgroundColor:"white",
    borderLeftColor: "#FFD700",
  },

  cardimage: {
    width: "100%",
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
    borderColor: "grey",
    backgroundColor: 'white'
  },

  cardin1: {
    // backgroundColor: 'red',
    marginHorizontal: 3,
    marginTop: 3,
  },

  cardin1txt: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 5,
  },

  cardin2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 6,
  },

  cardin2txt1: {
    fontSize: 12,
    marginRight: 10,
    fontWeight: "500",
  },

  // cardin2txt3: {
  //   height: 20,
  //   borderRadius: 10,
  //   backgroundColor: "red",
  //   fontSize: 10,
  //   fontWeight: "500",
  //   color: "white",
  //   textAlign: "center",
  //   justifyContent: "center",
  //   paddingHorizontal: 4,
  // },
  vegTag: {
    height: 20,
    borderRadius: 10,
    backgroundColor: "green",
    fontSize: 10,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: 'hidden',
    marginLeft: 'auto'
  },
  
  nonVegTag: {
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
    fontSize: 10,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: 'hidden',
    marginLeft: 'auto'
  },
  cardin2txt2: {
    height: 20,
    borderRadius: 10,
    backgroundColor: "#9E0D0E",
    fontSize: 10,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
});
