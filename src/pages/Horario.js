import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import HandleStorage from "../utils/AsyncStorage";
import ApiHandler from "../utils/api";

export default function Horario() {
  const Storage = new HandleStorage();
  const [horario, setHorario] = useState([]);

  useEffect(() => {
    async function getHorario() {
      const { userToken } = await Storage.getUser();
      const api = new ApiHandler(userToken);
      const horario = await api.getHorario();

      setHorario(horario);
    }

    getHorario();
  }, []);
  return <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
}
