import { useTheme } from "@/context/ThemeContext";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const files = [
  {
    id: "1",
    name: "button-snippet.js",
    type: "js",
  },
  {
    id: "2",
    name: "screenshot.png",
    type: "image",
  },
];

export default function FileManagerScreen() {
  const {theme}=useTheme()
  return (
    <View style={[styles.container,{
      backgroundColor:`${theme.background}`
    }]}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>+ Create Folder</Text>
      </Pressable>

      <FlatList
        data={files}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>📄 {item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: "#f8fafc",
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  type: {
    color: "#64748b",
    marginTop: 4,
  },
});