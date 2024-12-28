import { Image, StyleSheet, View, Text, Dimensions, rgba } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A52A2A",
        tabBarPosition: "bottom",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          //boxShadow: {0px -4px 5px 0px rgba(0, 0, 0, 0.10)},
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.4,
        },
      }}
    >
      <Tabs.Screen
        name="chefSu"
        options={{
          title: "Chef Su",
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/chef-hat copy 1.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/post.png")}
              style={{
                width: size,
                height: size,
                resizeMode: "contain",
                tintColor: color,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/home.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          title: "Pantry",
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/pantry_icon.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require("../../assets/people.png")}
              style={{
                width: size * 1.4,
                height: size * 1.4,
                marginBottom: 1.75,
                tintColor: color,
                //marginTop: 20,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9F6",
    height: "100%",
    width: windowWidth,
  },
  infoButton: {
    height: "10%",
    aspectRatio: 1,
  },
  prata: {
    fontFamily: "Prata-Regular",
    fontSize: "12",
  },
});
