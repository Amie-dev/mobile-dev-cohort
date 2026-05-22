import React from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";


const HelpScreen = () => {
  const { theme } = useTheme();

  const helpItems = [
    {
      id: "1",
      title: "Track Order",
      subtitle: "Check your live delivery status",
      icon: "cube",
    },
    {
      id: "2",
      title: "Payment Issues",
      subtitle: "Refunds & failed transactions",
      icon: "card",
    },
    {
      id: "3",
      title: "Food Quality",
      subtitle: "Report damaged or missing items",
      icon: "fast-food",
    },
    {
      id: "4",
      title: "Contact Support",
      subtitle: "Talk directly with our team",
      icon: "call",
    },
    {
      id: "5",
      title: "FAQs",
      subtitle: "Common questions & answers",
      icon: "help",
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
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          Help Center
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          How can we help you?
        </Text>
      </View>

      {helpItems.map((item) => (
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
                styles.iconBox,
                {
                  backgroundColor: theme.surface,
                },
              ]}
            >
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={25}
                color={theme.primary}
              />
            </View>

            <View style={{ flex: 1 }}>
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

      <View
        style={[
          styles.supportBox,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <Text
          style={[
            styles.supportTitle,
            {
              color: theme.text,
            },
          ]}
        >
          Need More Help?
        </Text>

        <Text
          style={[
            styles.supportSubtitle,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          Email us at support@foodieapp.com
        </Text>

        <Pressable
          style={[
            styles.supportButton,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text style={styles.supportButtonText}>
            Contact Support
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 20,
    marginBottom: 24,
  },

  title: {
    fontSize: 34,
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

  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: "800",
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
  },

  supportBox: {
    marginTop: 18,
    marginBottom: 120,
    borderRadius: 30,
    paddingVertical: 34,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  supportTitle: {
    fontSize: 28,
    fontWeight: "900",
  },

  supportSubtitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },

  supportButton: {
    marginTop: 28,
    height: 58,
    paddingHorizontal: 34,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  supportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});