import React, {useState, useEffect, useContext} from "react";
import { View, Picker, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import ApiHandler from "../../utils/api";
import HandleStorage from "../../utils/AsyncStorage";
import BoletinContext from '../../context'

export default function MyPicker() {
  const {changeBoletin} = useContext(BoletinContext)

  const Storage = new HandleStorage()
  
  const [boletins, setBoletins] = useState([])
  const [selected, setSelected] = useState({})
  function onChange(boletin){
    setSelected(boletin)
    changeBoletin(boletin)
  }
  useEffect(() => {
    async function loadBoletins() {
      const { userToken } = await Storage.getUser();
      const api = new ApiHandler(userToken);
      const boletin = await api.getBoletins()
      onChange(boletin[0])
      setBoletins(boletin)
    }
    loadBoletins();
  }, []);
  
  return (
    <View style={styles.pickerRoot}>
      <Icon name="book" size={25} color="#149dff" />
      <Picker
        style={styles.picker}
        selectedValue={selected}
        onValueChange={(value, index) => onChange(boletins[index])}
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
