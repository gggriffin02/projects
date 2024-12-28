import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

export default function PostScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Plating...</Text>
      </View>

      {/* Recipe Section */}
      <View style={styles.recipeSection}>
        <Image
          source={require("assets/penne.png")} // Adjust path as needed
          style={styles.recipeImage}
        />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeLabel}>Recipe Name</Text>
          <View style={styles.recipeNameBox}>
            <Text style={styles.recipeNameText}>Penne a la Vodka</Text>
          </View>
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Image
                source={require("assets/fire.png")}
                style={styles.iconInsideCircle}
              />
              <Text style={styles.tagText}> Easy</Text>
            </View>
            <View style={styles.tag}>
              <Image
                source={require("assets/fork.png")}
                style={styles.iconInsideCircle}
              />
              <Text style={styles.tagText}> 4</Text>
            </View>
            <View style={styles.tag}>
              <Image
                source={require("assets/clock.png")}
                style={styles.iconInsideCircle}
              />
              <Text style={styles.tagText}> 30 min</Text>
            </View>
            <View style={styles.tag}>
              <Image
                source={require("assets/dinner.png")}
                style={styles.iconInsideCircle}
              />
              <Text style={styles.tagText}> Italian</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Ingredients Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.singleCircle}>
            <Image
              source={require("assets/wand.png")}
              style={styles.iconInsideCircle}
            />
            <Image
              source={require("assets/pdf.png")}
              style={styles.iconInsideCircle}
            />
            <Image
              source={require("assets/microphone.png")}
              style={styles.iconInsideCircle}
            />
          </View>
        </View>
        <TextInput
          style={[styles.textArea, styles.ingredientsBox]}
          multiline
          placeholder="List your ingredients here..."
        />
      </View>

      {/* Steps Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Steps</Text>
        <TextInput
          style={[styles.textArea, styles.stepsBox]}
          multiline
          placeholder="Write your steps here..."
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>POST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    padding: 10,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
    marginBottom: 24,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Prata",
    textAlign: "center",
    flex: 1,
  },
  recipeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  recipeImage: {
    width: 159,
    height: 168,
    borderWidth: 2,
    borderColor: "#A52A2A",
    marginRight: 16,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    fontFamily: "Poppins",
  },
  recipeNameBox: {
    borderWidth: 1,
    borderColor: "#A52A2A",
    padding: 8,
    marginBottom: 8,
  },
  recipeNameText: {
    fontSize: 18,
    fontFamily: "Poppins",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tag: {
    flexBasis: "48%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 20,
    marginBottom: 8,
    backgroundColor: "#FFF",
  },
  tagText: {
    fontSize: 14,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins",
  },
  singleCircle: {
    width: 85,
    height: 30,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFF",
  },
  iconInsideCircle: {
    width: 20,
    height: 20,
    marginHorizontal: 3,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 8,
    minHeight: 80,
    backgroundColor: "#FFF",
    textAlignVertical: "top",
    fontFamily: "Poppins",
  },
  ingredientsBox: {
    minHeight: 120,
  },
  stepsBox: {
    minHeight: 140,
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
  },
  postButton: {
    backgroundColor: "#A52A2A",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    alignItems: "center",
  },
  postButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Poppins",
  },
});
