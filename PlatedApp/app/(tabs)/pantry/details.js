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

// import PANTRY_DATA from "data/pantry_log.json";

export default function Details(index) {
  const [newMessage, setNewMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const params = useLocalSearchParams();
  // console.log(currIndex);
  const navigation = useNavigation();
  // console.log(params.contents);
  const contentsArray = params.contents.split(",");

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.name,
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
    // Validation to ensure all fields are filled
    if (newMessage != "") {
      alert("This feature is under construction!");
    }
    setNewMessage("");
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
            data={contentsArray}
            keyExtractor={(item, index) => `${item}-${index}`}
            scrollEnabled={true}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemLabel}>{item}</Text>
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
    justifyContent: "center",
  },
  focusedStyle: {
    borderColor: "#B5300B",
    shadowColor: "#B5300B",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
  },
});
