import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
const Tab = createMaterialBottomTabNavigator();

import Icon from "react-native-vector-icons/AntDesign";

import Notas from "./Notas";
import Frequencia from "./Frequencia";
import Horario from "./Horario";
import Estatisticas from "./Estatisticas";
export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: "#fff" }}
        activeColor="#008df1"
        inactiveColor="#7f7f7f"
      >
        <Tab.Screen
          component={Notas}
          name="Notas"
          options={{
            tabBarLabel: "Notas",
            tabBarIcon: ({ color }) => (
              <Icon color={color} name="table" size={23} />
            )
          }}
        />
        <Tab.Screen
          component={Frequencia}
          name="Frequência"
          options={{
            tabBarLabel: "Frequência",
            tabBarIcon: ({ color }) => (
              <Icon color={color} name="user" size={26} />
            )
          }}
        />
        <Tab.Screen
          component={Horario}
          name="Horário"
          options={{
            tabBarLabel: "Horário",
            tabBarIcon: ({ color }) => (
              <Icon color={color} name="calendar" size={26} />
            )
          }}
        />
        <Tab.Screen
          component={Estatisticas}
          name="Estatísticas"
          options={{
            tabBarLabel: "Estatísticas",
            tabBarIcon: ({ color }) => (
              <Icon color={color} name="areachart" size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
