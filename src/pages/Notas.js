import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Notas() {
  return (
    <View style={styles.container}>
      <Text>Notas</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
