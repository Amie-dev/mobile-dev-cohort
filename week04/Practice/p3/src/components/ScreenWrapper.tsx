import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// import { useTheme } from "@/context/ThemeContext";

type Props = {
  children: ReactNode;
};

export default function ScreenWrapper({ children }: Props) {
  // const { theme } = useTheme();

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{
        flex: 1,
        paddingHorizontal: 18,
        // backgroundColor: theme.background,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
