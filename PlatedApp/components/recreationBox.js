import { React, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Link,
  rgba,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
const windowWidth = Dimensions.get("window").width;
import { useLocalSearchParams } from "expo-router";

export default function RecreationBox() {
  const { the_image } = useLocalSearchParams();
  return (
    <View>
      <View marginBottom={10}>
        <TouchableOpacity
          onPress={() =>
            alert(
              "🚧whoops we can't expand these recreations because they are hardcoded!🚧, please return back"
            )
          }
        >
          <View style={styles.recreationContainer}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <Image
                  source={require("assets/chefMaya.png")}
                  style={styles.profPic}
                ></Image>
                <Text style={styles.chefText}>
                  Chef Maya's {"\n"}Recreation{" "}
                </Text>
                {/* <Image
                  source={{ uri: the_image }}
                  style={styles.rec_image}
                ></Image> */}
              </View>
              <Text style={styles.recText}>
                I think I messed something up {"\n"}but I wish this was more
                {"\n"}flavorful! Next time...
              </Text>
            </View>
            <Image source={{ uri: the_image }} style={styles.rec_image}></Image>
          </View>
        </TouchableOpacity>
      </View>

      <View marginBottom={10}>
        <TouchableOpacity
          onPress={() =>
            alert(
              "🚧whoops we can't expand these recreations because they are hardcoded!🚧, please return back"
            )
          }
        >
          <View style={styles.recreationContainer}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <Image
                  source={require("assets/graham.png")}
                  style={styles.profPic}
                ></Image>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#B5300B",
                    fontFamily: "Poppins",
                    marginHorizontal: 4,
                    marginTop: 5,
                  }}
                >
                  Chef Graham's {"\n"}Recreation
                </Text>
              </View>
              <Text style={styles.recText}>
                I loved making this recipe!{"\n"}I changed it by making it
                {"\n"}a little ... {"\n"}
              </Text>
            </View>
            <Image source={{ uri: the_image }} style={styles.rec_image}></Image>
          </View>
        </TouchableOpacity>
      </View>
      <View marginBottom={10}>
        <TouchableOpacity
          onPress={() =>
            alert(
              "🚧whoops we can't expand these recreations because they are hardcoded!🚧, please return back"
            )
          }
        >
          <View style={styles.recreationContainer}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <Image
                  source={require("assets/ashley.png")}
                  style={styles.profPic}
                ></Image>
                <Text style={styles.chefText}>
                  Chef Ashley's{"\n"}Recreation
                </Text>
              </View>
              <Text style={styles.recText}>
                This was fire. I served it to my{"\n"}whole family and everyone
                {"\n"}loved it...
              </Text>
            </View>
            <Image source={{ uri: the_image }} style={styles.rec_image}></Image>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recreationContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 130,
    borderColor: "#B5300B",
    borderWidth: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profPic: {
    height: windowWidth * 0.15,
    width: windowWidth * 0.15,
    margin: 5,
    borderRadius: 100,
  },
  chefText: {
    fontSize: 18,
    color: "#B5300B",
    fontFamily: "Poppins",
    marginHorizontal: 10,
    marginTop: 5,
  },
  rec_image: {
    height: "85%",
    aspectRatio: 1,
    borderColor: "#B5300B",
    alignSelf: "center",
    borderWidth: 3,
    marginRight: 10,
  },
  recText: {
    fontSize: 11,
    color: "#38434D",
    fontFamily: "Poppins",
    marginLeft: 8,
    overflow: "hidden",
  },
});
