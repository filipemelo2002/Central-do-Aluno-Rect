import React, { useState, useEffect, useMemo, useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";

import MyPicker from "./components/MyPicker";
import HandleStorage from "../utils/AsyncStorage";
import ApiHandler from "../utils/api";

import Lottie from "lottie-react-native";
import MyChart from "./components/MyChart";
import BoletinsContext from "../context";
import { BannerAd } from "../utils/AdsHandler";
export default function Frequencia() {
  const { boletins } = useContext(BoletinsContext);
  const [selectedBoletin, setSelectedBoletin] = useState({});
  const [frequencia, setFrequencia] = useState(null);
  const [percents, setPercents] = useState([0, 0, 0, 0]);
  const [sumFaltas, setSumFaltas] = useState([0, 0, 0, 0, 0]);
  const [isLoading, setIsLoading] = useState(true);

  const displayGraphs = useMemo(() => (isLoading ? "none" : "flex"), [
    isLoading,
  ]);
  const displayLoading = useMemo(() => (isLoading ? "flex" : "none"), [
    isLoading,
  ]);

  function changeBoletin(boletin) {
    setSelectedBoletin(boletin);
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
      const { percent, details } = frequencia;
      const { perc1, perc2, perc3, perc4 } = percent;
      const { sum_p1, sum_p2, sum_p3, sum_p4, sum_total } = details;
      setPercents([perc1, perc2, perc3, perc4]);
      setSumFaltas([sum_p1, sum_p2, sum_p3, sum_p4, sum_total]);
    }
    if (frequencia != null) {
      sanitizeData();
    }
  }, [frequencia]);
  return (
    <BoletinsContext.Provider value={{ changeBoletin }}>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <MyPicker boletins={boletins} />
        <BannerAd />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Lottie
            style={{
              maxWidth: 300,
              display: displayLoading,
              alignSelf: "center",
            }}
            resizeMode="contain"
            autoSize
            source={require("../utils/loading.json")}
            autoPlay
            loop
          />
          <ScrollView
            style={{ flex: 1, display: displayGraphs }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={{ flex: 1 }}>
                <MyChart
                  title="Percentual de Faltas por Bimestre"
                  values={percents}
                  ySuffix="%"
                />
                <MyChart
                  title="Quantidade de Faltas por Bimestre"
                  labels={["1º", "2º", "3º", "4º", "Total"]}
                  values={sumFaltas}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </BoletinsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    justifyContent: "center",
    flexDirection: "column",
  },
});
