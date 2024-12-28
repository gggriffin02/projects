import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter, useNavigation, Link } from "expo-router";
import { useState, useEffect } from "react";

import { supabase } from "backend/supabaseClient";

import PANTRY_DATA from "data/pantry_log.json";
import DATA from "data/grocery_log.json";
console.log(DATA);
// const windowWidth = Dimensions.get("window").width;

export default function Page() {
  const [pantries, setPantries] = useState([]);
  const [groceries, setGroceries] = useState([]);
  const navigation = useNavigation();

  const fetchItems = async () => {
    try {
      const user_pantries = await supabase.from("Pantry").select("*");
      const user_groceries = await supabase.from("Groceries").select("*");
      setPantries(user_pantries.data);
      setGroceries(user_groceries.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [pantries]);

  const renderSeparator = () => <View style={styles.separator} />;

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.postButtonContainer}
        onPress={() => navigation.navigate("groceries")}
      >
        <View style={styles.postButton}>
          <Icon size={35} name="cart-sharp" color="black" />
          <Text style={styles.cartLabel}>Grocery Cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const pantriesWithNew = [
    ...PANTRY_DATA,
    { name: "Add pantry", contents: [], isStatic: true },
  ];

  const images = {
    bread: require("assets/pantry_images/bread.png"),
    onion: require("assets/pantry_images/onion.png"),
    fish: require("assets/pantry_images/fish.png"),
    carrot: require("assets/pantry_images/carrot.png"),
    lime: require("assets/pantry_images/lime.png"),
  };

  return (
    <View style={styles.main}>
      <FlatList
        data={pantriesWithNew}
        keyExtractor={(item) => item.index}
        numColumns={2}
        scrollEnabled={true}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) =>
          item.isStatic ? (
            <TouchableOpacity
              style={[styles.itemContainer, { paddingTop: 1, paddingLeft: 2 }]}
              onPress={() => navigation.navigate("newItem")}
            >
              <Text style={styles.itemLabel}>{item.name}</Text>
              <View style={styles.newIcon}>
                <Icon size={100} name="add-sharp" color="black" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.itemContainer}
              // onPress={() =>
              //   navigation.navigate("details", { pantry: item.index })
              // }
            >
              <Link
                href={{
                  pathname: "(tabs)/pantry/details",
                  params: { name: item.name, contents: item.contents }, // Pass your params here
                }}
                style={{ textDecorationLine: "none" }} // Prevents underline styling for the text
              >
                <Text style={styles.itemLabel}>{item.name}</Text>
                <View style={styles.regularIconContainer}>
                  <Image
                    source={images[item.image]}
                    style={styles.regularIcon}
                  />
                </View>
              </Link>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    // padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
  },
  itemContainer: {
    width: 166,
    height: 166,
    borderWidth: 2,
    borderColor: "#B5300B",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    backgroundColor: "#FAF9F6",
    padding: 5,
  },
  cartView: {
    width: 352,
    height: 352,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  flatlist: {
    borderWidth: 2,
    borderColor: "#B5300B",
  },
  cartItemsLabel: {
    color: "black",
    fontFamily: "Poppins",
    fontSize: 24,
    fontWeight: 400,
    margin: 4,
    marginLeft: 6,
  },
  cartContainer: {
    color: "black",
    height: 54,
    justifyContent: "center",
  },
  separator: {
    height: 2,
    backgroundColor: "#B5300B",
  },
  itemLabel: {
    color: "black",
    fontFamily: "Prata-Regular",
    fontSize: 20,
    fontWeight: 400,
    margin: 5,
  },
  groceryLabel: {
    color: "black",
    fontFamily: "Prata-Regular",
    fontSize: 24,
    marginBottom: 4,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  cartLabel: {
    fontSize: 20,
    color: "black",
    fontFamily: "Prata-Regular",
  },
  postButtonContainer: {
    position: "absolute",
    marginTop: 20,
  },
  postButton: {
    backgroundColor: "#FAF9F6",
    borderWidth: 2,
    borderColor: "#B5300B",
    height: 50,
    width: 352,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  newIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginTop: 5,
  },
  headerContainer: {
    width: "100%",
    paddingVertical: 40,
    alignItems: "center",
  },
  regularIcon: {
    width: "100%",
    height: "100%",
    marginLeft: 25,
    resizeMode: "contain",
  },
  regularIconContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 5,
  },
});
