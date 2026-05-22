import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/HomeStackScreen/HomeScreen";
import FoodScreen from "../../screens/HomeStackScreen/FoodScreen";
import HomeScreenHeader from "../../components/Home/HomeScreenHeader";
import { useTheme } from "../../context/ThemeContext";
import FoodHeader from "../../components/Food/FoodHeader";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.tabBg,
        },
        headerTintColor: theme.secondaryText,
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <HomeScreenHeader />,
        }}
      />

      <Stack.Screen
        name="Food"
        component={FoodScreen}
        options={{
          title: "Food Item",
          headerBackTitle: "Back",
          header:()=><FoodHeader/>
        }}
      />
    </Stack.Navigator>
  );
}