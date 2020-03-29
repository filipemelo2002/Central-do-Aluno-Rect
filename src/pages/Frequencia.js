import React, { useState, useEffect, useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";

import MyPicker from "./components/MyPicker";
import HandleStorage from "../utils/AsyncStorage";
import ApiHandler from "../utils/api";

import Lottie from "lottie-react-native";
import MyChart, { sanitizePercent, sanitizeAmount } from "./components/MyChart";
export default function Frequencia() {
  const [boletins, setBoletins] = useState([]);
  const [user, setUser] = useState("");
  const [selectedBoletin, setSelectedBoletin] = useState({});
  const [frequencia, setFrequencia] = useState(null);
  const [percents, setPercents] = useState([0, 0, 0, 0]);
  const [sumFaltas, setSumFaltas] = useState([0, 0, 0, 0, 0]);
  const [isLoading, setIsLoading] = useState(true);

  const displayGraphs = useMemo(() => (isLoading ? "none" : "flex"), [
    isLoading
  ]);
  const displayLoading = useMemo(() => (isLoading ? "flex" : "none"), [
    isLoading
  ]);
  const Storage = new HandleStorage();
  useEffect(() => {
    async function loadBoletins() {
      setIsLoading(true);
      const { userToken } = await Storage.getUser();
      const data = await Storage.getBoletins();
      setBoletins(data);
      setUser(userToken);
      setIsLoading(false);
    }
    loadBoletins();
  }, []);
  useEffect(() => {
    async function getFrequencia() {
      const { boletimId, ano } = selectedBoletin;
      if (boletimId && ano) {
        setIsLoading(true);
        const api = new ApiHandler(user);
        const response = await api.getFrequencia(boletimId, ano);
        setFrequencia(response);
        setIsLoading(false);
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
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ display: displayGraphs }}>
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
          <Lottie
            style={{
              maxWidth: 300,
              alignSelf: "center",
              display: displayLoading
            }}
            resizeMode="contain"
            autoSize
            source={require("../utils/loading.json")}
            autoPlay
            loop
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
    justifyContent: "center",
    flexDirection: "column"
  }
});
