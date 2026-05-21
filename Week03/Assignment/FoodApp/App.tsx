import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import RootNavigator from "./src/navigator/RootNavigator";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { StatusBar } from "react-native";

function AppContent() {
  const { isDarkMode, theme } = useTheme();

  useEffect(() => {
    NavigationBar.setStyle(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        backgroundColor={theme.tabBg}
        // barStyle={}
        barStyle={!isDarkMode ? "dark-content" : "light-content"}
      />
      <RootNavigator />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    // <SafeAreaProvider>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
    // </SafeAreaProvider>
  );
}
