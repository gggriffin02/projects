import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { WebView } from "react-native-webview";
import { useRouter, useNavigation } from "expo-router";
import Constants from "expo-constants";

import { Link } from "expo-router";

export default function InfoScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    // Dynamically hide or show the header based on `showWebView`
    setShowHeader(!showHeader);
    navigation.setOptions({
      headerShown: showHeader,
    });
  }, [showWebView]);

  if (showWebView) {
    // Show the WebView if the user taps the link
    // navigation.setOptions({
    //   headerShown: false,
    // });
    return (
      <View style={{ flex: 1, backgroundColor: "#FAF9F6" }}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setShowWebView(false);
              // setShowHeader(true);
            }}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back to Info</Text>
          </TouchableOpacity>
        </View>
        <WebView
          source={{
            uri: "https://www.fda.gov/consumers/womens-health-topics/food-safety-home",
          }}
          style={styles.webView}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.body}>
        Welcome to Chef Su, your personal cooking assistant designed to help you
        master your recipes and elevate your culinary skills!
        {"\n"}
        {"\n"}
        Chef Su can provide quick answers to common cooking questions, follow
        the instructions below to get the most out of Chef Su!
      </Text>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>How to use Chef Su</Text>
      </View>
      <Text style={styles.body}>1. Start a Conversation:</Text>
      <Text style={styles.body} marginHorizontal={"5%"}>
        • Type your cooking-related question in the text input box.
        {"\n"}• Press the Send button to ask Chef Su & await their response
      </Text>
      <Text style={styles.body}>2. Get Specific:</Text>
      <Text style={styles.body} marginHorizontal={"5%"}>
        • Include as much detail as possible in your question for accurate
        responses.
        {"\n"}• Example: Instead of "How do I cook chicken?" ask, "How do I
        roast a 2-pound chicken at 375°F?"
      </Text>
      <Text style={styles.body}>3. Follow Up Questions:</Text>
      <Text style={styles.body} marginHorizontal={"5%"}>
        • Use Chef Su to explore new recipes, ingredient pairings, and
        meal-prepping techniques.
      </Text>
      <Text style={styles.body}>4. Practice and Explore:</Text>
      <Text style={styles.body} marginHorizontal={"5%"}>
        • Use Chef Su to explore new recipes, ingredient pairings, and
        meal-prepping techniques.
      </Text>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Disclaimers</Text>
      </View>
      <Text style={styles.body}>1. Chef Su might not always be correct:</Text>
      <Text style={styles.body} marginHorizontal={"5%"}>
        • Chef Su uses AI to provide answers, but it might occasionally give
        incorrect or incomplete information.
        {"\n"}• Always double-check critical cooking details. For safe food
        preparation, refer to the{" "}
        <TouchableOpacity onPress={() => setShowWebView(true)}>
          <Text style={styles.link}>FDA Cooking Safety Guide.</Text>
        </TouchableOpacity>
      </Text>
      <Text style={styles.body}>2. Data Privacy:</Text>
      <Text style={styles.body} marginHorizontal={"5%"}>
        • We use the free tier of the Google Gemini API, which means Chef Su is
        powered by Google’s servers.
        {"\n"}• Do not share any personal or sensitive information with Chef Su.
        Conversations may be logged or analyzed by Google for API improvements.
      </Text>
      <View style={styles.headerContainer}>
        <Text style={styles.header} marginBottom={30}>
          Happy Cooking & enjoy your Journey with Chef Su!{"\n"}
          {"\n"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    padding: 24,
    backgroundColor: "#FAF9F6",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
  },
  body: {
    fontSize: 14,
    color: "#38434D",
    fontFamily: "Poppins",
    marginBottom: 5,
    marginTop: 5,
  },
  link: {
    color: "#B5300B",
    textDecorationLine: "underline",
    fontSize: 14,
    fontFamily: "Poppins",
  },
  webView: {
    flex: 1,
  },
  backButtonContainer: {
    padding: 10,
    alignItems: "flex-start",
    marginTop: 35,
  },
  backButton: {
    backgroundColor: "#B5300B",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
