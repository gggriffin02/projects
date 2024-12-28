import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
//import ImagePicker from "react-native-image-crop-picker";

import { supabase } from "backend/supabaseClient";

import { postRecipeToDatabase } from "./recipePosting";

export default function Details() {
  const router = useRouter();
  const { image } = useLocalSearchParams();

  // State hooks for form inputs
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  // State for filter selections
  const [difficulty, setDifficulty] = useState("Easy");
  const [servings, setServings] = useState("4");
  const [time, setTime] = useState("30 min");
  const [cuisine, setCuisine] = useState("Italian");

  // State for controlling dropdowns
  const [activeDropdown, setActiveDropdown] = useState(null);

  // State for focus management
  const [focusedInput, setFocusedInput] = useState(null);

  // Dropdown options
  const difficultyOptions = ["Easy", "Medium", "Hard"];
  const servingsOptions = ["2", "4", "6", "8"];
  const timeOptions = ["15 min", "30 min", "45 min", "60 min"];
  const cuisineOptions = [
    "Italian",
    "Chinese",
    "Mexican",
    "Indian",
    "Japanese",
  ];

  const handlePost = async () => {
    // Check if all required fields are filled
    if (!recipeName || !ingredients || !steps) {
      alert("Please fill out all fields before posting!");
      return;
    }

    console.log("Recipe data before posting:", {
      recipeName,
      ingredients,
      steps,
      image,
      filters: {
        difficulty,
        servings,
        time,
        cuisine,
      },
    });

    // Prepare the recipe data to be posted
    const recipeData = {
      Name: recipeName,
      is_mine: true, // Adjust this value as necessary
      under_construction: true, // Adjust this value as necessary
      image_url: image,
    };

    try {
      // Check if image is provided and handle upload
      let publicURL = null;

      if (image) {
        console.log("Starting image upload...");

        // Fetch the image and convert it to Base64
        const response = await fetch(image);
        const blob = await response.blob();
        const reader = new FileReader();

        publicURL = await new Promise((resolve, reject) => {
          reader.onloadend = async () => {
            const base64Image = reader.result; // This will be the Base64 string

            const fileName = `${Date.now()}_${recipeName}.jpeg`;
            console.log("File name for upload:", fileName);

            // Create a FormData object
            const formData = new FormData();
            formData.append("file", {
              uri: base64Image,
              name: fileName,
              type: "image/jpeg",
            });

            const { data: uploadData, error: uploadError } =
              await supabase.storage
                .from("Recipes")
                .upload(fileName, formData, {
                  cacheControl: "3600",
                  upsert: false,
                });

            if (uploadError) {
              console.error("Error uploading image:", uploadError);
              reject(uploadError);
            } else {
              console.log("Upload successful:", uploadData);
            }

            // Construct the public URL manually
            const projectId = "yribjypwwexuqoravaph"; // Replace with your actual project ID
            const bucketName = "Recipes"; // Your bucket name
            const filePath = `${bucketName}/${fileName}`;
            const publicURL = `https://yribjypwwexuqoravaph.supabase.co/storage/v1/object/public/${filePath}?t=${new Date().toISOString()}`;

            console.log("Public URL obtained:", publicURL);
            resolve(publicURL); // Resolve the promise with the constructed public URL
          };

          reader.readAsDataURL(blob); // Convert blob to Base64
        });
      }

      // Update the recipe data with the public URL
      recipeData.image_url = publicURL;

      // Log the recipe data to check the image_url
      console.log("Recipe data after obtaining public URL:", recipeData);

      // Call the function to post the recipe to the database
      const { error: dbError } = await postRecipeToDatabase(recipeData);

      if (dbError) {
        console.error("Error posting recipe:", dbError);
        alert("Failed to post recipe. Please try again.");
      } else {
        alert("Recipe Posted!");
        router.back();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred.");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setActiveDropdown(null);
    setFocusedInput(null);
  };

  // Function to render dropdown content
  const renderDropdown = (options, currentValue, onSelect, title) => {
    return (
      <Modal
        visible={true}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setActiveDropdown(null)}
      >
        <TouchableWithoutFeedback onPress={() => setActiveDropdown(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownTitle}>{title}</Text>
              <ScrollView>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.dropdownItem,
                      currentValue === option && styles.selectedItem,
                    ]}
                    onPress={() => {
                      onSelect(option);
                      setActiveDropdown(null);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        currentValue === option && styles.selectedItemText,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.recipeSection}>
          {image ? (
            <Image source={{ uri: image }} style={styles.recipeImage} />
          ) : (
            <Image style={styles.recipeImage} />
          )}
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeLabel}>Recipe Name</Text>
            <View
              style={[
                styles.recipeNameBox,
                focusedInput === "recipeName" && styles.focusedInput,
              ]}
            >
              <TextInput
                style={styles.recipeNameText}
                value={recipeName}
                onChangeText={setRecipeName}
                placeholder="Enter recipe name..."
                onFocus={() => setFocusedInput("recipeName")}
                onBlur={() => setFocusedInput(null)}
                onTouchStart={() => setFocusedInput("recipeName")}
              />
            </View>
            <View style={styles.tagsContainer}>
              <TouchableOpacity
                style={styles.tag}
                onPress={() => setActiveDropdown("difficulty")}
              >
                <Image
                  source={require("assets/fire.png")}
                  style={styles.iconInsideCircle}
                />
                <Text style={styles.tagText}>{difficulty}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tag}
                onPress={() => setActiveDropdown("servings")}
              >
                <Image
                  source={require("assets/fork.png")}
                  style={styles.iconInsideCircle}
                />
                <Text style={styles.tagText}>{servings}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tag}
                onPress={() => setActiveDropdown("time")}
              >
                <Image
                  source={require("assets/clock.png")}
                  style={styles.iconInsideCircle}
                />
                <Text style={styles.tagText}>{time}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tag}
                onPress={() => setActiveDropdown("cuisine")}
              >
                <Image
                  source={require("assets/dinner.png")}
                  style={styles.iconInsideCircle}
                />
                <Text style={styles.tagText}>{cuisine}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Render active dropdown */}
        {activeDropdown === "difficulty" &&
          renderDropdown(
            difficultyOptions,
            difficulty,
            setDifficulty,
            "Select Difficulty"
          )}
        {activeDropdown === "servings" &&
          renderDropdown(
            servingsOptions,
            servings,
            setServings,
            "Select Servings"
          )}
        {activeDropdown === "time" &&
          renderDropdown(timeOptions, time, setTime, "Select Time")}
        {activeDropdown === "cuisine" &&
          renderDropdown(cuisineOptions, cuisine, setCuisine, "Select Cuisine")}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <TouchableOpacity
              onPress={() =>
                alert(
                  "🚧whoops this feature is under construction!🚧, please return back"
                )
              }
            >
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
            </TouchableOpacity>
          </View>
          <TextInput
            style={[
              styles.textArea,
              styles.ingredientsBox,
              focusedInput === "ingredients" && styles.focusedInput,
            ]}
            multiline
            placeholder="List your ingredients here..."
            value={ingredients}
            onChangeText={setIngredients}
            onFocus={() => setFocusedInput("ingredients")}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Steps</Text>
          <TextInput
            style={[
              styles.textArea,
              styles.stepsBox,
              focusedInput === "steps" && styles.focusedInput,
            ]}
            multiline
            placeholder="Write your steps here..."
            value={steps}
            onChangeText={setSteps}
            onFocus={() => setFocusedInput("steps")}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.postButtonText}>POST</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  focusedInput: {
    borderColor: "#A52A2A",
    borderWidth: 2,
    shadowColor: "#A52A2A",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Prata",
    textAlign: "center",
    flex: 1,
  },
  recipeSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  recipeImage: {
    width: 140,
    height: 150,
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
    marginBottom: 12,
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
    backgroundColor: "#FFF",
    textAlignVertical: "top",
    fontFamily: "Poppins",
  },
  ingredientsBox: {
    minHeight: 100,
  },
  stepsBox: {
    minHeight: 120,
  },
  footer: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
    maxHeight: "50%",
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  selectedItem: {
    backgroundColor: "#A52A2A20",
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  selectedItemText: {
    color: "#A52A2A",
    fontWeight: "600",
  },
});
