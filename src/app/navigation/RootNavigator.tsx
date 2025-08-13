import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { LandingScreen } from '@features/landing';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
