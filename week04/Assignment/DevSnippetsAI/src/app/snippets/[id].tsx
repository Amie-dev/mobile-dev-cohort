import { useTheme } from "@/context/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SnippetDetailsScreen() {
  const { id } = useLocalSearchParams();
const {theme}=useTheme()
  return (
    <ScrollView style={[styles.container,{
      backgroundColor:`${theme.background}`
    }]} contentContainerStyle={{ gap: 16 }}>
      <View style={styles.card}>
        <Text style={styles.label}>Snippet ID</Text>
        <Text style={styles.title}>{id}</Text>

        <Text style={styles.label}>Title</Text>
        <Text style={styles.title}>React Native Button</Text>

        <Text style={styles.label}>Language</Text>
        <Text style={styles.text}>tsx</Text>

        <Text style={styles.label}>Code</Text>
        <Text style={styles.code}>
          {"<Pressable>\n  <Text>Click Me</Text>\n</Pressable>"}
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.push(`/snippets/edit/${id}`)}
      >
        <Text style={styles.buttonText}>Edit Snippet</Text>
      </Pressable>

      <Pressable
        style={styles.aiButton}
        onPress={() => router.push(`/ai/explain/${id}`)}
      >
        <Text style={styles.buttonText}>Generate AI Explanation</Text>
      </Pressable>

      <Pressable style={styles.deleteButton}>
        <Text style={styles.buttonText}>Delete Snippet</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 8,
  },
  label: {
    color: "#64748b",
    fontWeight: "600",
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
  },
  code: {
    backgroundColor: "#020617",
    color: "#e2e8f0",
    padding: 14,
    borderRadius: 12,
    fontFamily: "monospace",
    marginTop: 6,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  aiButton: {
    backgroundColor: "#7c3aed",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});