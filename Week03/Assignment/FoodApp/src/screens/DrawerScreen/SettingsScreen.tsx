import React, { useState } from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const settingsData = [
    {
      id: "1",
      title: "Privacy",
      subtitle: "Manage account privacy",
      icon: "lock-closed",
      type: "navigate",
    },

    {
      id: "2",
      title: "Payment Methods",
      subtitle: "Cards & wallet settings",
      icon: "card",
      type: "navigate",
    },

    {
      id: "3",
      title: "Language",
      subtitle: "English (India)",
      icon: "language",
      type: "navigate",
    },

    {
      id: "4",
      title: "Terms & Conditions",
      subtitle: "Privacy policy & legal",
      icon: "document-text",
      type: "navigate",
    },
  ];

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        {/* <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          Settings
        </Text> */}

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          Customize your experience
        </Text>
      </View>

      {/* NOTIFICATION */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: theme.surface,
              },
            ]}
          >
            <Ionicons name="notifications" size={24} color="#facc15" />
          </View>

          <View>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: theme.text,
                },
              ]}
            >
              Notifications
            </Text>

            <Text
              style={[
                styles.cardSubtitle,
                {
                  color: theme.secondaryText,
                },
              ]}
            >
              Order updates & offers
            </Text>
          </View>
        </View>

        <Switch
          value={notificationEnabled}
          onValueChange={setNotificationEnabled}
          thumbColor="#fff"
          trackColor={{
            false: "#767577",
            true: theme.primary,
          }}
        />
      </View>

      {/* DARK MODE */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: theme.surface,
              },
            ]}
          >
            <Ionicons
              name={isDarkMode ? "moon" : "sunny"}
              size={26}
              color={isDarkMode ? "#facc15" : "#ffcc00"}
            />
          </View>

          <View>
            <Text
              style={[
                styles.cardTitle,
                {
                  color: theme.text,
                },
              ]}
            >
              Dark Mode
            </Text>

            <Text
              style={[
                styles.cardSubtitle,
                {
                  color: theme.secondaryText,
                },
              ]}
            >
              Premium dark appearance
            </Text>
          </View>
        </View>

        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor="#fff"
          trackColor={{
            false: "#767577",
            true: theme.primary,
          }}
        />
      </View>

      {/* OTHER SETTINGS */}
      {settingsData.map((item) => (
        <Pressable
          key={item.id}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <View style={styles.leftSection}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: theme.surface,
                },
              ]}
            >
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                color={theme.primary}
              />
            </View>

            <View>
              <Text
                style={[
                  styles.cardTitle,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  styles.cardSubtitle,
                  {
                    color: theme.secondaryText,
                  },
                ]}
              >
                {item.subtitle}
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={theme.secondaryText}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 10,
    marginBottom: 24,
  },

  title: {
    fontSize: 36,
    fontWeight: "900",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "500",
  },

  card: {
    minHeight: 96,

    borderRadius: 28,

    paddingHorizontal: 18,
    paddingVertical: 16,

    marginBottom: 18,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  leftSection: {
    flexDirection: "row",

    alignItems: "center",

    gap: 16,

    flex: 1,
  },

  iconContainer: {
    width: 62,
    height: 62,

    borderRadius: 22,

    justifyContent: "center",

    alignItems: "center",
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: "800",
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
  },
});
