import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '@app/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// TODO: Remove if not needed, or configure orientation lock
// import * as ScreenOrientation from 'expo-screen-orientation';

export function AppProviders() {
  // useEffect(() => {
  //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
  // }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
