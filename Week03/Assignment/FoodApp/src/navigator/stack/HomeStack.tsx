import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/HomeStackScreen/HomeScreen";
import ProfileScreen from "../../screens/HomeStackScreen/FoodScreen";
import { useTheme } from "../../context/ThemeContext";
import HomeScreenHeader from "../../components/Home/HomeScreenHeader";
import FoodScreen from "../../screens/HomeStackScreen/FoodScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { isDarkMode, theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerShown:true,
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
          title: "Food Home",
          header:({navigation,route})=><HomeScreenHeader/>
        }}
      />

      <Stack.Screen
        name="Food"
        component={FoodScreen}
        options={{
          title: "Food Item",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
}

/*

<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    header: () => <YourCustomHeader title="Food Home" />,
  }}
/>

*/
