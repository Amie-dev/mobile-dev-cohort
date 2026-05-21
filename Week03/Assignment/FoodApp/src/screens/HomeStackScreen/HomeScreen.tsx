import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import Search from "../../components/Home/Search";
import OfferBanner from "../../components/Home/OfferBanner";
import Category from "../../components/Home/Category";
import FoodItem from "../../components/Home/FoodItem";

import { FOOD_DATA, FoodSchema } from "../../constants/foodData";
import { useTheme } from "../../context/ThemeContext";

const HomeScreen = () => {
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
      {/* <Search
        originalData={FOOD_DATA}
        setFilterData={setFilterData}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      /> */}

      <FoodItem
        foodData={filterData}
        ListHeaderComponent={
          <>
            <Category
              originalData={FOOD_DATA}
              setFilterData={setFilterData}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />

            <OfferBanner />
          </>
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});