import React from "react";
import { View, Picker, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function MyPicker({ boletins, changedState, stateValue }) {
  return (
    <View style={styles.pickerRoot}>
      <Icon name="book" size={25} color="#149dff" />
      <Picker
        style={styles.picker}
        selectedValue={stateValue}
        onValueChange={value => changedState(value)}
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
    width: Dimensions.get("screen").width,
    height: 60,
    marginTop: 90,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 15
  },
  picker: {
    flex: 1
  }
});
