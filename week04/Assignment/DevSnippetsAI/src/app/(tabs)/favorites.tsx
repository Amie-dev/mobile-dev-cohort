import { useTheme } from "@/context/ThemeContext";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const favorites = [
  {
    id: "1",
    title: "React Native Button",
    language: "tsx",
  },
];

export default function FavoritesScreen() {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${theme.background}`,
        },
      ]}
    >
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12 }}
        ListEmptyComponent={<Text>No favorite snippets yet.</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/snippets/${item.id}`)}
          >
            <Text style={styles.title}>⭐ {item.title}</Text>
            <Text style={styles.language}>{item.language}</Text>
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
    backgroundColor: "#f8fafc",
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
  },
});
