import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { FoodSchema } from "../../constants/foodData";

import { useTheme } from "../../context/ThemeContext";

type Props = {
  originalData: FoodSchema[];

  setFilterData: React.Dispatch<React.SetStateAction<FoodSchema[]>>;

  activeCategory: string;

  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
};

const FOOD_CATEGORIES = [
  "All",
  "Pizza",
  "Burger",
  "Biryani",
  "Dessert",
  "Drinks",
  "Pasta",
  "Healthy",
  "Indian",
  "Chinese",
  "Fast Food",
];

const Category = ({
  originalData,
  setFilterData,
  activeCategory,
  setActiveCategory,
}: Props) => {
  const { theme } = useTheme();

  const handleCategory = (category: string) => {
    setActiveCategory(category);

    if (category === "All") {
      setFilterData(originalData);
      return;
    }

    const filteredData = originalData.filter(
      (item) => item.foodCategory === category,
    );

    setFilterData(filteredData);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={FOOD_CATEGORIES}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isActive = activeCategory === item;

          return (
            <Pressable
              onPress={() => handleCategory(item)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: isActive ? theme.primary : theme.card,

                  borderColor: isActive ? theme.primary : theme.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: isActive ? theme.white : theme.text,
                  },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },

  listContainer: {
    paddingHorizontal: 1,
    gap: 12,
  },

  categoryButton: {
    paddingHorizontal: 18,
    height: 42,

    borderRadius: 22,

    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
