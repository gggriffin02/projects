import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Plated</Text>
          <TouchableOpacity>
            <Image
              source={require("assets/magnifier.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
        >
          {/* Filter Icon */}
          <TouchableOpacity style={styles.filterIconWrapper}>
            <Image
              source={require("assets/filter.png")}
              style={styles.filterIcon}
            />
          </TouchableOpacity>

          <View style={styles.filter}>
            <Text style={styles.filterText}>Nut Allergy</Text>
          </View>
          <View style={styles.filter}>
            <Text style={styles.filterText}>Gluten Free</Text>
          </View>
          <View style={styles.filter}>
            <Text style={styles.filterText}>{"<30 min ✓"}</Text>
          </View>
          <View style={styles.filter}>
            <Text style={styles.filterText}>Novice</Text>
          </View>
        </ScrollView>

        {/* Recipe Card */}
        <View style={styles.cardStack}>
          <View style={styles.stackLayer3} />
          <View style={styles.stackLayer2} />
          <View style={styles.stackLayer1} />
          <View style={styles.imageContainer}>
            <Image
              source={require("assets/recipe_images/recipe_image_7.jpeg")}
              style={styles.recipeImage}
            />
            <View style={styles.blurOverlay}>
              <View style={styles.overlayContent}>
                <View style={styles.profileContainer}>
                  <Image
                    source={require("assets/personprofile.png")}
                    style={styles.profileImage}
                  />
                </View>
                <Text style={styles.recipeTitle}>Zuppa Di Fagioli</Text>
              </View>
              <View style={styles.recipeDetailsOverlay}>
                <Image
                  source={require("assets/forkkk.png")}
                  style={styles.icon}
                />
                <Text style={styles.detailText}>4 people</Text>
                <Image
                  source={require("assets/whiteclock.png")}
                  style={styles.icon}
                />
                <Text style={styles.detailText}>1 hr</Text>
                <Image
                  source={require("assets/whitefire.png")}
                  style={styles.icon}
                />
                <Text style={styles.detailText}>easy</Text>
                <Image
                  source={require("assets/whitebookmark.png")}
                  style={styles.icon}
                />
                <Text style={styles.detailText}>147</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Redo button */}
      <TouchableOpacity style={styles.redoButton}>
        <Image source={require("assets/redo.png")} style={styles.redoIcon} />
      </TouchableOpacity>

      {/* Saved Recipes Button */}

      <TouchableOpacity style={styles.buttonContainer}>
        <Image
          source={require("assets/saved.png")}
          style={styles.savedRecipesButton}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 35,
    marginBottom: 15, 
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Prata",
  },
  searchIcon: {
    width: 24, 
    height: 24, 
    marginHorizontal: 3,
  },
  filtersContainer: {
    flexDirection: "row",
    marginBottom: 15, 
  },
  filter: {
    backgroundColor: "#FFEDE1",
    borderWidth: 1,
    borderColor: "#A52A2A",
    borderRadius: 20,
    paddingVertical: 4, 
    paddingHorizontal: 12, 
    marginRight: 8, 
  },
  filterText: {
    fontSize: 13,
    fontFamily: "Poppins",
    color: "#A52A2A",
  },
  cardStack: {
    position: "relative",
    marginBottom: 15,
    marginHorizontal: 5,
  },
  stackLayer3: {
    position: "absolute",
    bottom: -8, 
    left: 12, 
    right: 12, 
    height: 450, 
    backgroundColor: "#8B0000",
    opacity: 0.3,
  },
  stackLayer2: {
    position: "absolute",
    bottom: -4, 
    left: 6, 
    right: 6, 
    height: 450, 
    backgroundColor: "#8B0000",
    opacity: 0.5,
  },
  stackLayer1: {
    position: "absolute",
    bottom: 0,
    left: 3, 
    right: 3, 
    height: 450, 
    backgroundColor: "#8B0000",
  },
  imageContainer: {
    position: "relative",
    borderWidth: 4,
    borderColor: "#A52A2A",
    overflow: "hidden",
    backgroundColor: "white",
  },
  recipeImage: {
    width: "100%",
    height: 450, 
    borderRadius: 8,
  },
  blurOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100, 
    backgroundColor: "#A52A2A",
    paddingHorizontal: 12, 
    paddingVertical: 8, 
  },
  recipeTitle: {
    fontSize: 30, 
    color: "white",
    fontWeight: "bold",
    fontFamily: "Prata",
    marginBottom: 8,
  },
  profileContainer: {
    width: 45, 
    height: 45,
    borderRadius: 45, 
    overflow: "hidden",
    marginRight: 8, 
    borderWidth: 1,
    borderColor: "#FFF",
  },
  filterIcon: {
    width: 24, 
    height: 24, 
  },
  icon: {
    width: 14, 
    height: 14, 
    marginRight: 4, 
  },
  detailText: {
    fontSize: 14, 
    fontFamily: "Poppins",
    color: "white",
  },
  buttonContainer: {
    padding: 8, 
    backgroundColor: "#FAF9F6",
    alignItems: "center",
  },
  savedRecipesButton: {
    width: 180, 
    height: 40, 
    resizeMode: "contain",
  },
  redoButton: {
    width: 60, 
    height: 60, 
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  redoIcon: {
    color: "#A52A2A",
    fontSize: 22, 
  },
});
