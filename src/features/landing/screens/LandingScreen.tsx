import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Switch,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import { Screen } from '@shared/components/Screen';
import { theme } from '@shared/ui/theme';

export function LandingScreen() {
  const [vibeMode, setVibeMode] = useState(false);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<string[]>([]);

  function addNote() {
    if (!note.trim()) return;
    setNotes((s) => [note.trim(), ...s]);
    setNote('');
    Keyboard.dismiss();
  }

  function removeNote(index: number) {
    setNotes((s) => s.filter((_, i) => i !== index));
  }

  return (
    <Screen>
      <View style={[styles.header, vibeMode && styles.headerVibe]}>
        <Text style={styles.title}>Vibe Coding</Text>
        <Text style={styles.subtitle}>Start small — build up functions as you go.</Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.switchRow}>
          <Text style={styles.label}>Vibe Mode</Text>
          <Switch value={vibeMode} onValueChange={setVibeMode} thumbColor={vibeMode ? theme.colors.primary : undefined} />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add a quick idea or function name"
            value={note}
            onChangeText={setNote}
            returnKeyType="done"
            onSubmitEditing={addNote}
          />
          <TouchableOpacity style={styles.addButton} onPress={addNote}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notes}
          keyExtractor={(_, idx) => String(idx)}
          ListEmptyComponent={<Text style={styles.empty}>No notes yet — start typing above.</Text>}
          renderItem={({ item, index }) => (
            <View style={styles.noteRow}>
              <Text style={styles.noteText}>{item}</Text>
              <TouchableOpacity onPress={() => removeNote(index)} style={styles.removeBtn}>
                <Text style={styles.removeText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: theme.spacing.l,
    alignItems: 'center',
  },
  headerVibe: {
    backgroundColor: '#fffbe6',
    borderRadius: 8,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
    marginTop: theme.spacing.s,
    opacity: 0.8,
  },
  controls: {
    marginTop: theme.spacing.l,
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  label: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.text,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.m,
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: 10,
    marginRight: theme.spacing.s,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  empty: {
    padding: theme.spacing.m,
    color: theme.colors.text,
    opacity: 0.7,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  noteText: {
    color: theme.colors.text,
    flex: 1,
  },
  removeBtn: {
    marginLeft: theme.spacing.m,
    padding: 6,
  },
  removeText: {
    color: theme.colors.secondary,
    fontWeight: '700',
  },
});
