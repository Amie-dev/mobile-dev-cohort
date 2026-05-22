import React from "react";

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";


const GetStart = () => {
  const { login } = useAuth();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <View style={styles.topContent}>
        <View
          style={[
            styles.logoBox,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Ionicons
            name="fast-food"
            size={42}
            color={theme.primary}
          />
        </View>

        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          Delicious Food Delivered Fast
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          Order your favorite meals from nearby restaurants and track your food in real time.
        </Text>
      </View>

      <View
        style={[
          styles.imageCard,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
          }}
          style={styles.image}
        />

        <View style={styles.floatingCard}>
          <Ionicons name="star" size={18} color="#facc15" />

          <Text style={styles.floatingText}>4.9 Rating</Text>
        </View>

        <View style={styles.deliveryCard}>
          <Ionicons name="bicycle" size={20} color="#fff" />

          <Text style={styles.deliveryText}>25 min delivery</Text>
        </View>
      </View>

      <View style={styles.featuresRow}>
        <View
          style={[
            styles.featureBox,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Ionicons name="location" size={22} color={theme.primary} />
          <Text style={[styles.featureText, { color: theme.text }]}>
            Nearby
          </Text>
        </View>

        <View
          style={[
            styles.featureBox,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Ionicons name="card" size={22} color={theme.primary} />
          <Text style={[styles.featureText, { color: theme.text }]}>
            Easy Pay
          </Text>
        </View>

        <View
          style={[
            styles.featureBox,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Ionicons name="timer" size={22} color={theme.primary} />
          <Text style={[styles.featureText, { color: theme.text }]}>
            Fast
          </Text>
        </View>
      </View>

      <Pressable
        onPress={login}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.primary,
            transform: [
              {
                scale: pressed ? 0.96 : 1,
              },
            ],
          },
        ]}
      >
        <Text style={styles.buttonText}>Get Started</Text>

        <Ionicons name="arrow-forward" size={22} color="#fff" />
      </Pressable>
    </View>
  );
};

export default GetStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 34,
    justifyContent: "space-between",
  },

  topContent: {
    alignItems: "center",
  },

  logoBox: {
    width: 82,
    height: 82,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
  },

  title: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 14,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    fontWeight: "500",
  },

  imageCard: {
    height: 230,
    borderRadius: 36,
    overflow: "hidden",
    marginTop: 16,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  floatingCard: {
    position: "absolute",
    top: 18,
    right: 18,
    height: 42,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.65)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  floatingText: {
    color: "#fff",
    fontWeight: "800",
  },

  deliveryCard: {
    position: "absolute",
    left: 18,
    bottom: 18,
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: "#ff6b35",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  deliveryText: {
    color: "#fff",
    fontWeight: "800",
  },

  featuresRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },

  featureBox: {
    flex: 1,
    height: 82,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  featureText: {
    fontSize: 13,
    fontWeight: "800",
  },

  button: {
    height: 62,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 24,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
});