import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import Lottie from "lottie-react-native";

import MyPicker from "../utils/MyPicker";
import HandleStorage from "../utils/AsyncStorage";
import api from "../utils/api";
export default function Notas() {
  const [boletins, setBoletins] = useState([]);
  const [notas, setNotas] = useState({});
  const [selectedBoletin, setSelectedBoletin] = useState({});
  const [visible, setVisible] = useState("flex");
  const [user, setUser] = useState("");
  const Storage = new HandleStorage();
  useEffect(() => {
    async function loadBoletins() {
      const { userToken } = await Storage.getUser();
      let data = [];
      try {
        const response = await api.get("/boletins", {
          headers: {
            userToken
          }
        });
        data = response.data;
        Storage.setBoletins(response.data);
      } catch (err) {
        data = await Storage.getBoletins();
      }
      setBoletins(data);
      setUser(userToken);
    }
    loadBoletins();
  }, []);

  useEffect(() => {
    async function getNotas() {
      const { boletimId, ano } = selectedBoletin;
      let data = {};
      try {
        const response = await api.get(
          `/boletins/view?boletimId=${boletimId}&ano=${ano}`,
          {
            headers: {
              userToken: user
            }
          }
        );
        data = response.data;
        await Storage.setNotas(boletimId, data);
      } catch (err) {
        data = await Storage.getNotas(boletimId);
      }
      setVisible("none");
      setNotas(data);
    }
    if (user) {
      setVisible("flex");
      getNotas();
    }
  }, [selectedBoletin]);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <MyPicker
        boletins={boletins}
        changedState={setSelectedBoletin}
        stateValue={selectedBoletin}
      />
      <Lottie
        style={{
          maxWidth: 300,
          alignSelf: "center",
          display: visible
        }}
        resizeMode="contain"
        autoSize
        source={require("../utils/loading.json")}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
}
