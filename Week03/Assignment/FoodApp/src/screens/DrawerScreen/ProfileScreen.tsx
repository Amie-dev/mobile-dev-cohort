import React from "react";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "../../context/ThemeContext";


const ProfileScreen = () => {
  const { theme } = useTheme();

  const menuItems = [
    {
      id: "1",
      title: "My Orders",
      subtitle: "Track and manage orders",
      icon: "cube",
    },

    {
      id: "2",
      title: "Favorites",
      subtitle: "Your liked restaurants",
      icon: "heart",
    },

    {
      id: "3",
      title: "Payment Methods",
      subtitle: "Cards & wallet settings",
      icon: "card",
    },

    {
      id: "4",
      title: "Settings",
      subtitle: "Notifications & privacy",
      icon: "settings",
    },

    {
      id: "5",
      title: "Logout",
      subtitle: "Securely logout account",
      icon: "log-out",
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
      {/* PROFILE CARD */}
      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/32.jpg",
          }}
          style={[
            styles.avatar,
            {
              borderColor: theme.primary,
            },
          ]}
        />

        <Text
          style={[
            styles.name,
            {
              color: theme.text,
            },
          ]}
        >
          Alex Johnson
        </Text>

        <Text
          style={[
            styles.email,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          alexjohnson@gmail.com
        </Text>

        <Pressable
          style={[
            styles.premiumButton,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text style={styles.premiumText}>
            Premium Member
          </Text>
        </Pressable>
      </View>

      {/* STATS */}
      <View style={styles.statsContainer}>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Text
            style={[
              styles.statNumber,
              {
                color: theme.primary,
              },
            ]}
          >
            24
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            Orders
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Text
            style={[
              styles.statNumber,
              {
                color: theme.primary,
              },
            ]}
          >
            12
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            Favorites
          </Text>
        </View>

        <View
          style={[
            styles.statCard,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Text
            style={[
              styles.statNumber,
              {
                color: theme.primary,
              },
            ]}
          >
            4.9
          </Text>

          <Text
            style={[
              styles.statLabel,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            Rating
          </Text>
        </View>
      </View>

      {/* MENU */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.menuCard,
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
                    backgroundColor:
                      theme.surface,
                  },
                ]}
              >
                <Ionicons
                  name={
                    item.icon as keyof typeof Ionicons.glyphMap
                  }
                  size={24}
                  color={theme.primary}
                />
              </View>

              <View>
                <Text
                  style={[
                    styles.menuTitle,
                    {
                      color: theme.text,
                    },
                  ]}
                >
                  {item.title}
                </Text>

                <Text
                  style={[
                    styles.menuSubtitle,
                    {
                      color:
                        theme.secondaryText,
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
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  profileCard: {
    marginTop: 20,

    borderRadius: 34,

    paddingVertical: 34,
    paddingHorizontal: 20,

    alignItems: "center",
  },

  avatar: {
    width: 120,
    height: 120,

    borderRadius: 60,

    borderWidth: 4,
  },

  name: {
    marginTop: 18,

    fontSize: 34,

    fontWeight: "900",
  },

  email: {
    marginTop: 8,

    fontSize: 16,

    fontWeight: "500",
  },

  premiumButton: {
    marginTop: 24,

    height: 56,

    paddingHorizontal: 30,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",
  },

  premiumText: {
    color: "#fff",

    fontSize: 16,

    fontWeight: "800",
  },

  statsContainer: {
    marginTop: 24,

    flexDirection: "row",

    justifyContent: "space-between",
  },

  statCard: {
    width: "31%",

    height: 120,

    borderRadius: 28,

    justifyContent: "center",

    alignItems: "center",
  },

  statNumber: {
    fontSize: 34,

    fontWeight: "900",
  },

  statLabel: {
    marginTop: 6,

    fontSize: 15,

    fontWeight: "500",
  },

  menuContainer: {
    marginTop: 28,
    marginBottom: 120,
  },

  menuCard: {
    minHeight: 100,

    borderRadius: 30,

    paddingHorizontal: 18,
    paddingVertical: 18,

    marginBottom: 18,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  leftSection: {
    flexDirection: "row",

    alignItems: "center",

    gap: 16,
  },

  iconContainer: {
    width: 64,
    height: 64,

    borderRadius: 22,

    justifyContent: "center",

    alignItems: "center",
  },

  menuTitle: {
    fontSize: 26,

    fontWeight: "800",
  },

  menuSubtitle: {
    marginTop: 4,

    fontSize: 14,

    fontWeight: "500",
  },
});