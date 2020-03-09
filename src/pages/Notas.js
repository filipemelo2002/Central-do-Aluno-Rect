import React from "react";
import { SafeAreaView } from "react-native";
import Toolbar from "../utils/Toolbar";
export default function Notas() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Toolbar title="Notas" />
    </SafeAreaView>
  );
}
