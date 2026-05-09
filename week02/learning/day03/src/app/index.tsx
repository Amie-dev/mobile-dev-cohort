import { Text, View, StyleSheet, Image, Pressable, Alert } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      {/* image show */}
      {/* <Image src={require("@/assets/images/icon.png")} style={{
        width:100,
        height:100
      }}
      /> */}

      <Pressable
      onPress={()=>{
        Alert.alert("Press","Is Pressing....")
      }}

      hitSlop={{
        top:10
      }}
      
      
      style={
        ({pressed})=>({
          backgroundColor:pressed? "#1c1":"#2f2"
        })
      }

      >
        {
          ({pressed})=>(pressed?<Text>Pressing..</Text>:<Text>Press me!</Text>)
        }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
