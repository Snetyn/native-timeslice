import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Screen } from '@shared/components/Screen';
import { theme } from '@shared/ui/theme';

export function LandingScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Welcome to Timeslice Timer</Text>
      <Text style={styles.subtitle}>Start building your modular timer app!</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
  },
});
