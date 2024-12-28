import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import RecipeBox from "components/recipeBox";
import { supabase } from "backend/supabaseClient";
import { useNavigation, useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

import { Link } from "expo-router";

export default function Page({ route, cameFrom }) {
  //   console.log(route);
  const [saved, setSaved] = useState(null);
  const router = useRouter();
  const navigation = useNavigation();
  const fetchSaved = async () => {
    try {
      const user_response = await supabase
        .from("Recipes")
        .select("*")
        .eq("is_saved", true);
      setSaved(user_response.data);
      //console.log(mine);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Saved Recipes",
      headerTitleStyle: {
        fontFamily: "Prata-Regular",
        fontSize: 30,
        color: "black",
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            router.back({
              pathname: route,
            })
          }
          style={styles.iconButton}
        >
          <Icon name="chevron-back-sharp" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          numColumns={2}
          data={saved}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: route + "/recipe_details",
                  params: {
                    recipe_title: item.Name,
                    the_image: item.image_url,
                    servings: item.servings,
                    time: item.TotalTime,
                    difficulty: item.difficulty,
                    chef_name: item.AuthorName,
                  },
                })
              }
            >
              <RecipeBox
                title={item.Name}
                the_image={item.image_url}
                edit={false}
              ></RecipeBox>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    backgroundColor: "#FAF9F6",
  },
});
