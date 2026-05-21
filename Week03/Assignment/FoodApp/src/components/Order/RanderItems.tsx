import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../../context/ThemeContext";

const ORDER_DATA = [
  {
    id: "1",
    restaurant: "FoodieHub",
    item: "Cheese Burger x2",
    price: 499,
    status: "On The Way",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },

  {
    id: "2",
    restaurant: "Pizza Point",
    item: "Pepperoni Pizza",
    price: 699,
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },

  {
    id: "3",
    restaurant: "Healthy Bowl",
    item: "Avocado Salad",
    price: 349,
    status: "Preparing",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  },
];

type Props = {
  ListHeaderComponent?: React.ReactElement;
};

const RenderItems = ({
  ListHeaderComponent,
}: Props) => {
  const { theme } = useTheme();

  const renderOrderItem = ({ item }: any) => {
    const isDelivered =
      item.status === "Delivered";

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            shadowColor: theme.shadow,
          },
        ]}
      >
        {/* IMAGE */}
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />

        {/* CONTENT */}
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.restaurant,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item.restaurant}
              </Text>

              <Text
                style={[
                  styles.itemText,
                  {
                    color:
                      theme.secondaryText,
                  },
                ]}
              >
                {item.item}
              </Text>
            </View>

            <Text
              style={[
                styles.price,
                {
                  color: theme.primary,
                },
              ]}
            >
              ₹{item.price}
            </Text>
          </View>

          {/* BOTTOM */}
          <View style={styles.bottomRow}>
            <View
              style={[
                styles.statusContainer,
                {
                  backgroundColor:
                    isDelivered
                      ? "#14532d"
                      : "#3b1f12",
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color: isDelivered
                      ? "#4ade80"
                      : "#fb923c",
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>

            <Pressable
              style={[
                styles.trackButton,
                {
                  backgroundColor:
                    theme.primary,
                },
              ]}
            >
              <Ionicons
                name="navigate"
                size={16}
                color="#fff"
              />

              <Text
                style={styles.trackText}
              >
                Track
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={ORDER_DATA}
      renderItem={renderOrderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
        styles.listContainer
      }
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default RenderItems;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 120,
    gap: 18,
  },

  card: {
    borderRadius: 28,

    overflow: "hidden",

    elevation: 4,

    shadowOpacity: 0.12,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  image: {
    width: "100%",
    height: 180,
  },

  content: {
    padding: 18,
  },

  topRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",
  },

  restaurant: {
    fontSize: 24,

    fontWeight: "800",
  },

  itemText: {
    marginTop: 6,

    fontSize: 14,

    fontWeight: "500",
  },

  price: {
    fontSize: 24,

    fontWeight: "900",
  },

  bottomRow: {
    marginTop: 18,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  statusContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,

    borderRadius: 20,
  },

  statusText: {
    fontSize: 13,

    fontWeight: "700",
  },

  trackButton: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderRadius: 20,
  },

  trackText: {
    color: "#fff",

    fontSize: 14,

    fontWeight: "700",
  },
});