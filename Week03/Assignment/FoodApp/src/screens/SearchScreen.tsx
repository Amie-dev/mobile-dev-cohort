import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React, { useState } from "react";

import SearchHeader from "../components/Search/SearchHeader";
import Search from "../components/Home/Search";
import FoodItem from "../components/Home/FoodItem";
import Category from "../components/Home/Category";

import { useTheme } from "../context/ThemeContext";

import {
  FOOD_DATA,
  FoodSchema,
} from "../constants/foodData";

const RenderItemHeader = ({
  theme,
}: any) => {
  return (
    <View style={styles.headerContainer}>
      <Text
        style={[
          styles.headerTitle,
          {
            color: theme.text,
          },
        ]}
      >
        Popular Near You
      </Text>

      <Pressable>
        <Text
          style={[
            styles.seeAllText,
            {
              color: theme.primary,
            },
          ]}
        >
          See All
        </Text>
      </Pressable>
    </View>
  );
};

const SearchScreen = () => {
  const { theme } = useTheme();

  const [filterData, setFilterData] =
    useState<FoodSchema[]>(FOOD_DATA);

  const [searchInput, setSearchInput] =
    useState<string>("");

  const [activeCategory, setActiveCategory] =
    useState<string>("All");

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <SearchHeader />

      <Search
        originalData={FOOD_DATA}
        setFilterData={setFilterData}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <FoodItem
        foodData={filterData}
        ListHeaderComponent={
          <>
            <RenderItemHeader theme={theme} />

            <Category
              originalData={FOOD_DATA}
              setFilterData={setFilterData}
              activeCategory={activeCategory}
              setActiveCategory={
                setActiveCategory
              }
            />
          </>
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    marginTop: 1,

    marginBottom: 10,

    paddingHorizontal: 5,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 22,

    fontWeight: "600",
  },

  seeAllText: {
    fontSize: 14,

    fontWeight: "500",
  },
});