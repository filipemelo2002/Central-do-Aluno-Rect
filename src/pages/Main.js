import React from "react";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import Icon from "react-native-vector-icons/AntDesign";

import Notas from "./Notas";
import Frequencia from "./Frequencia";
import Horario from "./Horario";
import Estatisticas from "./Estatisticas";
export default function Main() {
  return (
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
      <Tab.Screen
        component={Estatisticas}
        name="Estatísticas"
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? (
              <Text>Estatística</Text>
            ) : (
              <Text style={{ display: "none" }}></Text>
            ),
          tabBarIcon: ({ color }) => (
            <Icon color={color} name="areachart" size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
