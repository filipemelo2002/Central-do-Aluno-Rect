import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { BarChart } from "react-native-chart-kit";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export const sanitizePercent = frequencia => {
  const arrayPercent = [];
  arrayPercent.push(frequencia.percent.perc1);
  arrayPercent.push(frequencia.percent.perc2);
  arrayPercent.push(frequencia.percent.perc3);
  arrayPercent.push(frequencia.percent.perc4);

  return arrayPercent;
};

export const sanitizeAmount = frequencia => {
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
  return sumFrequencias;
};

export default function MyChart({
  labels = ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"],
  values = [0, 0, 0, 0],
  title,
  ySuffix = ""
}) {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: values
            }
          ]
        }}
        width={screenWidth - 10}
        height={220}
        yAxisSuffix={ySuffix}
        fromZero={true}
        showBarTops={true}
        yAxisInterval={1}
        chartConfig={chartConfig}
        style={styles.chartStyles}
      />
    </View>
  );
}

const chartConfig = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(66, 72, 116, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0 , ${opacity})`,
  style: {
    borderRadius: 5
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2"
  }
};
const styles = StyleSheet.create({
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
    color: "#3c3c3c",
    fontWeight: "bold"
  },
  chartStyles: {
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 5
  }
});
