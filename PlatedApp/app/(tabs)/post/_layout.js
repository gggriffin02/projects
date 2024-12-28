// app/post/_layout.js
import { Stack } from "expo-router";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function PostLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FAF9F6",
        },
        headerTitleStyle: {
          fontFamily: "Prata-Regular",
          fontSize: 30,
          color: "black",
        },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "New Recipe",
          headerRight: () => (
            <View style={styles.headerButton}>
              <TouchableOpacity onPress={() => alert("Options for Post Tab")}>
                <Image
                  // source={require("../../assets/more.png")}
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          headerTitle: "Recipe Details",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  headerIcon: {
    width: windowWidth * 0.07,
    height: windowWidth * 0.07,
  },
});
