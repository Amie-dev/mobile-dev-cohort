import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "../../context/ThemeContext";

import CustomDrawerContent from "../../components/CustomDrawerContent";
import ProfileScreen from "../../screens/DrawerScreen/ProfileScreen";
import SettingsScreen from "../../screens/DrawerScreen/SettingsScreen";
import HelpScreen from "../../screens/DrawerScreen/HelpScreen";

const Drawer = createDrawerNavigator();

// const ProfileScreen = () => {
//   return (
//     <View style={styles.screen}>
//       <Text>Drawer Profile Screen</Text>
//     </View>
//   );
// };

// const SettingsScreen = () => {
//   return (
//     <View style={styles.screen}>
//       <Text>Drawer Settings Screen</Text>
//     </View>
//   );
// };

const OrdersScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Orders Screen</Text>
    </View>
  );
};

// const HelpScreen = () => {
//   return (
//     <View style={styles.screen}>
//       <Text>Help Screen</Text>
//     </View>
//   );
// };

export default function ProfileDrawer() {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
     screenOptions={({ navigation, route }) => ({
  headerShown: true,

  drawerType: "slide",

  headerTitle: route.name,

  headerTitleStyle: {
    color: theme.text,
    fontSize: 30,
    fontWeight: "900",
  },

  headerStyle: {
    backgroundColor: theme.background,
  },

  headerShadowVisible: false,

  // REMOVE DEFAULT LEFT ICON
  headerLeft: () => null,

  // CUSTOM RIGHT MENU BUTTON
  headerRight: () => (
    <Pressable
      style={[
        styles.menuButton,
        {
          backgroundColor: theme.card,
        },
      ]}
      onPress={() => navigation.openDrawer()}
    >
      <Ionicons
        name="menu-outline"
        size={24}
        color={theme.primary}
      />
    </Pressable>
  ),

  drawerStyle: {
    width: "78%",
    backgroundColor: theme.background,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },

  sceneContainerStyle: {
    backgroundColor: theme.background,
  },
})}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Drawer.Screen
        name="Help"
        component={HelpScreen}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },


  menuButton: {
  width: 52,
  height: 52,

  marginRight: 18,

  borderRadius: 18,

  justifyContent: "center",
  alignItems: "center",

  elevation: 4,
}
});