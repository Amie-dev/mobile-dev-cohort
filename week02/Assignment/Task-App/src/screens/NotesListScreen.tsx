import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { notes } from "@/data/notes";
import type { ThemeColors } from "@/constants/colors";
import ThemeToggle from "@/components/ThemeToggle";

type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

type CardProps = {
  item: Note;
  theme: ThemeColors;
  isTablet: boolean;
  onOpenEditor: (note: Note) => void;
};

const Card = ({ item, theme, onOpenEditor, isTablet }: CardProps) => {
  return (
    <Pressable
      onPress={() => onOpenEditor(item)}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.pressable,
          {
            width: isTablet ? "48%" : "100%",
            transform: [{ scale: pressed ? 0.98 : 1 }],
            opacity: pressed ? 0.96 : 1,
          },
        ])
      }
    >
      {({ pressed }) => (
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              shadowColor: pressed ? theme.primary : theme.shadow,
              borderColor: pressed ? theme.primaryLight : theme.border,
            },
          ]}
        >
          <View
            style={[
              // styles.activeLine,
              {
                backgroundColor: pressed ? theme.primary : theme.primaryLight,
              },
            ]}
          />

          <Text numberOfLines={1} style={[styles.title, { color: theme.text }]}>
            {item.title}
          </Text>

          <Text
            numberOfLines={3}
            style={[styles.content, { color: theme.secondaryText }]}
          >
            {item.content}
          </Text>

          <View style={styles.footer}>
            <Text style={[styles.date, { color: theme.secondaryText }]}>
              {item.date}
            </Text>

            <View style={[styles.dot, { backgroundColor: theme.primary }]} />
          </View>
        </View>
      )}
    </Pressable>
  );
};

type NotesListScreenProps = {
  theme: ThemeColors;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenEditor: (note: Note) => void;
  onCreateNote: () => void;
};

const NotesListScreen = ({
  theme,
  isDark,
  onToggleTheme,
  onOpenEditor,
  onCreateNote,
}: NotesListScreenProps) => {
  const [search, setSearch] = useState("");

  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const filteredNotes = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(keyword) ||
        note.content.toLowerCase().includes(keyword)
    );
  }, [search]);

  return (
    <SafeAreaView
      style={StyleSheet.flatten([
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ])}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.heading, { color: theme.text }]}>My Notes</Text>

          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
            Organize your thoughts
          </Text>
        </View>

        <ThemeToggle
          onToggleTheme={onToggleTheme}
          theme={theme}
          isDark={isDark}
        />
      </View>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search notes..."
        placeholderTextColor={theme.secondaryText}
        style={StyleSheet.flatten([
          styles.searchInput,
          {
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          },
        ])}
      />

      <Pressable
        onPress={onCreateNote}
        style={({ pressed }) =>
          StyleSheet.compose(styles.addButton, {
            backgroundColor: theme.primary,
            opacity: pressed ? 0.9 : 1,
          })
        }
      >
        <Text style={styles.addButtonText}>+ Create Note</Text>
      </Pressable>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={isTablet ? styles.columnWrapper : undefined}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              No notes found
            </Text>
            <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
              Try another search keyword.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card
            item={item}
            theme={theme}
            isTablet={isTablet}
            onOpenEditor={onOpenEditor}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default NotesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 12,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heading: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
  },

  searchInput: {
    height: 56,
    borderRadius: 18,
    paddingHorizontal: 18,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 18,
  },

  addButton: {
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  listContent: {
    paddingBottom: 40,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },

  pressable: {
    marginBottom: 18,
    borderRadius: 24,
  },

  card: {
    padding: 20,
    paddingLeft: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderBottomWidth:6,
    // overflow: "hidden",

    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 6,
  },

  // activeLine: {
  //   position: "absolute",
  //   left: 0,
  //   top: 0,
  //   bottom:0,
  //   width: 5,
  // },

  title: {
    fontSize: 19,
    fontWeight: "800",
  },

  content: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
  },

  footer: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  date: {
    fontSize: 13,
    fontWeight: "700",
  },

  // dot: {
  //   width: 10,
  //   height: 10,
  //   borderRadius: 999,
  // },

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 15,
  },
});