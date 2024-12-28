import { React, useState } from "react";
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

export default function RecipeBox({ title, the_image, edit }) {
  const [post, setPost] = useState(null);
  const router = useRouter();
  let box = null;

  //   const fetchCookBook = async () => {
  //     try {
  //       const user_response = await supabase
  //         .from("recipes")
  //         .select("*")
  //         .eq("is_mine", "true");
  //       setMine(user_response.data);
  //       console.log(mine);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  // const fetchRecreation = async () => {
  //     try {
  //       const user_response = await supabase
  //         .from("recipes")
  //         .select("*")
  //         .eq("is_mine", "true");
  //       setRecreatino(user_response.data);
  //       console.log(recreation);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  if (edit) {
    box = (
      <View style={styles.container}>
        <Image
          source={{ uri: the_image }}
          style={styles.image}
          resizeMode="cover"
        />
        <BlurView style={styles.footer} intensity={10}>
          <Text style={styles.title}>{title}</Text>
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
    );
  } else {
    box = (
      <View style={styles.container}>
        <Image
          source={{ uri: the_image }}
          style={styles.image}
          resizeMode="cover"
        />
        <BlurView style={styles.footer} intensity={7.5}>
          <Text style={styles.title}>{title}</Text>
        </BlurView>
      </View>
    );
  }
  return box;
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
});
