import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

const PANTRY_ICONS = [
  { name: "Bread", icon: "🍞" },
  { name: "Vegetables", icon: "🥕" },
  { name: "Fruits", icon: "🍎" },
  { name: "Meat", icon: "🥩" },
  { name: "Fish", icon: "🐟" },
  { name: "Dairy", icon: "🥛" },
  { name: "Spices", icon: "🌶️" },
];

export default function NewPantryItem() {
  const navigation = useNavigation();
  const [pantryName, setPantryName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [showIcons, setShowIcons] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "New Pantry",
      headerLeft: () => (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back-sharp" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSave = () => {
    // Add save logic here
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.iconSelector}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowIcons(!showIcons)}
          >
            {selectedIcon ? (
              <Text style={styles.selectedIcon}>{selectedIcon}</Text>
            ) : (
              <View style={styles.placeholderIcon}>
                <Icon name="image-outline" size={40} color="#666" />
                <Text style={styles.placeholderText}>Select Icon</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {showIcons && (
          <View style={styles.iconGrid}>
            {PANTRY_ICONS.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.iconGridItem}
                onPress={() => {
                  setSelectedIcon(item.icon);
                  setShowIcons(false);
                }}
              >
                <Text style={styles.iconGridEmoji}>{item.icon}</Text>
                <Text style={styles.iconGridName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Pantry Name"
          value={pantryName}
          onChangeText={setPantryName}
          placeholderTextColor="#999"
        />

        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Add items here..."
          value={ingredients}
          onChangeText={setIngredients}
          multiline
          placeholderTextColor="#999"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  main: {
    padding: 24,
  },
  iconSelector: {
    alignItems: "center",
    marginBottom: 24,
  },
  placeholderIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
  selectedIcon: {
    fontSize: 50,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#D32F2F",
    paddingVertical: 12,
    marginBottom: 24,
    fontSize: 18,
    fontFamily: "System",
  },
  multilineInput: {
    height: 50,
    textAlignVertical: "top",
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  iconGridItem: {
    width: "25%",
    alignItems: "center",
    padding: 12,
  },
  iconGridEmoji: {
    fontSize: 32,
  },
  iconGridName: {
    fontSize: 12,
    marginTop: 4,
    color: "#666",
  },
  saveButton: {
    marginRight: 16,
  },
  saveButtonText: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "600",
  },
});
