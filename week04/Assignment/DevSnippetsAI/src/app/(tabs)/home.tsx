import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const snippets = [
  {
    id: "1",
    title: "React Native Button",
    language: "tsx",
    tags: ["react-native", "ui"],
    code: "<Pressable><Text>Click</Text></Pressable>",
  },
  {
    id: "2",
    title: "JavaScript Map",
    language: "js",
    tags: ["javascript", "array"],
    code: "const result = users.map(user => user.name);",
  },
];

export default function HomeScreen() {
  const {theme}=useTheme()
  
  return (
    <View style={[styles.container,{
      backgroundColor:`${theme.background}`
    }]}>
      <TextInput placeholder="Search snippets..." style={styles.searchInput} />

      <Pressable
        style={styles.createButton}
        onPress={() => router.push("/snippets/create")}
      >
        <Text style={styles.createButtonText}>+ Create Snippet</Text>
      </Pressable>

      <FlatList
        data={snippets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/snippets/${item.id}`)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.language}>{item.language}</Text>
            <Text style={styles.tags}>{item.tags.join(", ")}</Text>
          </Pressable>
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
  searchInput: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  createButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  createButtonText: {
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
  language: {
    marginTop: 6,
    color: "#2563eb",
    fontWeight: "600",
  },
  tags: {
    marginTop: 4,
    color: "#64748b",
  },
});
