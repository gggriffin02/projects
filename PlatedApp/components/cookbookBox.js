import { React } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Link,
  rgba,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";
import { supabase } from "backend/supabaseClient";

export default function CookBookBox({ book_vec, name }) {
  //const [cookBookData, setCookBookData] = useState([]);
  const router = useRouter();
  //console.log(type);
  // useEffect(() => {
  //   const fetchCookBook = async () => {
  //     try {
  //       const user_response = await supabase
  //         .from("Recipes")
  //         .select("image_url")
  //         .eq(type, true);
  //       //console.log(user_response.data);
  //       setCookBookData(user_response.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchCookBook();
  // }, []);

  // const url_0 = cookBookData[0].image_url;
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          alert(
            "🚧the cookbook page is under construction!🚧, please return back"
          )
        }
      >
        <View style={styles.container}>
          <View style={styles.row}>
            <Image source={{ uri: book_vec[0] }} style={styles.image} />
            <Image source={{ uri: book_vec[1] }} style={styles.image} />
          </View>
          <View style={styles.row}>
            <Image source={{ uri: book_vec[2] }} style={styles.image} />
            <Image source={{ uri: book_vec[3] }} style={styles.image} />
          </View>
          <BlurView style={styles.footer} intensity={10}>
            <Text style={styles.title}> {name} </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                alert(
                  "🚧whoops this feature is under construction!🚧, please return back"
                )
              }
            >
              <Text style={styles.editText}>✎</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150, // Adjust to match your layout
    height: 150,
    borderWidth: 2,
    //overflow: "hidden",
    borderColor: "#B5300B",
    backgroundColor: "white",
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    bottom: "0",
    left: "0",

    //  blur(7.5px),
  },
  title: {
    fontSize: 14,
    //fontWeight: "bold",
    color: "black",
    fontStyle: "Poppins-Regular",
    overflow: "hidden",
    marginHorizontal: 2,
  },
  editButton: {
    padding: 2,
    right: "2%",
    bottom: "2%",
    position: "absolute",
  },
  editText: {
    fontSize: 16,
    color: "black", // Edit button color
  },
  image: {
    flex: 1,
    // margin: 2, // Add spacing between images
    resizeMode: "cover", // Ensures the image fills the space proportionally
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});
