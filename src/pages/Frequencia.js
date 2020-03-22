import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";

import MyPicker from "./components/MyPicker";
import HandleStorage from "../utils/AsyncStorage";
import ApiHandler from "../utils/api";

import MyChart, { sanitizePercent, sanitizeAmount } from "./components/MyChart";
export default function Frequencia() {
  const [boletins, setBoletins] = useState([]);
  const [user, setUser] = useState("");
  const [selectedBoletin, setSelectedBoletin] = useState({});
  const [frequencia, setFrequencia] = useState(null);
  const [percents, setPercents] = useState([0, 0, 0, 0]);
  const [sumFaltas, setSumFaltas] = useState([0, 0, 0, 0, 0]);

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
      if (boletimId && ano) {
        const api = new ApiHandler(user);
        const response = await api.getFrequencia(boletimId, ano);
        setFrequencia(response);
      }
    }
    getFrequencia();
  }, [selectedBoletin]);

  useEffect(() => {
    function sanitizeData() {
      setPercents(sanitizePercent(frequencia));
      setSumFaltas(sanitizeAmount(frequencia));
    }
    if (frequencia != null) {
      sanitizeData();
    }
  }, [frequencia]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyPicker
        boletins={boletins}
        changedState={setSelectedBoletin}
        stateValue={selectedBoletin}
      />
      <ScrollView>
        <View style={styles.container}>
          <MyChart
            title="Porcentagem de Faltas por Bimestre"
            values={percents}
            ySuffix="%"
          />
          <MyChart
            title="Quantidade de Faltas por Bimestre"
            values={sumFaltas}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    paddingTop: 10,
    flexDirection: "column"
  }
});
