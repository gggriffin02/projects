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

// const windowWidth = Dimensions.get("window").width;

export default function PantryList({ pantry }) {
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.main}>
      <FlatList
        data={pantry}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({ item }) => <View style={styles.listItem}></View>}
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "#FAF9F6",
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
    resizeMode: "contain",
  },
  regularIconContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 20,
    marginBottom: 5,
  },
  listItem: {
    width: "100%",
    height: 54,
  },
  listItemText: {
    fontFamily: "Poppins",
    fontSize: 24,
    marginLeft: 15,
  },
});
