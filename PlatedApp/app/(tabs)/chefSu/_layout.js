import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
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
          headerTitle: "Chef Su",
          headerStyle: {
            backgroundColor: "#FAF9F6",
          },
          headerTitleStyle: {
            fontFamily: "Prata-Regular",
            fontSize: 30,
            color: "black",
          },
          headerRight: () => (
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/chefSu/info")}
              >
                <Image
                  source={require("../../../assets/info.png")}
                  style={{
                    width: windowWidth * 0.07,
                    height: windowWidth * 0.07,
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="info"
        options={{
          headerTitle: "Chef Su Info Page",
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: "black",
          headerShown: true,
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
    </Stack>
  );
}
