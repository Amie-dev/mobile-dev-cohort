import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { useFiles } from "@/context/FileContext";
import { useSnippet } from "@/context/SnippetContext";
import { useTheme } from "@/context/ThemeContext";

const API_KEY_STORAGE = "AI_API_KEY";

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme, resetToSystemTheme, theme } = useTheme();
  const { snippets } = useSnippet();
  const { files } = useFiles();

  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    const savedKey = await SecureStore.getItemAsync(API_KEY_STORAGE);

    if (savedKey) {
      setApiKey(savedKey);
    }
  };

  const saveApiKey = async () => {
    if (!apiKey.trim()) {
      Alert.alert("Missing key", "Please enter your API key.");
      return;
    }

    await SecureStore.setItemAsync(API_KEY_STORAGE, apiKey.trim());
    Alert.alert("Saved", "API key saved securely.");
  };

  const clearApiKey = async () => {
    await SecureStore.deleteItemAsync(API_KEY_STORAGE);
    setApiKey("");
    Alert.alert("Removed", "API key removed.");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.heading, { color: theme.text }]}>Settings</Text>

      <Text style={[styles.subHeading, { color: theme.mutedText }]}>
        Manage theme, AI key and local storage
      </Text>

      {/* APPEARANCE */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Appearance</Text>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="moon-outline" size={22} color={theme.primary} />
            <Text style={{ color: theme.text, fontWeight: "600" }}>
              Dark Mode
            </Text>
          </View>

          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            thumbColor={isDarkMode ? theme.primary : "#f4f3f4"}
            trackColor={{
              false: theme.border,
              true: theme.primaryLight,
            }}
          />
        </View>

        <Pressable
          style={[styles.outlineButton, { borderColor: theme.border }]}
          onPress={resetToSystemTheme}
        >
          <Text style={{ color: theme.text, fontWeight: "700" }}>
            Follow System Theme
          </Text>
        </Pressable>
      </View>

      {/* AI KEY */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          AI Configuration
        </Text>

        <View
          style={[
            styles.inputBox,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
            },
          ]}
        >
          <TextInput
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter AI API key"
            placeholderTextColor={theme.mutedText}
            secureTextEntry={!showKey}
            style={[styles.input, { color: theme.text }]}
          />

          <Pressable onPress={() => setShowKey(!showKey)}>
            <Ionicons
              name={showKey ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={theme.mutedText}
            />
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={saveApiKey}
        >
          <Ionicons name="key-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Save API Key</Text>
        </Pressable>

        <Pressable style={styles.dangerButton} onPress={clearApiKey}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Remove API Key</Text>
        </Pressable>
      </View>

      {/* STORAGE */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Storage</Text>

        <View style={styles.statRow}>
          <View style={[styles.statBox, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.primary }]}>
              {snippets.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.mutedText }]}>
              Snippets
            </Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.primary }]}>
              {files.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.mutedText }]}>
              Files
            </Text>
          </View>
        </View>
      </View>

      {/* ABOUT */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>About</Text>

        <Text style={[styles.aboutText, { color: theme.mutedText }]}>
          DevSnippetsAI is an offline-first code snippet manager built with Expo,
          SQLite, SecureStore and Expo FileSystem.
        </Text>

        <Text style={[styles.version, { color: theme.primary }]}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
  },

  subHeading: {
    marginTop: -8,
    fontSize: 14,
  },

  card: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    gap: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  outlineButton: {
    padding: 13,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
  },

  inputBox: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    paddingVertical: 13,
  },

  button: {
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  dangerButton: {
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  statRow: {
    flexDirection: "row",
    gap: 12,
  },

  statBox: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "800",
  },

  statLabel: {
    marginTop: 4,
    fontWeight: "600",
  },

  aboutText: {
    lineHeight: 22,
  },

  version: {
    fontWeight: "800",
  },
});