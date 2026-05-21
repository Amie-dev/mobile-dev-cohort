import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

import RootNavigator from "./src/navigator/RootNavigator";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

function AppContent() {
  const { isDarkMode, theme } = useTheme();

  useEffect(() => {
    NavigationBar.setStyle(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        backgroundColor={theme.tabBg}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />

      <RootNavigator />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}