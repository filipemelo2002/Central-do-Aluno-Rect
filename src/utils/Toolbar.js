import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Toolbar = ({ title }) => (
  <View style={styles.toolBar}>
    <Text style={styles.toolBarTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  toolBar: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
    maxHeight: 100,
    backgroundColor: "#149dff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  toolBarTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 20
  }
});

export default Toolbar;
