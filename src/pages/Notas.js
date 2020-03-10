import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import Toolbar from "../utils/Toolbar";

import Icon from "react-native-vector-icons/AntDesign";
import MyPicker from "../utils/MyPicker";
import { getData } from "../utils/AsyncStorage";
import api from "../utils/api";
export default function Notas() {
  const [boletins, setBoletins] = useState([]);
  const [notas, setNotas] = useState({});
  const [selectedBoletin, setSelectedBoletin] = useState({});

  const [user, setUser] = useState("");

  useEffect(() => {
    async function getBoletins() {
      const { userToken } = await getData("user");
      const response = await api.get("/boletins", {
        headers: {
          userToken
        }
      });
      setBoletins(response.data);
      setUser(userToken);
    }
    getBoletins();
  }, []);
  useEffect(() => {
    async function getNotas() {
      const { boletimId, ano } = selectedBoletin;
      const response = await api.get(
        `/boletins/view?boletimId=${boletimId}&ano=${ano}`,
        {
          headers: {
            userToken: user
          }
        }
      );
      setNotas(response.data);
      console.log(notas);
    }
    if (user) {
      getNotas();
    }
  }, [selectedBoletin]);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Toolbar title="Notas" />
      <MyPicker
        boletins={boletins}
        changedState={setSelectedBoletin}
        stateValue={selectedBoletin}
      />
    </SafeAreaView>
  );
}
