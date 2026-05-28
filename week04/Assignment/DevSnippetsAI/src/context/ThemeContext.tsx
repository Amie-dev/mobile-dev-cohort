import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

import { COLORS } from "@/constants/colors";

// ================= TYPES =================

type ThemeMode = "light" | "dark" | null;

type ThemeContextType = {
  theme: typeof COLORS.light;
  isDarkMode: boolean;

  // current selected mode
  manualMode: ThemeMode;

  // toggle light/dark
  toggleTheme: () => void;

  // follow phone theme
  resetToSystemTheme: () => void;
};

// ================= CONTEXT =================

const ThemeContext = createContext<ThemeContextType | null>(null);

// ================= STORAGE KEY =================

const THEME_STORAGE_KEY = "@theme_mode";

// ================= PROVIDER TYPES =================

type Props = {
  children: ReactNode;
};

// ================= PROVIDER =================

export const ThemeProvider = ({ children }: Props) => {
  // phone theme
  const systemColor = useColorScheme();

  // null = follow system theme
  const [manualMode, setManualMode] = useState<ThemeMode>(null);

  // ================= LOAD SAVED THEME =================

  useEffect(() => {
    loadSavedTheme();
  }, []);

  // get saved theme from AsyncStorage
  const loadSavedTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);

      if (
        savedTheme === "light" ||
        savedTheme === "dark" ||
        savedTheme === "system"
      ) {
        setManualMode(savedTheme === "system" ? null : savedTheme);
      }
    } catch (error) {
      console.log("Error loading theme:", error);
    }
  };

  // ================= CURRENT MODE =================

  const currentMode =
    manualMode ?? (systemColor === "dark" ? "dark" : "light");

  const isDarkMode = currentMode === "dark";

  // ================= TOGGLE THEME =================

  const toggleTheme = async () => {
    try {
      const newMode = isDarkMode ? "light" : "dark";

      setManualMode(newMode);

      // save selected theme
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch (error) {
      console.log("Error saving theme:", error);
    }
  };

  // ================= RESET SYSTEM THEME =================

  const resetToSystemTheme = async () => {
    try {
      setManualMode(null);

      // save system mode
      await AsyncStorage.setItem(THEME_STORAGE_KEY, "system");
    } catch (error) {
      console.log("Error resetting theme:", error);
    }
  };

  // ================= SELECT THEME COLORS =================

  const theme = useMemo(() => {
    return isDarkMode ? COLORS.dark : COLORS.light;
  }, [isDarkMode]);

  // ================= PROVIDER =================

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        manualMode,
        toggleTheme,
        resetToSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ================= CUSTOM HOOK =================

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};