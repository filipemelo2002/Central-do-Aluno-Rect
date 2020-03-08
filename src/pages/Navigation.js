import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Container } from './styles';

import MyTab from "./utils/MyTab";
import Notas from "./Notas";
export default function Navigation() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <MyTab {...props} />}>
        <Tab.Screen component={Notas} name="Notas" />
        <Tab.Screen component={Notas} name="Frequência" />
        <Tab.Screen component={Notas} name="Horário" />
        <Tab.Screen component={Notas} name="Estatísticas" />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
