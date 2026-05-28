import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateSnippetScreen() {
  const {theme}=useTheme()
  return (
    <View style={[styles.container,{
      backgroundColor:`${theme.background}`
    }]}>
      <TextInput placeholder="Snippet title" style={styles.input} />
      <TextInput placeholder="Language e.g. js, tsx" style={styles.input} />
      <TextInput placeholder="Tags e.g. react, ui" style={styles.input} />

      <TextInput
        placeholder="Write your code here..."
        multiline
        style={[styles.input, styles.codeInput]}
      />

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Save Snippet</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 14,
    backgroundColor: "#f8fafc",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  codeInput: {
    height: 220,
    textAlignVertical: "top",
    fontFamily: "monospace",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});