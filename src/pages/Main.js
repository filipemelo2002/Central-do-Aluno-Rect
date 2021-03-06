import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import Icon from "react-native-vector-icons/AntDesign";
import Notas from "./Notas";
import Frequencia from "./Frequencia";
import Horario from "./Horario";

import HandleStorage from "../utils/AsyncStorage";
import ApiHandler from "../utils/api";
import BoletinsContext from '../context'
export default function Main({ navigation }) {
  const Storage = new HandleStorage();
  const [boletins, setBoletins] = useState([])
  const [horario,setHorario] = useState([])
  navigation.setOptions({
    headerRight: () => (
      <Icon
        name="logout"
        size={25}
        color="#fff"
        style={{ marginRight: 15 }}
        onPress={async () => {
          navigation.navigate("Login");
          await Storage.removeUser();
        }}
      />
    )
  });

  useEffect(()=>{
    async function fetchBoletins(){
      const {userToken} = await Storage.getUser()
      const api = new ApiHandler(userToken)
      const response = await api.getBoletins(userToken)
      setBoletins(response)
      const horarioRes = await api.getHorario(userToken)
      setHorario(horarioRes)
      console.log(horarioRes)
    }
    fetchBoletins()
  }, [])

  return (
    <BoletinsContext.Provider value={{boletins, horario}}>
      <Tab.Navigator
        barStyle={{ backgroundColor: "#fff" }}
        tabBarPosition="bottom"
        tabBarOptions={{
          activeTintColor: "#008df1",
          inactiveTintColor: "#7f7f7f",
          indicatorStyle: {
            height: 0
          },
          labelStyle: {
            display: "none"
          },
          style: {
            borderTopWidth: 0.5,
            borderTopColor: "#008df1",
            padding: 10
          },
          showIcon: true
        }}
      >
        <Tab.Screen
          component={Notas}
          name="Notas"
          options={{
            tabBarIcon: ({ color }) => (
              <Icon color={color} name="table" size={23} />
            )
          }}
        />
        <Tab.Screen
          component={Frequencia}
          name="Frequência"
          options={{
            tabBarIcon: ({ color }) => (
              <Icon color={color} name="user" size={26} />
            )
          }}
        />
        <Tab.Screen
          component={Horario}
          name="Horário"
          options={{
            tabBarIcon: ({ color }) => (
              <Icon color={color} name="calendar" size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </BoletinsContext.Provider>
  );
}
