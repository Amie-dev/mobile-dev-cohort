import { createDrawerNavigator } from "@react-navigation/drawer";
import { View ,Text} from "react-native";

const Drawer = createDrawerNavigator();
const ProfileScreen=()=>{
  return(
    <View>
      <Text>Drawer Profile Screen</Text>
    </View>
  )
}
const SettingsScreen=()=>{
  return(
    <View>
      <Text>Drawer Settings Screen</Text>
    </View>
  )
}

export default function ProfileDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ProfileMain" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}