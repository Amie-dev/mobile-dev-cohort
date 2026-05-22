import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { useColorScheme } from "react-native";

import { COLORS } from "../constants/Colors";

type ThemeContextType = {
  theme: typeof COLORS.light;
  isDarkMode: boolean;
  toggleTheme: () => void;
  resetToSystemTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const systemColor = useColorScheme();

  // null means follow phone theme
  const [manualMode, setManualMode] = useState<"light" | "dark" | null>(null);

  const currentMode =
    manualMode ?? (systemColor === "dark" ? "dark" : "light");

  const isDarkMode = currentMode === "dark";

  const toggleTheme = () => {
    setManualMode(isDarkMode ? "light" : "dark");
  };

  const resetToSystemTheme = () => {
    setManualMode(null);
  };

  const theme = useMemo(() => {
    return isDarkMode ? COLORS.dark : COLORS.light;
  }, [isDarkMode]);

  // console.log({
  //   systemColor,
  //   isDarkMode,
  //   theme
  // })
  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleTheme,
        resetToSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};