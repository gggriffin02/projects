import { StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.subtitle}>
          this is where you would set your preferences like your permanent
          dietary restriction filters and other user settings {"\n"}
          {"\n"} Right now your permanent filters are hard coded! {"\n"}
          {"\n"}
          we haven't developed this page yet! sorry!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 27,
    color: "#38434D",
  },
});
