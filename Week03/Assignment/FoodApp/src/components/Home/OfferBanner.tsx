import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import { useTheme } from "../../context/ThemeContext";

const OFFER_DATA = [
  {
    id: "1",
    title: "50% OFF",
    subtitle: "On First Order",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  },

  {
    id: "2",
    title: "Free Delivery",
    subtitle: "Above ₹499",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },

  {
    id: "3",
    title: "Buy 1 Get 1",
    subtitle: "Weekend Special",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
];

const OfferBanner = () => {
  const { theme } = useTheme();

  const { width } = useWindowDimensions();

  const flatListRef =
    useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const bannerWidth = width * 0.82 + 16;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === OFFER_DATA.length - 1
          ? 0
          : currentIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderBanner = ({ item }: any) => {
    return (
      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            width: width * 0.82,
          },
        ]}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />

        <View style={styles.overlay} />

        <View style={styles.content}>
          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.subtitle}>
            {item.subtitle}
          </Text>

          <Pressable
            style={[
              styles.button,
              {
                backgroundColor:
                  theme.primary,
              },
            ]}
          >
            <Text style={styles.buttonText}>
              Order Now
            </Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={OFFER_DATA}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          styles.listContainer
        }
        snapToAlignment="start"
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x /
              bannerWidth
          );

          setCurrentIndex(index);
        }}
      />

      {/* DOTS */}
      <View style={styles.dotContainer}>
        {OFFER_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  currentIndex === index
                    ? theme.primary
                    : theme.border,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default OfferBanner;

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },

  listContainer: {
    paddingHorizontal: 1,
    gap: 16,
  },

  card: {
    height: 220,

    borderRadius: 28,

    overflow: "hidden",

    justifyContent: "center",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(0,0,0,0.45)",
  },

  content: {
    paddingHorizontal: 22,
  },

  title: {
    color: "#fff",

    fontSize: 34,

    fontWeight: "900",
  },

  subtitle: {
    marginTop: 6,

    color: "#f3f4f6",

    fontSize: 16,

    fontWeight: "600",
  },

  button: {
    marginTop: 18,

    alignSelf: "flex-start",

    paddingHorizontal: 18,
    paddingVertical: 10,

    borderRadius: 18,
  },

  buttonText: {
    color: "#fff",

    fontSize: 14,

    fontWeight: "700",
  },

  dotContainer: {
    flexDirection: "row",

    justifyContent: "center",

    marginTop: 8,

    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,

    borderRadius: 4,
  },
});