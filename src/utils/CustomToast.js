import React from "react";
import { Animated, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    position: "absolute",
    bottom: 25,
    backgroundColor: "#00000095",
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 25
  },
  text: {
    color: "#fff",
    fontWeight: "200",
    fontSize: 17
  }
});
export const fadeTrigger = opacity => {
  return Animated.timing(opacity, {
    toValue: 1,
    duration: 1000
  });
};

export const fadeOut = opacity => {
  return Animated.timing(opacity, {
    toValue: 0,
    duration: 1000,
    delay: 1000
  });
};
export const timer = (fadeIn, fadeOut) => {
  console.log("Timer called");
  const timer = setTimeout(() => fadeIn.start(() => fadeOut.start()), 100);
  return () => clearTimeout(timer);
};
const CustomToast = ({ message, animation = 0 }) => {
  return (
    <Animated.View style={{ ...styles.container, opacity: animation }}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

export default CustomToast;
