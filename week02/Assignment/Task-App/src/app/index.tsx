import React, { useState } from "react";
import { View, StyleSheet, useColorScheme, StatusBar } from "react-native";

import NotesListScreen from "@/screens/NotesListScreen";
import NoteEditorScreen from "@/screens/NoteEditorScreen";

import { COLORS } from "@/constants/colors";



export type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export default function Index() {
  const [screen, setScreen] =
    useState<"list" | "editor">("list");

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null);

  const systemColor = useColorScheme();

  const [manualDark, setManualDark] =
    useState<boolean | null>(null);

  // FINAL THEME
  const isDark =
    manualDark !== null
      ? manualDark
      : systemColor === "dark";

  const theme = isDark
    ? COLORS.dark
    : COLORS.light;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <StatusBar
      barStyle={isDark ? 'light-content': 'dark-content'}
      backgroundColor={theme.background}
       
      />

      {screen === "list" ? (
        <NotesListScreen
          theme={theme}
          isDark={isDark}
          onOpenEditor={(note) => {
            setSelectedNote(note);
            setScreen("editor");
          }}
          onCreateNote={() => {
            setSelectedNote(null);
            setScreen("editor");
          }}
          onOpenScreen={() => {
            setScreen("editor");
          }}
          onToggleTheme={() => {
            setManualDark((prev) => !isDark);
          }}
        />
      ) : (
        <NoteEditorScreen
          theme={theme}
          note={selectedNote}
          onBack={() => setScreen("list")}
          onSave={() => setScreen("list")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});