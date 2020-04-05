import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { BarChart } from "react-native-chart-kit";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;


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
