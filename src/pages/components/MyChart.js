import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { BarChart } from "react-native-chart-kit";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;


export default function MyChart({
  labels = ["1º", "2º", "3º", "4º"],
  values = [0, 0, 0, 0],
  title,
  ySuffix = ""
}) {
  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartTitleContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
      </View>
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: values
            }
          ]
        }}
        width={screenWidth-30}
        height={220}
        yAxisSuffix={ySuffix}
        fromZero={true}
        showBarTops={true}
        yAxisInterval={1}
        chartConfig={chartConfig}
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
    borderRadius: 5,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2"
  }
};

const colour = [
  "#505bda",
  "#f45905",
  "#1089ff",
  "#233567",
  "#c83660",
  "#ffbd39",
  "#21aa93",
  "#f7aa00",
  "#fdb44b"
];

const styles = StyleSheet.create({
  chartContainer: {
    flex:1,
    backgroundColor: "#fff",
    margin: 2,
    marginTop:15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },chartTitleContainer:{
    flex:1,
    alignSelf:"stretch",
    backgroundColor: colour[Math.floor(Math.random() * colour.length)],
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "100",
    color: "#fff",
    fontWeight: "bold"
  }
});
