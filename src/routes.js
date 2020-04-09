import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Login from "./pages/Login";
import Main from "./pages/Main";

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: "Central do Aluno",
          headerStyle: {
            backgroundColor: "#149dff",
            height: 90,
          },
          headerLeft: null,

          headerTitleAlign: "center",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
export default Routes;
