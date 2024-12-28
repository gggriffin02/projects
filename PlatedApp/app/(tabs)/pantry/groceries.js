import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { Link } from "expo-router";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";

import GROCERY_DATA from "data/grocery_log.json";

export default function GroceryCart() {
  const [newMessage, setNewMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [groceries, setGroceries] = useState(GROCERY_DATA);
  // console.log(currIndex);
  const navigation = useNavigation();
  // console.log(GROCERY_DATA);
  // const contentsArray = params.contents.split(",");

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Grocery Cart",
      headerLeft: () => (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back-sharp" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSend = () => {
    if (newMessage != "") {
      alert("This feature is under construction!");
    }
    setNewMessage("");
  };

  const toggleDone = (index) => {
    const updatedData = [...groceries];
    updatedData[index].done = !updatedData[index].done;
    setGroceries(updatedData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.container}
      >
        <View style={styles.main}>
          <FlatList
            data={GROCERY_DATA}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            scrollEnabled={true}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemLabel}>{item.name}</Text>
                <TouchableOpacity
                  style={[
                    styles.circle,
                    { backgroundColor: item.done ? "#B5300B" : "transparent" },
                  ]}
                  onPress={() => {
                    toggleDone(index);
                  }}
                />
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isFocused && styles.focusedStyle]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Add items here..."
            value={newMessage}
            onChangeText={setNewMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Icon name="arrow-up-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#FAF9F6",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    // backgroundColor: "red",
    width: "100%",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  itemLabel: {
    color: "black",
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: 400,
    margin: 5,
    alignSelf: "center",
    // backgroundColor: "blue",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: "auto",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#FAF9F6",
    width: "100%",
  },
  sendButton: {
    backgroundColor: "#B5300B",
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },
  separator: {
    height: 1,
    backgroundColor: "#B5300B",
  },
  itemContainer: {
    height: 48,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  circle: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: "#B5300B",
    borderRadius: 25,
    alignSelf: "center",
    marginRight: 5,
    // backgroundColor: "#B5300B",
  },
  focusedStyle: {
    borderColor: "#B5300B",
    shadowColor: "#B5300B",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
  },
});
