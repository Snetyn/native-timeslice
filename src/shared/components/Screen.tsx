import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, ViewProps } from 'react-native';
import { theme } from '@shared/ui/theme';

type ScreenProps = PropsWithChildren<ViewProps>;

export function Screen({ children, style, ...rest }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
});
