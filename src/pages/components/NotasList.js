import React from "react";
import { FlatList } from "react-native";

// import { Container } from './styles';

import Item from "./item.js";
export default function NotasList({ notas }) {
  return (
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
  );
}
