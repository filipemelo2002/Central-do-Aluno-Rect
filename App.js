import React from 'react';
import {StatusBar} from 'react-native'
import Route from './src/routes'
export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#0064ab" barStyle="light-content" />
      <Route/>
    </> 
  )
}
