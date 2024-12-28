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
        backgroundColor: "red",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Pantry",
          headerStyle: {
            backgroundColor: "#FAF9F6",
          },
          backgroundColor: "red",
          headerTitleStyle: {
            fontFamily: "Prata-Regular",
            fontSize: 30,
            color: "black",
          },
        }}
      />
      <Stack.Screen
        name="groceries"
        options={{
          headerShown: true,
          headerTitle: "Grocery Cart",
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
        name="details"
        options={{
          headerShown: true,
          headerTitle: "Details",
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
        name="newItem"
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "Details",
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
      {/* <Stack.Screen
        name="info"
        options={{
          headerTitle: "Chef Su Info Page",
          headerBackTitle: "Back",
          headerTintColor: "black",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FAF9F6",
          },
          headerTitleStyle: {
            fontFamily: "Prata-Regular",
            fontSize: 20,
            color: "black",
          },
        }}
      /> */}
    </Stack>
  );
}
