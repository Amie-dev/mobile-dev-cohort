import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { FoodSchema } from "../../constants/foodData";
import { useTheme } from "../../context/ThemeContext";

type Props = {
  foodData: FoodSchema[];
  ListHeaderComponent?: React.ReactElement;
};

const FoodItem = ({ foodData, ListHeaderComponent }: Props) => {
  const navigation: any = useNavigation();
  const { theme } = useTheme();

  const handlePress = (item: FoodSchema) => {
    navigation.navigate("Food", {
      selectedData: item,
    });
  };

  const renderFoodItem = ({ item }: { item: FoodSchema }) => {
    return (
      <Pressable
        onPress={() => handlePress(item)}
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            shadowColor: theme.shadow,
          },
        ]}
      >
        <View>
          <Image source={{ uri: item.foodImage }} style={styles.image} />

          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#fff" />

            <Text style={styles.ratingText}>{item.foodRating}</Text>
          </View>

          <View style={styles.deliveryBadge}>
            <Text style={styles.badgeText}>{item.deliveryTime}</Text>
          </View>

          <View style={styles.feeBadge}>
            <Text style={styles.badgeText}>₹{item.deliveryFee} Fee</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.title,
                {
                  color: theme.text,
                },
              ]}
            >
              {item.restaurantName}
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.secondaryText,
                },
              ]}
            >
              {item.foodCategory} • {item.foodName}
            </Text>

            <Text
              style={[
                styles.price,
                {
                  color: theme.primary,
                },
              ]}
            >
              ₹{item.discountPrice ?? item.price}
            </Text>
          </View>

          <Pressable
            onPress={() => {
              console.log("Add item:", item.foodName);
            }}
            style={[
              styles.addButton,
              {
                borderColor: theme.border,
              },
            ]}
          >
            <Ionicons name="add" size={24} color={theme.primary} />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={foodData}
      keyExtractor={(item) => item.id}
      renderItem={renderFoodItem}
      ListHeaderComponent={ListHeaderComponent}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
    gap: 18,
  },

  card: {
    borderRadius: 24,
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

  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#22c55e",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  deliveryBadge: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },

  feeBadge: {
    position: "absolute",
    left: 120,
    bottom: 12,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  content: {
    minHeight: 94,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "500",
  },

  price: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "800",
  },

  addButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
