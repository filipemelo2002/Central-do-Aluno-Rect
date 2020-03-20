import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";

import MyPicker from "./components/MyPicker";
import HandleStorage from "../utils/AsyncStorage";
import ApiHandler from "../utils/api";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
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
    function sanitizePercent() {
      const arrayPercent = [];
      arrayPercent.push(frequencia.percent.perc1);
      arrayPercent.push(frequencia.percent.perc2);
      arrayPercent.push(frequencia.percent.perc3);
      arrayPercent.push(frequencia.percent.perc4);
      setPercents(arrayPercent);

      const sumFrequencias = [];
      const f1 = [];
      const f2 = [];
      const f3 = [];
      const f4 = [];
      frequencia.details.forEach(materia => {
        f1.push(materia.fnj_p1 + materia.fj_p1);
        f2.push(materia.fnj_p2 + materia.fj_p2);
        f3.push(materia.fnj_p3 + materia.fj_p3);
        f4.push(materia.fnj_p4 + materia.fj_p4);
      });
      sumFrequencias.push(f1.reduce((prev, next) => prev + next));
      sumFrequencias.push(f2.reduce((prev, next) => prev + next));
      sumFrequencias.push(f3.reduce((prev, next) => prev + next));
      sumFrequencias.push(f4.reduce((prev, next) => prev + next));
      sumFrequencias.push(sumFrequencias.reduce((prev, next) => prev + next));
      setSumFaltas(sumFrequencias);
    }
    if (frequencia) {
      sanitizePercent();
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
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>
              Percentual de faltas por Bimestre
            </Text>
            <BarChart
              data={{
                labels: [
                  "1º Bimestre",
                  "2º Bimestre",
                  "3º Bimestre",
                  "4º Bimestre"
                ],
                datasets: [
                  {
                    data: percents
                  }
                ],
                legend: percents
              }}
              width={screenWidth - 10} // from react-native
              height={220}
              yAxisSuffix="%"
              fromZero={true}
              showBarTops={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 120, 62, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0 , ${opacity})`,
                style: {
                  borderRadius: 5
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#81f5ff"
                }
              }}
              style={{
                marginVertical: 8,
                marginHorizontal: 15,
                borderRadius: 5
              }}
            />
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>
              Quantidade de faltas por Bimestre
            </Text>
            <BarChart
              data={{
                labels: ["1º", "2º", "3º", "4º", "Total"],
                datasets: [
                  {
                    data: sumFaltas,
                    strokeWidth: 2 // optional
                  }
                ]
              }}
              width={screenWidth} // from react-native
              height={220}
              fromZero={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                decimalPlaces: 0,
                backgroundColor: "#fff",
                backgroundGradientFrom: "#ffff",
                backgroundGradientTo: "#fff", // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(72, 19, 128, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 5
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2"
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 5
              }}
            />
          </View>
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
  },
  chartContainer: {
    backgroundColor: "#fff",
    margin: 7,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  chartTitle: {
    fontSize: 17,
    fontWeight: "100",
    color: "#3c3c3c"
  }
});
