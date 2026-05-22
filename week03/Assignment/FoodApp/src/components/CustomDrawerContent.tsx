import React from "react";

import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { DrawerContentScrollView } from "@react-navigation/drawer";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const CustomDrawerContent = (props: any) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const {logout}=useAuth()

  const currentRoute = props.state.routeNames[props.state.index];

  const menuItems = [
    {
      label: "Profile",
      icon: "person-outline",
      activeIcon: "person",
      screen: "Profile",
    },
    {
      label: "My Orders",
      icon: "receipt-outline",
      activeIcon: "receipt",
      screen: "Orders",
    },
    {
      label: "Settings",
      icon: "settings-outline",
      activeIcon: "settings",
      screen: "Settings",
    },
    {
      label: "Help",
      icon: "help-circle-outline",
      activeIcon: "help-circle",
      screen: "Help",
    },
  ];

  const handleNavigation = (screen: string) => {
    if (screen === "Orders") {
      props.navigation.navigate("OrderTab");
    } else {
      props.navigation.navigate(screen);
    }

    props.navigation.closeDrawer();
  };
  const handleLogout = () => {
    console.log("Logout");

    // Later connect auth context here
    logout();

    // Example reset when you create Login screen:
    // props.navigation.reset({
    //   index: 0,
    //   routes: [{ name: "Auth" }],
    // });
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* PROFILE */}
        <View style={styles.profileBox}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/32.jpg",
            }}
            style={[
              styles.avatar,
              {
                borderColor: theme.primary,
              },
            ]}
          />

          <Text
            style={[
              styles.name,
              {
                color: theme.text,
              },
            ]}
          >
            Alex Johnson
          </Text>

          <Text
            style={[
              styles.email,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            alex@gmail.com
          </Text>
        </View>

        {/* MENU */}
        <View style={styles.menuBox}>
          {menuItems.map((item) => {
            const isActive = currentRoute === item.screen;

            return (
              <Pressable
                key={item.screen}
                onPress={() => handleNavigation(item.screen)}
                style={[
                  styles.menuItem,

                  {
                    backgroundColor: isActive ? theme.primary : "transparent",
                  },
                ]}
              >
                <Ionicons
                  name={
                    (isActive
                      ? item.activeIcon
                      : item.icon) as keyof typeof Ionicons.glyphMap
                  }
                  size={22}
                  color={isActive ? "#fff" : theme.primary}
                />

                <Text
                  style={[
                    styles.menuText,
                    {
                      color: isActive ? "#fff" : theme.text,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* LOGOUT */}
      <Pressable
        style={[
          styles.logoutButton,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={22} color="#ef4444" />

        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 40,
  },

  profileBox: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
  },

  name: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: "900",
  },

  email: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "500",
  },

  menuBox: {
    paddingHorizontal: 14,
    marginTop: 10,
  },

  menuItem: {
    height: 58,

    borderRadius: 18,

    paddingHorizontal: 18,

    flexDirection: "row",

    alignItems: "center",

    gap: 14,

    marginBottom: 10,
  },

  menuText: {
    fontSize: 16,
    fontWeight: "700",
  },

  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 24,

    height: 58,

    borderRadius: 18,

    borderWidth: 1,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 10,
  },

  logoutText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "800",
  },
});
