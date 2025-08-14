import 'react-native-gesture-handler';
import React from 'react';
import { AppProviders } from './src/app/providers/AppProviders';
import { Text } from 'react-native';

export default function App() {
  return (
    <>
      <AppProviders />
      <Text style={{ position: 'absolute', top: 40, left: 20, fontSize: 24, color: 'black', zIndex: 999 }}>hello</Text>
    </>
  );
}
