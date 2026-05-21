import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeStack from "../stack/HomeStack";
import SearchStack from "../stack/SearchStack";
import OrderStack from "../stack/OrderStack";
import ProfileStack from "../stack/ProfileStack";
import ProfileDrawer from "../drawer/ProfileDrawer";
import { useTheme } from "../../context/ThemeContext";

const Tab = createBottomTabNavigator();

const COLORS = {
  tabBg: "#1b1b1b",
  active: "#ff6b35",
  inactive: "#9ca3af",
};

const TabNavigator = () => {
  // const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const tabBarBaseStyle = {
    // position: "absolute" as const,
    left: 18,
    right: 18,
    // bottom: Math.max(insets.bottom + 4, 16),
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.tabBg,
    borderTopWidth: 0,
    elevation: 8,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        headerShown: false,

        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.active,
        tabBarInactiveTintColor: theme.inactive,

        tabBarStyle: tabBarBaseStyle,

        tabBarItemStyle: {
          height: 72,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 6,
        },

        tabBarIconStyle: {
          marginTop: 0,
          marginBottom: 0,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 0,
          marginBottom: 8,
        },

        tabBarIcon: ({ color, focused }: any) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Order") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={23} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }: any) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

          return {
            tabBarStyle:
              routeName !== "Home" ? { display: "none" } : tabBarBaseStyle,
          };
        }}
      />

      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Order" component={OrderStack} />
      {/* <Tab.Screen name="Profile" component={ProfileStack} /> */}
      <Tab.Screen name="Profile" component={ProfileDrawer} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
