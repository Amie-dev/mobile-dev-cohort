import { useTheme } from "@/context/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditSnippetScreen() {
  const { id } = useLocalSearchParams();
const {theme}=useTheme()
  return (
    <View style={[styles.container,,{
      backgroundColor:`${theme.background}`
    }]}>
      <Text style={styles.heading}>Editing Snippet: {id}</Text>

      <TextInput defaultValue="React Native Button" style={styles.input} />
      <TextInput defaultValue="tsx" style={styles.input} />
      <TextInput defaultValue="react-native, ui" style={styles.input} />

      <TextInput
        multiline
        defaultValue={"<Pressable>\n  <Text>Click Me</Text>\n</Pressable>"}
        style={[styles.input, styles.codeInput]}
      />

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Update Snippet</Text>
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
  heading: {
    fontSize: 20,
    fontWeight: "700",
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