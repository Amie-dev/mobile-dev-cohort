import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { FoodSchema } from "../../constants/foodData";

import { useTheme } from "../../context/ThemeContext";

type Props = {
  originalData: FoodSchema[];

  setFilterData: React.Dispatch<
    React.SetStateAction<FoodSchema[]>
  >;

  searchInput: string;

  setSearchInput: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const Search = ({
  originalData,
  setFilterData,
  searchInput,
  setSearchInput,
}: Props) => {
  const { theme } = useTheme();

  const handleSearch = (text: string) => {
    setSearchInput(text);

    if (text.trim() === "") {
      setFilterData(originalData);
      return;
    }

    const filteredData = originalData.filter(
      (item) =>
        item.foodName
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        item.restaurantName
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        item.foodCategory
          .toLowerCase()
          .includes(text.toLowerCase())
    );

    setFilterData(filteredData);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
        },
      ]}
    >
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <Ionicons
          name="search"
          size={22}
          color={theme.secondaryText}
        />

        <TextInput
          value={searchInput}
          onChangeText={handleSearch}
          placeholder="Search food..."
          placeholderTextColor={theme.secondaryText}
          style={[
            styles.input,
            {
              color: theme.text,
            },
          ]}
        />

        {searchInput.length > 0 && (
          <Pressable
            onPress={() => {
              setSearchInput("");
              setFilterData(originalData);
            }}
          >
            <Ionicons
              name="close-circle"
              size={22}
              color={theme.secondaryText}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },

  searchContainer: {
    height: 54,

    borderRadius: 18,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 16,

    gap: 10,
  },

  input: {
    flex: 1,

    fontSize: 15,

    fontWeight: "500",
  },
});