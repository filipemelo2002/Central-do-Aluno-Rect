import React from "react";
import { View, Picker, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function MyPicker({ boletins, changedState, stateValue }) {
  return (
    <View style={styles.pickerRoot}>
      <Icon name="book" size={25} color="#149dff" />
      <Picker
        style={styles.picker}
        selectedValue={stateValue}
        onValueChange={(value, index) => changedState(boletins[index])}
      >
        {boletins.map((boletin, index) => (
          <Picker.Item label={boletin.label} value={boletin} key={index} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerRoot: {
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 15,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  picker: {
    flex: 1
  }
});
