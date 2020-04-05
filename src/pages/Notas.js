import React, { useEffect, useState, useMemo } from "react";
import { SafeAreaView, View } from "react-native";
import Lottie from "lottie-react-native";

import NotasList from "./components/NotasList";
import MyPicker from "./components/MyPicker";
import HandleStorage from "../utils/AsyncStorage";
import ApiHandler from "../utils/api";

import BoletinsContext from '../context'
export default function Notas() {
  const [notas, setNotas] = useState({});
  const [selectedBoletin, setSelectedBoletin] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  
  const displayList = useMemo(() => (isLoading ? "none" : "flex"), [
    isLoading
  ]);
  const displayLoading = useMemo(() => (isLoading ? "flex" : "none"), [
    isLoading
  ]);



  const Storage = new HandleStorage();
  
  
  function changeBoletin(boletin){
    setSelectedBoletin(boletin)
  }

  useEffect(() => {
    async function getNotas() {
      const { boletimId, ano } = selectedBoletin;
      if(boletimId, ano){
        setIsLoading(true)
        const { userToken } = await Storage.getUser();
        const api = new ApiHandler(userToken);
        const response = await api.getNotas(boletimId, ano);
        setIsLoading(false)
        setNotas(response);
      }
    }
    if(selectedBoletin){
      getNotas();
    }
    
  
  }, [selectedBoletin]);

  return (
    <BoletinsContext.Provider value={{changeBoletin}}>
      <SafeAreaView style={{ flex: 1 }}>
        <MyPicker/>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
          <View
            style={{
              display: displayList
            }}
          >
            <NotasList notas={notas} />
          </View>
        </View>
      </SafeAreaView>
    </BoletinsContext.Provider>
  );
}
