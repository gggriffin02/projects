import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import CollapsibleView from "components/collapsibleView";
import RecipeBox from "components/recipeBox";
import { supabase } from "backend/supabaseClient";
import { BlurView } from "expo-blur";

import { Link } from "expo-router";
import CookBookBox from "components/cookbookBox";

const windowWidth = Dimensions.get("window").width;

export default function Page() {
  const [mine, setMine] = useState(null);
  const router = useRouter();

  const cookbook1_data = [
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/chocochip.png?t=2024-12-06T05%3A21%3A30.329Z",
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/recipe_image_9.jpeg?t=2024-12-01T23%3A52%3A01.316Z",
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/recipe_image_17.jpeg?t=2024-12-01T23%3A50%3A58.975Z",
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/Blueberry-Rasberry-Jello-Salad.webp?t=2024-12-06T05%3A19%3A12.341Z",
  ];
  const cookbook2_data = [
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/recipe_image_7.jpeg?t=2024-12-01T23%3A51%3A50.420Z",
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/chicken%20l.jpeg?t=2024-12-06T04%3A53%3A39.643Z",
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/salad.jpg",
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/steamed-whole-tilapia-2.png?t=2024-12-06T05%3A24%3A53.783Z",
  ];
  const cookbook3_data = [
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/bbq_wings.png?t=2024-12-06T05%3A00%3A19.934Z",
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/Pineapple-Shrimp-with-Rice-scaled.jpg?t=2024-12-06T05%3A17%3A34.391Z",
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/pbjmuff.png?t=2024-12-06T05%3A32%3A03.151Z",
    "https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/Recipes/recipe_image_14.jpeg?t=2024-12-01T23%3A50%3A34.185Z",
  ];
  const fetchMine = async () => {
    try {
      const user_response = await supabase
        .from("Recipes")
        .select("*")
        .eq("is_mine", true);
      setMine(user_response.data);
      //console.log(user_response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMine();
  }, []);

  const recreation_data = [
    {
      path: require("../../../assets/cookie.png"),
      name: "Chocolate Chip Cookie",
    },
    { path: require("../../../assets/feta.png"), name: "Whipped Feta" },
    {
      path: require("../../../assets/salmon.png"),
      name: "Salmon Cesear Salad",
    },
    {
      path: require("../../../assets/penne.png"),
      name: "Vodka Penna Pasta",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.fullHeader}>
        <View style={styles.topHeader}>
          <View style={styles.topHeaderElem}>
            <Image
              source={require("../../../assets/chef_prof.png")}
              style={styles.profPic}
            ></Image>
            <Text style={styles.title}>Chef You</Text>
          </View>
          <View style={styles.topHeaderElem} marginTop={10}>
            <Text style={styles.number}>#</Text>
            <Text style={styles.subtitle}>Recipes</Text>
          </View>
          <View style={styles.topHeaderElem} marginTop={10}>
            <Text style={styles.number}>#</Text>
            <Text style={styles.subtitle}>Followers</Text>
          </View>
          <View style={styles.topHeaderElem} marginTop={10}>
            <Text style={styles.number}>#</Text>
            <Text style={styles.subtitle}>Following</Text>
          </View>
        </View>
        <Text style={styles.subtitle} marginTop={10}>
          Status: Line Cook
        </Text>
        <Text style={styles.subtitle}>
          Hi this is my profile and I'm writing the bio that would go here!
        </Text>
      </View>

      {/* ScrollViews here and then */}
      <ScrollView marginTop="5%" flex={1}>
        <Text style={styles.title} marginTop={10} edit={true}>
          Cookbooks
        </Text>
        <ScrollView backgroundColor="#FAF9F6" horizontal={true}>
          <CookBookBox
            book_vec={cookbook1_data}
            name="Dessert Recipes"
          ></CookBookBox>
          <View>
            <CookBookBox
              book_vec={cookbook2_data}
              name="Family Recipes"
            ></CookBookBox>
          </View>
          <View>
            <CookBookBox
              book_vec={cookbook3_data}
              name="healthy Recipes"
            ></CookBookBox>
          </View>
        </ScrollView>

        <Text style={styles.title} marginTop={10}>
          Your Recipes
        </Text>
        <View backgroundColor="#FAF9F6">
          <FlatList
            horizontal={true}
            data={mine}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.under_construction) {
                    // Check if under construction
                    alert(
                      "🚧whoops our recently posted page is under construction!🚧, please return back"
                    );
                  } else {
                    router.push({
                      pathname: "/(tabs)/profile/recipe_details",
                      params: {
                        recipe_title: item.Name,
                        the_image: item.image_url,
                        servings: item.servings,
                        time: item.TotalTime,
                        difficulty: item.difficulty,
                        chef_name: item.AuthorName,
                      },
                    });
                  }
                }}
              >
                <RecipeBox
                  title={item.Name}
                  the_image={item.image_url}
                  edit={true}
                ></RecipeBox>
              </TouchableOpacity>
            )}
          />
        </View>

        <Text style={styles.title} marginTop={10}>
          Recreations
        </Text>
        <View backgroundColor="#FAF9F6">
          <FlatList
            horizontal={true}
            data={recreation_data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  alert(
                    "🚧whoops our recreations page is under construction!🚧, please return back"
                  )
                }
              >
                <View style={styles.boxContainer}>
                  <Image
                    source={item.path}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <BlurView style={styles.footer} intensity={10}>
                    <Text style={styles.boxTitle}>{item.name}</Text>
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
            )}
          />
        </View>
        {/* <Text style={styles.title}> All Recipes</Text>
        <FlatList horizontal="true"></FlatList> */}
      </ScrollView>
    </View>
  );
}

{
  /* <CollapsibleView title="Cookbooks">
          <Text>This is the content of the expandable view</Text>
        </CollapsibleView>
        <CollapsibleView title="All Recipes">
          <Text>This is the content of the expandable view</Text>
        </CollapsibleView>
        <CollapsibleView title="Recreations">
          <Text>This is the content of the expandable view</Text>
        </CollapsibleView> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 24,
    backgroundColor: "#FAF9F6",
  },
  stats: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    // paddingTop: 24,
    // paddingHorizontal: 24,
  },
  fullHeader: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  number: {
    fontSize: 32,
    fontFamily: "Poppins",
    color: "black",
  },
  profPic: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    marginBottom: 10,
  },
  topHeaderElem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  title: {
    fontSize: 26,
    color: "black",
    fontFamily: "Prata-Regular",
  },
  subtitle: {
    fontSize: 15,
    color: "black",
    fontFamily: "Poppins",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  boxContainer: {
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
  boxTitle: {
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
