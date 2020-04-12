import React, { useMemo, useContext } from "react";
import { SafeAreaView, StyleSheet, FlatList, View, Text } from "react-native";
import Lottie from "lottie-react-native";
import { Dimensions } from "react-native";

import { BannerAd } from "../utils/AdsHandler";
import HorarioContext from "../context";
var width = Dimensions.get("window").width;
export default function Horario() {
  const { horario } = useContext(HorarioContext);
  const displayLoading = useMemo(
    () => (horario.length === 0 ? "flex" : "none"),
    [horario]
  );
  const displayHorario = useMemo(
    () => (horario.length === 0 ? "none" : "flex"),
    [horario]
  );
  const week = ["SEG", "TERÇ", "QUA", "QUI", "SEX"];

  return (
    <SafeAreaView style={styles.container}>
      <BannerAd />
      <Lottie
        style={{
          maxWidth: 300,
          alignSelf: "center",
          display: displayLoading,
        }}
        resizeMode="contain"
        autoSize
        source={require("../utils/notfound.json")}
        autoPlay
        loop
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          display: displayHorario,
        }}
      >
        <FlatList
          horizontal
          showsVerticalScrollIndicator={false}
          data={week}
          renderItem={({ item, index }) => <Item title={item} index={index} />}
          keyExtractor={(item) => item}
        />
        {horario.map((semana, index) => (
          <FlatList
            horizontal
            key={index}
            showsVerticalScrollIndicator={false}
            data={semana}
            renderItem={({ item, index }) => {
              if (item.length !== 0) return <Item title={item} index={index} />;
            }}
            keyExtractor={(item, index) => item + index}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
function Item({ title, index }) {
  const bg = index % 2 === 0 ? "#a7b6cf" : "#f3f3f3";
  const color = index % 2 === 0 ? "#f3f3f3" : "#6c7b95";
  return (
    <View style={[styles.horarioContainer, { backgroundColor: bg }]}>
      <Text style={[styles.horarioText, { color }]}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  horarioContainer: {
    flex: 1,
    padding: 10,
    width: width / 5,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#404040",
    borderTopWidth: 0.5,
  },
  horarioText: {
    fontSize: 17,
  },
});
