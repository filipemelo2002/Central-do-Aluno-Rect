import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, StyleSheet, View } from "react-native";
import Lottie from "lottie-react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import MyPicker from "../utils/MyPicker";
import HandleStorage from "../utils/AsyncStorage";
import api from "../utils/api";
export default function Notas() {
  const [boletins, setBoletins] = useState([]);
  const [notas, setNotas] = useState({});
  const [selectedBoletin, setSelectedBoletin] = useState({});
  const [visible, setVisible] = useState("flex");
  const [listLoaded, setListLoaded] = useState("none");
  const [user, setUser] = useState("");
  const Storage = new HandleStorage();
  useEffect(() => {
    async function loadBoletins() {
      const { userToken } = await Storage.getUser();
      let data = [];
      try {
        const response = await api.get("/boletins", {
          headers: {
            userToken
          }
        });
        data = response.data;
        Storage.setBoletins(response.data);
      } catch (err) {
        data = await Storage.getBoletins();
      }
      setBoletins(data);
      setUser(userToken);
    }
    loadBoletins();
  }, []);

  useEffect(() => {
    async function getNotas() {
      const { boletimId, ano } = selectedBoletin;
      let data = {};
      try {
        const response = await api.get(
          `/boletins/view?boletimId=${boletimId}&ano=${ano}`,
          {
            headers: {
              userToken: user
            }
          }
        );
        data = response.data;
        await Storage.setNotas(boletimId, data);
      } catch (err) {
        data = await Storage.getNotas(boletimId);
      }
      setVisible("none");
      setListLoaded("flex");
      setNotas(data);
    }
    if (user) {
      setVisible("flex");
      setListLoaded("none");
      getNotas();
    }
  }, [selectedBoletin]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyPicker
        boletins={boletins}
        changedState={setSelectedBoletin}
        stateValue={selectedBoletin}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Lottie
          style={{
            maxWidth: 300,
            alignSelf: "center",
            display: visible
          }}
          resizeMode="contain"
          autoSize
          source={require("../utils/loading.json")}
          autoPlay
          loop
        />
        <View
          style={{
            display: listLoaded
          }}
        >
          <FlatList
            data={notas.data}
            renderItem={({ item }) => (
              <Item
                materia={item.materia}
                nota_p1={item.nota_p1}
                nota_p2={item.nota_p2}
                nota_p3={item.nota_p3}
                nota_p4={item.nota_p4}
                nota_rec={item.nota_rec}
                nota_rf={item.nota_rf}
              />
            )}
            keyExtractor={item => item.materia}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
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
function Item({
  materia,
  nota_p1,
  nota_p2,
  nota_p3,
  nota_p4,
  nota_rec,
  nota_rf
}) {
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
    alignSelf: "stretch"
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "uppercase"
  },
  mainContent: {
    flex: 1,
    alignSelf: "stretch",
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
