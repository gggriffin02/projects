import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Link,
} from "react-native";

import { useNavigation } from "expo-router";

const windowWidth = Dimensions.get("window").width;

export default function StackLayout() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#232323" },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "@test_user",
          headerStyle: {
            backgroundColor: "#FAF9F6",
            justifyContent: "flex-end",
          },
          headerTitleStyle: {
            fontFamily: "Prata-Regular",
            fontSize: 30,
            color: "black",
          },
          headerRight: () => (
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/profile/saved_recipes")}
              >
                <Image
                  source={require("../../../assets/saved_bookmark.png")}
                  style={{
                    width: windowWidth * 0.11,
                    height: windowWidth * 0.11,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/profile/preferences")}
              >
                <Image
                  source={require("../../../assets/more.png")}
                  style={{
                    width: windowWidth * 0.11,
                    height: windowWidth * 0.11,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      {/* <Link href="/home/feed/newpost" style={styles.postButtonContainer}>
        <View style={styles.postButton}>
          <FontAwesome size={32} name="plus" color={Theme.colors.textPrimary} />
        </View> */}
      <Stack.Screen
        name="preferences"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Preferences",
          headerStyle: {
            backgroundColor: "#FAF9F6",
            justifyContent: "flex-end",
          },
          headerTitleStyle: {
            fontFamily: "Prata-Regular",
            fontSize: 30,
            color: "black",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text style={{ color: "black" }}>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="saved_recipes"
        options={{
          headerShown: true,
          headerTitle: "Saved Recipes",
          headerStyle: {
            backgroundColor: "#FAF9F6",
            justifyContent: "flex-end",
          },
          headerTitleStyle: {
            fontFamily: "Prata-Regular",
            fontSize: 24,
            color: "black",
          },
          headerTintColor: "black",
          headerBackButtonDisplayMode: "minimal",
          headerRight: () => (
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  alert(
                    "🚧whoops this feature is under construction!🚧 Please go back and find your recipe manually."
                  )
                }
              >
                <Image
                  source={require("../../../assets/magnifier.png")}
                  style={{
                    width: windowWidth * 0.08,
                    height: windowWidth * 0.08,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="recipe_details" />
    </Stack>
  );
}
