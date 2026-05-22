import React, { useState } from "react";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../../context/ThemeContext";

const FoodScreen = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const { selectedData } = route.params;

  const { theme } = useTheme();

  const [quantity, setQuantity] = useState(1);

  const totalPrice = selectedData.price * quantity;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image
          source={{ uri: selectedData.foodImage }}
          style={styles.image}
        />

        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: theme.text }]}>
              {selectedData.foodName}
            </Text>

            <Text
              style={[
                styles.restaurant,
                { color: theme.secondaryText },
              ]}
            >
              {selectedData.restaurantName}
            </Text>
          </View>

          <View style={styles.ratingBox}>
            <Ionicons name="star" size={15} color="#fff" />
            <Text style={styles.ratingText}>
              {selectedData.foodRating}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.description,
            {
              color: theme.secondaryText,
            },
          ]}
        >
          {selectedData.foodDescription}
        </Text>

        <View style={styles.infoRow}>
          <View style={[styles.infoBox, { backgroundColor: theme.card }]}>
            <Ionicons name="time-outline" size={22} color={theme.primary} />
            <Text style={[styles.infoText, { color: theme.text }]}>
              {selectedData.deliveryTime}
            </Text>
          </View>

          <View style={[styles.infoBox, { backgroundColor: theme.card }]}>
            <Ionicons name="bicycle-outline" size={22} color={theme.primary} />
            <Text style={[styles.infoText, { color: theme.text }]}>
              ₹{selectedData.deliveryFee} Fee
            </Text>
          </View>
        </View>

        <View style={[styles.addressBox, { backgroundColor: theme.card }]}>
          <View style={styles.addressLeft}>
            <Ionicons name="location-outline" size={24} color={theme.primary} />

            <View style={{ flex: 1 }}>
              <Text style={[styles.addressTitle, { color: theme.text }]}>
                Delivery Address
              </Text>

              <Text
                style={[
                  styles.addressText,
                  { color: theme.secondaryText },
                ]}
              >
                Connaught Place, New Delhi
              </Text>
            </View>
          </View>

          <Text style={[styles.changeText, { color: theme.primary }]}>
            Change
          </Text>
        </View>

        <View style={styles.quantityRow}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quantity
          </Text>

          <View style={[styles.quantityBox, { backgroundColor: theme.card }]}>
            <Pressable
              onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
              style={styles.qtyBtn}
            >
              <Ionicons name="remove" size={20} color={theme.primary} />
            </Pressable>

            <Text style={[styles.qtyText, { color: theme.text }]}>
              {quantity}
            </Text>

            <Pressable
              onPress={() => setQuantity((prev) => prev + 1)}
              style={styles.qtyBtn}
            >
              <Ionicons name="add" size={20} color={theme.primary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.footerLabel,
              { color: theme.secondaryText },
            ]}
          >
            Total Price
          </Text>

          <Text style={[styles.footerPrice, { color: theme.primary }]}>
            ₹{totalPrice}
          </Text>
        </View>

        <Pressable
          style={[
            styles.cartButton,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Ionicons name="cart-outline" size={22} color={theme.primary} />
        </Pressable>

        <Pressable
          style={[
            styles.buyButton,
            {
              backgroundColor: theme.primary,
            },
          ]}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.buyText}>Buy Now</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 130,
  },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 30,
    marginBottom: 22,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
  },

  restaurant: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "600",
  },

  ratingBox: {
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: "#22c55e",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  ratingText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },

  description: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "500",
  },

  infoRow: {
    marginTop: 22,
    flexDirection: "row",
    gap: 14,
  },

  infoBox: {
    flex: 1,
    height: 76,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  infoText: {
    fontSize: 14,
    fontWeight: "700",
  },

  addressBox: {
    marginTop: 22,
    minHeight: 90,
    borderRadius: 26,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  addressLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  addressTitle: {
    fontSize: 16,
    fontWeight: "800",
  },

  addressText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
  },

  changeText: {
    fontSize: 14,
    fontWeight: "800",
  },

  quantityRow: {
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
  },

  quantityBox: {
    height: 48,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    gap: 12,
  },

  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "900",
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 96,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  footerLabel: {
    fontSize: 13,
    fontWeight: "600",
  },

  footerPrice: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "900",
  },

  cartButton: {
    width: 54,
    height: 54,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buyButton: {
    flex: 1,
    height: 56,
    borderRadius: 22,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },
});