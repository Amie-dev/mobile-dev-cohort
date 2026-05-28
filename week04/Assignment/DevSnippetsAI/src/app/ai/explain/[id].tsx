import { useTheme } from "@/context/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AIExplainScreen() {
  const { id } = useLocalSearchParams();
  const {isDarkMode,toggleTheme,theme}=useTheme()
  console.log({theme})

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 16 }}>
      <View style={styles.card}>
        <Text style={styles.title}>AI Explanation</Text>
        <Text style={styles.text}>Snippet ID: {id}</Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Generate Explanation</Text>
      </Pressable>

      <View style={styles.card}>
        <Text style={styles.heading}>Summary</Text>
        <Text style={styles.text}>
          This code creates a simple React Native button using Pressable and Text.
        </Text>

        <Text style={styles.heading}>Improvement Suggestions</Text>
        <Text style={styles.text}>
          You can add accessibility labels, loading state, and reusable props.
        </Text>
      </View>
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
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },
  text: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#7c3aed",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});