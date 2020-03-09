import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Picker,
  StyleSheet,
  View,
  Dimensions
} from "react-native";
import Toolbar from "../utils/Toolbar";

import Icon from "react-native-vector-icons/AntDesign";

import { getData } from "../utils/AsyncStorage";
import api from "../utils/api";
export default function Notas() {
  const [boletins, setBoletins] = useState([]);

  useEffect(() => {
    async function getBoletins() {
      const { userToken } = await getData("user");
      const response = await api.get("/boletins", {
        headers: {
          userToken
        }
      });
      console.log(response.data);
      setBoletins(response.data);
    }
    getBoletins();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Toolbar title="Notas" />
      <View style={styles.pickerRoot}>
        <Icon name="book" size={25} color="#149dff" />
        <Picker style={styles.picker} mode="dialog">
          {boletins.map((boletin, index) => (
            <Picker.Item
              label={boletin.label}
              value={boletin.ano}
              key={index}
            />
          ))}
        </Picker>
      </View>
    </SafeAreaView>
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
