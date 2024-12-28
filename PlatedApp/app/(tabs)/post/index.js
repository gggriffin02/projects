import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from "react-native";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [flash, setFlash] = useState("off");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Navigate to details screen with the selected image
      router.push({
        pathname: "/post/details",
        params: { image: result.assets[0].uri },
      });
    }
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        // Navigate to details screen with the captured image
        router.push({
          pathname: "/post/details",
          params: { image: photo.uri },
        });
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleCameraFacing}
        >
          <Image source={require("assets/flip.png")} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => alert("flash is not hooked up sorry!")}
        >
          <Image
            source={require("assets/flash.png")}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraWrapper}>
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing={facing}
            flash={flash}
          />
        </View>
      </View>

      <View style={styles.captureContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
          <Image
            source={require("assets/photos.png")}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "#EEEEEE",
    backgroundColor: "#FAF9F6",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "serif",
  },
  iconButton: {
    padding: 8,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  iconText: {
    fontSize: 24,
  },
  cameraWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#FAF9F6",
  },
  cameraContainer: {
    height: 450,
    width: "100%",
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#B5300B",
  },
  camera: {
    flex: 1,
  },
  captureContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#DDDDDD",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
});
