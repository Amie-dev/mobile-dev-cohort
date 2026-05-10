import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import type { ThemeColors } from "@/constants/colors";

type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

type NoteEditorScreenProps = {
  note: Note | null;
  theme: ThemeColors;
  onBack: () => void;
  onSave: () => void;
};

const NoteEditorScreen = ({
  note,
  theme,
  onBack,
  onSave,
}: NoteEditorScreenProps) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200",
          }}
          style={[styles.header, { height: isTablet ? 300 : 240 }]}
          imageStyle={styles.headerImage}
        >
          <View style={styles.overlay} />

          <View style={styles.headerContent}>
            <Pressable onPress={onBack} style={styles.headerButton}>
              <Text style={styles.buttonText}>Back</Text>
            </Pressable>

            <Pressable
              onPress={onSave}
              style={StyleSheet.compose(styles.headerButton, styles.saveButton)}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </ImageBackground>

        <View
          style={[
            styles.contentContainer,
            {
              paddingHorizontal: isTablet ? 60 : 20,
            },
          ]}
        >
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Note title..."
            placeholderTextColor={theme.secondaryText}
            maxLength={80}
            style={[
              styles.titleInput,
              {
                color: theme.text,
                borderBottomColor: theme.border,
              },
            ]}
          />

          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="Write your thoughts..."
            placeholderTextColor={theme.secondaryText}
            multiline
            textAlignVertical="top"
            style={[
              styles.contentInput,
              {
                color: theme.text,
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
              },
            ]}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoteEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardView: {
    flex: 1,
  },

  header: {
    height: 240,
    justifyContent: "flex-start",
  },

  headerImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerContent: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  saveButton: {
    backgroundColor: "#6366F1",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  contentContainer: {
    flex: 1,
    paddingTop: 24,
  },

  titleInput: {
    fontSize: 28,
    fontWeight: "800",
    paddingBottom: 12,
    borderBottomWidth: 1,
  },

  contentInput: {
    flex: 1,
    marginTop: 20,
    fontSize: 17,
    lineHeight: 28,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
  },
});