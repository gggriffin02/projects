import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { FilterProvider } from "./FilterContext";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Link,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

export default function StackLayout() {
  const router = useRouter();
  return (
    <FilterProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerTitle: " ",
            headerStyle: {
              backgroundColor: "#FAF9F6",
            },
            headerTitleStyle: {
              fontFamily: "Prata-Regular",
              fontSize: 30,
              color: "black",
            },
          }}
        />

        <Stack.Screen
          name="filters"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#FAF9F6",
            },
            headerTitle: "Set Filters",
            headerTitleStyle: {
              fontFamily: "Prata-Regular",
              fontSize: 30,
              color: "black",
            },
            headerTintColor: "black",
          }}
        />
        <Stack.Screen
          name="saved_recipes_home"
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
    </FilterProvider>
  );
}
