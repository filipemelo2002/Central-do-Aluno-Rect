import React, { useState, useEffect, useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";

import MyPicker from "./components/MyPicker";
import HandleStorage from "../utils/AsyncStorage";
import ApiHandler from "../utils/api";

import Lottie from "lottie-react-native";
import MyChart from "./components/MyChart";
import BoletinsContext from '../context'
export default function Frequencia() {
  const [selectedBoletin, setSelectedBoletin] = useState({});
  const [frequencia, setFrequencia] = useState(null);
  const [percents, setPercents] = useState([0, 0, 0, 0]);
  const [sumFaltas, setSumFaltas] = useState([0, 0, 0, 0,0])
  const [isLoading, setIsLoading] = useState(true);

  const displayGraphs = useMemo(() => (isLoading ? "none" : "flex"), [
    isLoading
  ]);
  const displayLoading = useMemo(() => (isLoading ? "flex" : "none"), [
    isLoading
  ]);

  function changeBoletin(boletin){
    setSelectedBoletin(boletin)
  }

  const Storage = new HandleStorage();

  useEffect(() => {
    async function getFrequencia() {
      const { userToken } = await Storage.getUser();
      const { boletimId, ano } = selectedBoletin;
      if (boletimId && ano) {
        setIsLoading(true);
        const api = new ApiHandler(userToken);
        const response = await api.getFrequencia(boletimId, ano);
        setFrequencia(response);
        setIsLoading(false);
      }
    }
    if (selectedBoletin) {
      getFrequencia();
    }
  }, [selectedBoletin]);

  useEffect(() => {
    function sanitizeData() {
      const {percent, details}= frequencia
      const {perc1,perc2,perc3,perc4} = percent
      const {sum_p1,sum_p2,sum_p3,sum_p4,sum_total} = details
      setPercents([perc1,perc2,perc3,perc4]);
      setSumFaltas([sum_p1,sum_p2,sum_p3,sum_p4,sum_total]);
    }
    if (frequencia != null) {
      sanitizeData();
    }
  }, [frequencia]);
  return (
    <BoletinsContext.Provider value={{changeBoletin}}>
      <SafeAreaView style={{ flex: 1 }}>
        <MyPicker/>
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
    </BoletinsContext.Provider>
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
