export type ThemeColors = {
  background: string;
  card: string;
  primary: string;
  primaryLight: string;
  text: string;
  secondaryText: string;
  border: string;
  inputBackground: string;
  shadow: string;
  switchTrack: string;
  switchThumb: string;
};

type ColorsType = {
  light: ThemeColors;
  dark: ThemeColors;
};

export const COLORS: ColorsType = {
  light: {
    background: "#F6F7FB",
    card: "#FFFFFF",

    // Modern Indigo
    primary: "#6366F1",
    primaryLight: "#E0E7FF",

    text: "#111827",
    secondaryText: "#6B7280",

    border: "#c6d5df",

    inputBackground: "#FFFFFF",

    shadow: "#000000",

    switchTrack: "#C7D2FE",
    switchThumb: "#FFFFFF",
  },

  dark: {
    background: "#0F172A",
    card: "#1E293B",

    // Soft Premium Indigo
    primary: "#818CF8",
    primaryLight: "#312E81",

    text: "#F8FAFC",
    secondaryText: "#94A3B8",

    border: "#334155",

    inputBackground: "#1E293B",

    shadow: "#000000",

    switchTrack: "#4338CA",
    switchThumb: "#FFFFFF",
  },
};