import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  Alert,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import {
  GestureHandlerRootView,
  FlingGestureHandler,
  Directions,
  Pressable,
} from "react-native-gesture-handler";

import { supabase } from "backend/supabaseClient";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFilters } from "./FilterContext"; // Import the useFilters hook

// Dynamic dimensions so it fits on any screen size
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const FOLDER_HEIGHT = SCREEN_HEIGHT * 0.08; // Height of the full folder
const TAB_HEIGHT = SCREEN_HEIGHT * 0.029; // Height of just the tab
const INITIAL_MARGIN = FOLDER_HEIGHT - TAB_HEIGHT + 5; // Shows only the tab initially
const BOTTOM_MARGIN = -800;
const TOP_MARGIN = 1000;

const INVISIBLE_WIDTH = SCREEN_WIDTH - 120;
const LOW_WIDTH = SCREEN_WIDTH - 100;
const MEDIUM_WIDTH = SCREEN_WIDTH - 80;
const HIGH_WIDTH = SCREEN_WIDTH - 60;

const INVISIBLE_HEIGHT = INVISIBLE_WIDTH * 1.4;
const LOW_HEIGHT = LOW_WIDTH * 1.4;
const MEDIUM_HEIGHT = MEDIUM_WIDTH * 1.4;
const HIGH_HEIGHT = HIGH_WIDTH * 1.4;

const INVISIBLE_PLACEMENT = -21;
const LOW_PLACEMENT = -14;
const MEDIUM_PLACEMENT = -7;
const HIGH_PLACEMENT = 0;
const INVISIBLE_OPACITY = 0;
const LOW_OPACITY = 0.4;
const MEDIUM_OPACITY = 0.7;
const FADE_TIMING = 300;

export default function HomeScreen() {
  const router = useRouter();
  const { selectedFilters } = useFilters(); // Access the selected filters

  // Replace useSharedValue with Animated.Value
  const topFolderMargin = useRef(new Animated.Value(INITIAL_MARGIN)).current;
  const bottomCardMargin = useRef(new Animated.Value(0)).current;
  const invisibleCardOpacity = useRef(
    new Animated.Value(INVISIBLE_OPACITY)
  ).current;
  const lowCardOpacity = useRef(new Animated.Value(LOW_OPACITY)).current;
  const mediumCardOpacity = useRef(new Animated.Value(MEDIUM_OPACITY)).current;
  const invisibleCardHeight = useRef(
    new Animated.Value(INVISIBLE_HEIGHT)
  ).current;
  const lowCardHeight = useRef(new Animated.Value(LOW_HEIGHT)).current;
  const mediumCardHeight = useRef(new Animated.Value(MEDIUM_HEIGHT)).current;
  const invisibleCardWidth = useRef(
    new Animated.Value(INVISIBLE_WIDTH)
  ).current;
  const lowCardWidth = useRef(new Animated.Value(LOW_WIDTH)).current;
  const mediumCardWidth = useRef(new Animated.Value(MEDIUM_WIDTH)).current;
  const invisibleCardPlacement = useRef(
    new Animated.Value(INVISIBLE_PLACEMENT)
  ).current;
  const lowCardPlacement = useRef(new Animated.Value(LOW_PLACEMENT)).current;
  const mediumCardPlacement = useRef(
    new Animated.Value(MEDIUM_PLACEMENT)
  ).current;

  const [lineVisible, setLineVisible] = useState(false);
  const [recipes, setRecipes] = useState([{ Name: "test" }]); // State to hold recipes
  const [index, setIndex] = useState(0);

  // Fetch recipes based on selected filters
  const fetchRecipesData = async () => {
    try {
      let query = supabase.from("Recipes").select("*"); // Select all fields

      // Apply difficulty filter if it's not empty
      if (selectedFilters.difficulty) {
        query = query.eq("difficulty_1", selectedFilters.difficulty);
      }

      // Apply cuisine filter if it's not empty
      if (selectedFilters.cuisine) {
        query = query.eq("cuisine", selectedFilters.cuisine);
      }

      // Apply ingredients filter if there are selected ingredients
      if (selectedFilters.ingredients.length > 0) {
        selectedFilters.ingredients.forEach((ingredient) => {
          query = query.filter(
            "RecipeIngredientParts",
            "ilike",
            `%${ingredient}%`
          );
        });
      }

      const { data, error } = await query; // Execute the query

      if (error) {
        console.error("Error fetching recipes:", error.message); // Log the error message
        return [];
      }

      //console.log("Fetched Recipes:", data); // Log the fetched data
      return data;
    } catch (err) {
      console.error("Error in fetchRecipes:", err); // Log any unexpected errors
    }
  };

  // Add useEffect to fetch recipes when selected filters update
  useEffect(() => {
    const getRecipes = async () => {
      const fetchedRecipes = await fetchRecipesData(); // Fetch recipes based on filters
      setRecipes(fetchedRecipes); // Update state with fetched recipes
    };
    getRecipes(); // Call the function to fetch recipes
    setIndex(0);
  }, [selectedFilters]);

  // Add useEffect to log selected filters when they update
  useEffect(() => {
    //console.log("Selected Filters:", selectedFilters);
  }, [selectedFilters]); // Dependency array to trigger on updates

  // Extract only the values from the object
  // const values = Object.values(selectedFilters);
  // console.log(selectedFilters);

  function flattenMapValues(mapObject) {
    // Use Object.values to get all values from the map
    return Object.values(mapObject).flatMap((value) => {
      // If the value is an array, return the array; if not, return it as a single value
      if (Array.isArray(value)) {
        return value; // Flatten the array into individual elements
      }
      // Return the value if it's truthy (not empty string, undefined, null, etc.)
      return value ? [value] : [];
    });
  }

  const flattenedValues1 = flattenMapValues(selectedFilters);

  // // If some values are arrays (like "ingredients"), flatten them to render them as strings
  // const flattenedValues = values.flatMap((value) =>
  //   Array.isArray(value) ? value : [value]
  // );

  //console.log(recipes);

  const onFlingDown = () => {
    // Animate topFolderMargin to 0
    Animated.timing(topFolderMargin, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setLineVisible(true);

      // Animate bottomCardMargin
      Animated.timing(bottomCardMargin, {
        toValue: BOTTOM_MARGIN,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        setLineVisible(false);
        setIndex((prevIndex) => prevIndex + 1);

        // Delay and then return topFolderMargin back
        Animated.sequence([
          Animated.parallel([
            Animated.timing(topFolderMargin, {
              toValue: INITIAL_MARGIN,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardHeight, {
              toValue: LOW_HEIGHT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardWidth, {
              toValue: LOW_WIDTH,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardPlacement, {
              toValue: LOW_PLACEMENT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardHeight, {
              toValue: MEDIUM_HEIGHT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardWidth, {
              toValue: MEDIUM_WIDTH,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardPlacement, {
              toValue: MEDIUM_PLACEMENT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardHeight, {
              toValue: HIGH_HEIGHT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardWidth, {
              toValue: HIGH_WIDTH,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardPlacement, {
              toValue: HIGH_PLACEMENT,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardOpacity, {
              toValue: LOW_OPACITY,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardOpacity, {
              toValue: MEDIUM_OPACITY,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardOpacity, {
              toValue: 1,
              duration: FADE_TIMING,
              useNativeDriver: false,
            }),
          ]),
        ]).start(() => {
          // Once the entire sequence finishes, start another parallel animation
          Animated.parallel([
            Animated.timing(bottomCardMargin, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardHeight, {
              toValue: INVISIBLE_HEIGHT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardWidth, {
              toValue: INVISIBLE_WIDTH,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardPlacement, {
              toValue: INVISIBLE_PLACEMENT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardHeight, {
              toValue: LOW_HEIGHT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardWidth, {
              toValue: LOW_WIDTH,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardPlacement, {
              toValue: LOW_PLACEMENT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardHeight, {
              toValue: MEDIUM_HEIGHT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardWidth, {
              toValue: MEDIUM_WIDTH,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardPlacement, {
              toValue: MEDIUM_PLACEMENT,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(invisibleCardOpacity, {
              toValue: INVISIBLE_OPACITY,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(lowCardOpacity, {
              toValue: LOW_OPACITY,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(mediumCardOpacity, {
              toValue: MEDIUM_OPACITY,
              duration: 0,
              useNativeDriver: false,
            }),
          ]).start(async () => {
            // Make a call to update your Supabase database
            try {
              const { error } = await supabase
                .from("Recipes") // Replace "Recipes" with your table name
                .update({ is_saved: true }) // Replace with your actual update logic
                .eq("recipeid", recipes[index].recipeid); // Replace with your actual condition

              if (error) {
                console.error("Error updating database:", error.message);
              }
            } catch (err) {
              console.error("Error during database update:", err);
            }
          });
        });
      });
    });
  };

  const onFlingUp = () => {
    // Run the first animation
    Animated.timing(bottomCardMargin, {
      toValue: TOP_MARGIN,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      // Once the first animation finishes, update state
      setIndex((prevIndex) => prevIndex + 1);

      // Now run the parallel animations
      Animated.parallel([
        Animated.timing(invisibleCardHeight, {
          toValue: LOW_HEIGHT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(invisibleCardWidth, {
          toValue: LOW_WIDTH,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(invisibleCardPlacement, {
          toValue: LOW_PLACEMENT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(lowCardHeight, {
          toValue: MEDIUM_HEIGHT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(lowCardWidth, {
          toValue: MEDIUM_WIDTH,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(lowCardPlacement, {
          toValue: MEDIUM_PLACEMENT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(mediumCardHeight, {
          toValue: HIGH_HEIGHT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(mediumCardWidth, {
          toValue: HIGH_WIDTH,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(mediumCardPlacement, {
          toValue: HIGH_PLACEMENT,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(invisibleCardOpacity, {
          toValue: LOW_OPACITY,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(lowCardOpacity, {
          toValue: MEDIUM_OPACITY,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
        Animated.timing(mediumCardOpacity, {
          toValue: 1,
          duration: FADE_TIMING,
          useNativeDriver: false,
        }),
      ]).start(() => {
        // Once the parallel animations finish, run the next reset parallel
        Animated.parallel([
          Animated.timing(bottomCardMargin, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(invisibleCardHeight, {
            toValue: INVISIBLE_HEIGHT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(invisibleCardWidth, {
            toValue: INVISIBLE_WIDTH,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(invisibleCardPlacement, {
            toValue: INVISIBLE_PLACEMENT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(lowCardHeight, {
            toValue: LOW_HEIGHT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(lowCardWidth, {
            toValue: LOW_WIDTH,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(lowCardPlacement, {
            toValue: LOW_PLACEMENT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(mediumCardHeight, {
            toValue: MEDIUM_HEIGHT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(mediumCardWidth, {
            toValue: MEDIUM_WIDTH,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(mediumCardPlacement, {
            toValue: MEDIUM_PLACEMENT,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(invisibleCardOpacity, {
            toValue: INVISIBLE_OPACITY,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(lowCardOpacity, {
            toValue: LOW_OPACITY,
            duration: 0,
            useNativeDriver: false,
          }),
          Animated.timing(mediumCardOpacity, {
            toValue: MEDIUM_OPACITY,
            duration: 0,
            useNativeDriver: false,
          }),
        ]).start();
      });
    });
  };

  //TOGGLE THE CARD VERSUS NO CARDS LEFT
  let content_displayed = null;
  if (index >= recipes.length) {
    content_displayed = (
      <View style={styles.redBoxAlt}>
        <Text style={[styles.recipeTitle, { fontFamily: "Poppins-Regular" }]}>
          {"\n"}
          {"\n"}We're sorry... our database ran out of or doesn't have recipes
          associated with those filters!{"\n"} {"\n"}
          {"\n"}Please navigate back to filters and set new ones or set servings
          to 4-5 to swipe through all recipes!
        </Text>
      </View>
    );
  } else if (flattenedValues1.length === 0) {
    content_displayed = (
      <View style={styles.redBoxAlt}>
        <Text style={[styles.recipeTitle, { fontFamily: "Poppins-Regular" }]}>
          {"\n"}
          {"\n"}Welcome to Plated!{"\n"}
          {"\n"}Navigate to the filters icon in the top left of the screen and
          set your filters to start swiping. {"\n"}
          {"\n"}To swipe through all the recipes in our database set no filters
          and save!
        </Text>
      </View>
    );
  } else {
    content_displayed = (
      <View style={styles.redBox}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/(tabs)/home/recipe_details",
              params: {
                recipe_title: recipes[index].Name,
                the_image: recipes[index].image_url,
                servings: recipes[index].servings,
                time: recipes[index].TotalTime,
                difficulty: recipes[index].difficulty,
                chef_name: recipes[index].AuthorName,
                recipe_id: recipes[index].recipeid,
              },
            })
          }
        >
          <Image
            source={{ uri: recipes[index].image_url }}
            style={styles.recipeImage}
          />
        </Pressable>
        <View style={styles.redBoxContent}>
          <View style={styles.profileAndTitle}>
            <Image
              source={require("assets/chef_prof.png")}
              style={styles.profileImage}
            />
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.recipeTitle}
            >
              {recipes[index].Name}
            </Text>
          </View>

          {/* Recipe Details */}
          <View style={styles.recipeDetails}>
            <View style={styles.detailRow}>
              <Image
                source={require("assets/forkkk.png")}
                style={styles.icon}
              />
              <Text style={styles.detailText}>{recipes[index].servings}</Text>
            </View>

            <View style={styles.detailRow}>
              <Image
                source={require("assets/whiteclock.png")}
                style={styles.icon}
              />
              <Text style={styles.detailText}>
                {recipes[index]?.TotalTime?.slice(2)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Image
                source={require("assets/whitefire.png")}
                style={styles.icon}
              />
              <Text style={styles.detailText}>{recipes[index].difficulty}</Text>
            </View>

            <View style={styles.detailRow}>
              <Image
                source={require("assets/whitebookmark.png")}
                style={styles.icon}
              />
              <Text style={styles.detailText}>147</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        {/* Header */}
        <View style={[styles.header, { zIndex: 2 }]}>
          <Text style={[styles.title, { bottom: -10 }]}>Plated</Text>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "🚧 Whoops this feature is under construction! 🚧 Please go back and find your recipe manually."
              )
            }
          >
            <Image
              source={require("assets/magnifier.png")}
              style={[styles.searchIcon, { bottom: -5 }]}
            />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            zIndex: 1,
            // backgroundColor: "orange",
            paddingLeft: 5,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => router.push("/(tabs)/home/filters")}>
            <Image
              source={require("assets/filter.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
          <View style={styles.filter}>
            <Text style={styles.filterText}>Nut Allergy 🔒</Text>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
            data={flattenedValues1}
            //keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.filter}>
                <Text style={styles.filterText}>
                  {item}
                  {" ✓"}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Recipe Cards */}
        <View style={[styles.cardStack, { zIndex: 4 }]}>
          {/* Since these are static layers, just leave them as Views or Animated.View with no dynamic props */}
          <Animated.View
            style={[
              styles.stackLayer,
              {
                height: invisibleCardHeight,
                width: invisibleCardWidth,
                bottom: invisibleCardPlacement,
                opacity: invisibleCardOpacity, // apply opacity from Animated.Value directly
              },
            ]}
          />
          <Animated.View
            style={[
              styles.stackLayer,
              {
                height: lowCardHeight,
                width: lowCardWidth,
                bottom: lowCardPlacement,
                opacity: lowCardOpacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.stackLayer,
              {
                height: mediumCardHeight,
                width: mediumCardWidth,
                bottom: mediumCardPlacement,
                opacity: mediumCardOpacity,
              },
            ]}
          />

          <FlingGestureHandler
            direction={Directions.DOWN}
            onActivated={onFlingDown}
          >
            <FlingGestureHandler
              direction={Directions.UP}
              onActivated={onFlingUp}
            >
              <Animated.View
                style={[
                  styles.stackLayer,
                  {
                    height: HIGH_HEIGHT,
                    width: HIGH_WIDTH,
                    bottom: bottomCardMargin,
                    zIndex: 2,
                  },
                ]}
              >
                <View style={styles.cardInternal}>
                  {/* Red Box Overlay */}
                  {/* <View style={styles.redBox}> */}
                  {/* create a useEffect that when the recipe array is empty renders a card to reset filters */}
                  {/* Recipe Image */}
                  {content_displayed}
                  {/* </View> */}
                </View>
              </Animated.View>
            </FlingGestureHandler>
          </FlingGestureHandler>
        </View>

        {/* Redo button */}
        <TouchableOpacity
          style={[styles.redoButton, { zIndex: 6 }]}
          onPress={() =>
            alert(
              "🚧 Whoops redo is not functional right now! 🚧, re render the stack to go back!"
            )
          }
        >
          <Icon name="redo" size={20} color="#B5300B" />
        </TouchableOpacity>

        {/* Footer */}
        <View style={[styles.footer, { zIndex: 3 }]}>
          <Animated.View
            style={[styles.folderContainer, { top: topFolderMargin }]}
          >
            {/* <TouchableOpacity
              onPress={() => router.push("/pasdsdsntry")}
              style={[styles.buttonContainer, { zIndex: 1 }]}
            > */}
            <Image
              source={require("assets/swiping_images/saved_recipes_folder_cropped.png")}
              style={styles.savedRecipes}
            />
            {/* </TouchableOpacity> */}
          </Animated.View>
        </View>

        {/* Animation Line */}
        <View
          style={[
            {
              position: "absolute",
              height: 20,
              marginLeft: 15,
              marginRight: 15,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              width: HIGH_WIDTH + 20,
              bottom: 0,
              zIndex: 5,
              backgroundColor: lineVisible ? "#444" : "transparent",
            },
          ]}
        >
          <TouchableOpacity
            style={[
              {
                position: "absolute",
                height: 20,
                marginLeft: 15,
                marginRight: 15,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                width: 180,
                alignSelf: "center",
              },
            ]}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/home/saved_recipes_home",
              })
            }
          />
          <View />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    justifyContent: "space-between",
  },
  redBox: {
    flex: 1,
    height: HIGH_HEIGHT / 4.5,
    backgroundColor: "#B5300B",
  },
  redBoxAlt: {
    flex: 1,
    backgroundColor: "#B5300B",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 45,
  },
  footer: {
    width: "100%",
    height: FOLDER_HEIGHT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    overflow: "hidden",
  },
  cardStack: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - FOLDER_HEIGHT - 300,
  },
  stackLayer: {
    height: 520,
    width: 390,
    backgroundColor: "#B5300B",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  cardInternal: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 5,
    borderColor: "#B5300B",
    overflow: "hidden",
    backgroundColor: "#B5300B",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "Prata",
    marginHorizontal: 10,
  },
  searchIcon: {
    width: 27,
    height: 27,
    marginHorizontal: 20,
  },
  filtersContainer: {
    flexDirection: "row",
  },
  filter: {
    borderWidth: 1,
    borderColor: "#A52A2A",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#A52A2A",
  },
  filterIcon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: FOLDER_HEIGHT,
    overflow: "hidden",
    position: "absolute",
  },
  savedRecipes: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginBottom: -SCREEN_HEIGHT * 0.01,
    position: "absolute",
  },
  redoButton: {
    width: 20,
    height: 20,
    alignItems: "center",
    marginLeft: 15,
    transform: [{ scaleX: -1 }],
  },
  folderContainer: {
    width: "100%",
    height: FOLDER_HEIGHT,
  },
  recipeTitle: {
    flex: 1,
    fontSize: SCREEN_WIDTH * 0.0581,
    fontWeight: "bold",
    fontFamily: "Prata",
    color: "white",
    marginLeft: 16,
    numberOfLines: 2,
    ellipsizeMode: "tail",
  },

  profileAndTitle: {
    flexDirection: "row",
    alignItems: "flex-start",
    height: 70,
    position: "relative",
  },

  profileImage: {
    width: SCREEN_WIDTH * 0.1395,
    height: SCREEN_WIDTH * 0.1395,
    borderRadius: (SCREEN_WIDTH * 0.1395) / 2,
  },
  recipeImage: {
    width: "100%",
    height: HIGH_WIDTH * 1.05,
    resizeMode: "cover",
  },
  profileAndTitle: {
    flexDirection: "row",
    alignItems: "center",
  },

  recipeDetails: {
    flexDirection: "row",
    position: "absolute",
    bottom: 8,
    left: 16,
    right: 16,
    height: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 4,
  },
  detailText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins",
  },
  redBoxContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: HIGH_HEIGHT - HIGH_WIDTH * 1.05,
    padding: 16,
  },
});
