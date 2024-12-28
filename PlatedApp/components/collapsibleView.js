import React, { useState } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const CollapsibleView = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapse = () => {
    if (collapsed) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setCollapsed(!collapsed);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View>
      <TouchableOpacity onPress={toggleCollapse}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={{ height: heightInterpolate }}>
        {children}
      </Animated.View>
    </View>
  );
};

export default CollapsibleView;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: "black",
    fontFamily: "Prata-Regular",
  },
});
