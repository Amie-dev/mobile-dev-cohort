import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "@/context/ThemeContext";

export default function AIExplainScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();

  const handleGenerate = () => {
    Alert.alert(
      "🚧 Under Development",
      "AI Code Explanation is currently under development. Soon you'll be able to generate code explanations, summaries, bug detection, and improvement suggestions directly from your snippets."
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          AI Explanation
        </Text>

        <Text
          style={[
            styles.text,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          Snippet ID: {id}
        </Text>
      </View>

      {/* Generate Button */}

      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: theme.primary,
          },
        ]}
        onPress={handleGenerate}
      >
        <Ionicons
          name="sparkles-outline"
          size={20}
          color="#fff"
        />

        <Text style={styles.buttonText}>
          Generate Explanation
        </Text>
      </Pressable>

      {/* Under Development Card */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="construct-outline"
            size={48}
            color={theme.primary}
          />
        </View>

        <Text
          style={[
            styles.heading,
            {
              color: theme.text,
            },
          ]}
        >
          🚧 Feature Under Development
        </Text>

        <Text
          style={[
            styles.text,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          AI-powered code analysis is currently being built for DevSnippetsAI.
        </Text>

        <Text
          style={[
            styles.subHeading,
            {
              color: theme.text,
            },
          ]}
        >
          Upcoming Features
        </Text>

        <View style={styles.featureList}>
          <Text style={[styles.featureText, { color: theme.text }]}>
            • Code Explanation
          </Text>

          <Text style={[styles.featureText, { color: theme.text }]}>
            • AI Summary
          </Text>

          <Text style={[styles.featureText, { color: theme.text }]}>
            • Improvement Suggestions
          </Text>

          <Text style={[styles.featureText, { color: theme.text }]}>
            • Bug Detection
          </Text>

          <Text style={[styles.featureText, { color: theme.text }]}>
            • Best Practices Review
          </Text>

          <Text style={[styles.featureText, { color: theme.text }]}>
            • Learning Resources
          </Text>
        </View>
      </View>

      {/* Roadmap Card */}

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.subHeading,
            {
              color: theme.text,
            },
          ]}
        >
          Development Status
        </Text>

        <Text
          style={[
            styles.text,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          This feature is planned for a future update. The UI is available now
          and AI integration will be connected using Gemini or OpenAI APIs with
          SecureStore for API key management.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
  },

  iconContainer: {
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
  },

  heading: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },

  subHeading: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
  },

  text: {
    fontSize: 14,
    lineHeight: 22,
  },

  featureList: {
    gap: 8,
    marginTop: 6,
  },

  featureText: {
    fontSize: 15,
    fontWeight: "500",
  },

  button: {
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});