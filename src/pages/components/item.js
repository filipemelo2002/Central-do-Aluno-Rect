import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { Container } from './styles';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width;
function ItemList({
  materia,
  nota_p1,
  nota_p2,
  nota_p3,
  nota_p4,
  nota_rec,
  nota_rf
}) {
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
  function lidarPontosNecessarios(...notas) {
    const notasNumber = [];
    notas.forEach(nota => {
      if (parseFloat(nota)) {
        notasNumber.push(Number(nota));
      }
    });
    if (!notasNumber.length > 0) return 24;
    const soma = notasNumber.reduce((prev, next) => {
      return prev + next;
    });

    const subtracao = 24 - soma;
    if (subtracao > 0) {
      return subtracao;
    }
    return 0;
  }
  const necessary = lidarPontosNecessarios(nota_p1, nota_p2, nota_p3, nota_p4);
  return (
    <View style={styles.root}>
      <View
        style={{
          ...styles.header,
          backgroundColor: colour[Math.floor(Math.random() * colour.length)]
        }}
      >
        <Text style={styles.headerTitle}>{materia}</Text>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.nota_area}>
          <View style={styles.bimestreText}>
            <Icon
              name="flag-variant"
              size={25}
              color={necessary <= 0 ? "#0be333" : "#e30b0b"}
            />
            <Text style={{ fontSize: 15 }}>Pontos necessários</Text>
          </View>
          <Text style={{ fontSize: 17 }}>{necessary}</Text>
        </View>
        <View style={styles.nota_area}>
          <View style={styles.bimestreText}>
            <Icon name="flag-variant" size={25} color="#3b3b3b" />
            <Text style={{ fontSize: 15 }}>1º Bimestre</Text>
          </View>
          <Text style={{ fontSize: 17 }}>{nota_p1}</Text>
        </View>
        <View style={styles.nota_area}>
          <View style={styles.bimestreText}>
            <Icon name="flag-variant" size={25} color="#3b3b3b" />
            <Text style={{ fontSize: 15 }}>2º Bimestre</Text>
          </View>
          <Text style={{ fontSize: 17 }}>{nota_p2}</Text>
        </View>
        <View style={styles.nota_area}>
          <View style={styles.bimestreText}>
            <Icon name="flag-variant" size={25} color="#3b3b3b" />
            <Text style={{ fontSize: 15 }}>3º Bimestre</Text>
          </View>
          <Text style={{ fontSize: 17 }}>{nota_p3}</Text>
        </View>
        <View style={styles.nota_area}>
          <View style={styles.bimestreText}>
            <Icon name="flag-variant" size={25} color="#3b3b3b" />
            <Text style={{ fontSize: 15 }}>4º Bimestre</Text>
          </View>
          <Text style={{ fontSize: 17 }}>{nota_p4}</Text>
        </View>
        <View style={styles.nota_area}>
          <View style={styles.bimestreText}>
            <Icon name="flag-outline" size={25} color="#3b3b3b" />
            <Text style={{ fontSize: 15 }}>Nota rec. final</Text>
          </View>
          <Text style={{ fontSize: 17 }}>{nota_rec}</Text>
        </View>
        <View style={styles.nota_area}>
          <View style={styles.bimestreText}>
            <Icon name="star" size={25} color="#3b3b3b" />
            <Text style={{ fontSize: 15 }}>Nota Final</Text>
          </View>
          <Text style={{ fontSize: 17 }}>{nota_rf}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  header: {
    flex: 1,
    backgroundColor: "#f45905",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: width - 25
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "uppercase"
  },
  mainContent: {
    flex: 1,
    width: width - 25,
    padding: 10,
    paddingHorizontal: 25
  },
  nota_area: {
    flex: 1,
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: "#1089ff"
  },
  bimestreText: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  }
});

export default memo(ItemList);
