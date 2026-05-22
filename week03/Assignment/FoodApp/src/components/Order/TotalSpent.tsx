import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../../context/ThemeContext";

const TotalSpent = () => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          shadowColor: theme.shadow,
        },
      ]}
    >
      {/* TOTAL ORDER */}
      <View style={styles.item}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                "rgba(255,107,53,0.12)",
            },
          ]}
        >
          <Ionicons
            name="receipt-outline"
            size={24}
            color={theme.primary}
          />
        </View>

        <Text
          style={[
            styles.value,
            {
              color: theme.text,
            },
          ]}
        >
          12
        </Text>

        <Text
          style={[
            styles.label,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          Total Orders
        </Text>
      </View>

      {/* DIVIDER
      <View
        style={[
          styles.divider,
          {
            backgroundColor: theme.border,
          },
        ]}
      /> */}

      {/* TOTAL SPENT */}
      <View style={styles.item}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                "rgba(34,197,94,0.12)",
            },
          ]}
        >
          <Ionicons
            name="wallet-outline"
            size={24}
            color="#22c55e"
          />
        </View>

        <Text
          style={[
            styles.value,
            {
              color: theme.text,
            },
          ]}
        >
          ₹12.5K
        </Text>

        <Text
          style={[
            styles.label,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          Total Spent
        </Text>
      </View>
    </View>
  );
};

export default TotalSpent;

const styles = StyleSheet.create({
  container: {
  // marginHorizontal: 16,
  marginTop: 10,
  paddingVertical: 14,
  borderRadius: 24,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  elevation: 4,
  shadowOpacity: 0.1,
  shadowRadius: 8,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  borderWidth: 1,
},

  item: {
    flex: 1,

    alignItems: "center",
  },

  iconContainer: {
    width: 48,
    height: 48,

    borderRadius: 29,

    justifyContent: "center",

    alignItems: "center",
  },

  value: {
    marginTop: 10,

    fontSize: 26,

    fontWeight: "900",
  },

  label: {
    marginTop: 6,

    fontSize: 14,

    fontWeight: "600",
  },

  divider: {
    width: 1,

    height: 90,

    marginHorizontal: 18,
  },
});