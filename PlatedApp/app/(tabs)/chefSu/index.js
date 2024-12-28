import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Link } from "expo-router";

import { API_KEY } from "../../../utils/gemini";
import { GoogleGenerativeAI } from "@google/generative-ai";
//if it's giving you trouble for this "npm install @google/generative-ai"

// TODO: Set up the model with appropriate system instructions.
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a chef. You're french and your name is Chef Su. Give cooking advice to the user. Don't use markdown formatting.",
});
const chat = model.startChat(); //start chat comes from gemini API for these kind of chat applications

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const toggled = useSharedValue(false);
  // useRef allows us to get direct access to a React component and call methods
  // on it imperatively. We use this ref to scroll
  const flatListRef = useRef(null);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(toggled.value ? 0 : 1, { duration: 500 }),
      height: withTiming(toggled.value ? 0 : 200, { duration: 500 }),
    };
  });
  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const newMessageFromUser = {
        id: Date.now().toString(), // Simple ID for messages
        text: newMessage,
        isSent: true,
      };
      setMessages((prevMessages) => {
        // Check if it's the first message being sent
        if (prevMessages.length === 0) {
          toggled.value = true; // Trigger the animation
        }
        return [...prevMessages, newMessageFromUser];
      });
      //setMessages([...messages, newMessageFromUser]);
      setNewMessage("");
    }
  };

  const handlePress = async () => {
    toggled.value = !toggled.value;
  };

  useEffect(() => {
    // If the last message sent is from the user, request a response from the AI.
    const generateReply = async (lastMessageText) => {
      try {
        // TODO: Ask model to generate the next message
        //this doesn't remember anything about the chat history and only works off of recent content
        //const result = await model.generateContent(lastMessageText);
        //this remembers chat history and can have a "personality"
        const result = await chat.sendMessage(lastMessageText);

        const newMessageFromAI = {
          id: Date.now().toString(), // Simple ID for messages
          text: result.response.text().trim(),
          isSent: false,
        };
        setMessages([...messages, newMessageFromAI]);
      } catch (err) {
        console.error(err);
      }
    };
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.isSent) {
      generateReply(lastMessage.text);
    }
  }, [messages]);

  //make an opacity animation function and attach it to onpress inside of the send button

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <Animated.View style={[styles.imageContainer, animatedStyle]}>
        <Image
          source={require("../../../assets/chefHat.png")}
          style={styles.image}
        />
        {/* <Text style={styles.promptText}>Chef Su is here to help!</Text> */}
        <Text style={styles.promptText}>
          Chef Su is here to help! {"\n"}
          {"\n"} Help me meal prep... {"\n"} How much sodium is in...{"\n"}
          Does lemon go well with...
        </Text>
      </Animated.View>
      <FlatList
        ref={flatListRef}
        onContentSizeChange={() =>
          // Scroll to the end whenever a message is sent or received.
          flatListRef.current.scrollToEnd({ animated: true })
        }
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.isSent ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isFocused && styles.focusedStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask your cooking questions..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    //marginTop: "20%",
  },
  image: {
    height: 195,
    width: 200, // Adjust dimensions based on your image
    marginBottom: "5%",
    marginTop: "50%",
  },
  promptText: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: " #FAF9F6",
    height: "8%",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    padding: 16,
    //paddingTop: 48,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  sentMessage: {
    backgroundColor: "#B5300B",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "gray", // manually adjusted
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  focusedStyle: {
    borderColor: "#B5300B",
    shadowColor: "#B5300B",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
  },
});
