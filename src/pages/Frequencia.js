import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";

import MyPicker from "./components/MyPicker";
import HandleStorage from "../utils/AsyncStorage";
import ApiHandler from "../utils/api";
export default function Frequencia() {
  const [boletins, setBoletins] = useState([]);
  const [user, setUser] = useState("");
  const [selectedBoletin, setSelectedBoletin] = useState({});

  const Storage = new HandleStorage();
  useEffect(() => {
    async function loadBoletins() {
      const { userToken } = await Storage.getUser();
      const data = await Storage.getBoletins();
      setBoletins(data);
      setUser(userToken);
    }
    loadBoletins();
  }, []);
  useEffect(() => {
    async function getFrequencia() {
      const { boletimId, ano } = selectedBoletin;
      const api = new ApiHandler(user);
      const response = await api.getFrequencia(boletimId, ano);
      console.log(response);
    }

    getFrequencia();
  }, [selectedBoletin]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyPicker
        boletins={boletins}
        changedState={setSelectedBoletin}
        stateValue={selectedBoletin}
      />
    </SafeAreaView>
  );
}
