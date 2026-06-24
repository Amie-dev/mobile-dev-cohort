import { Text, View, StyleSheet, Touchable, Pressable } from "react-native";
import * as Notifications from 'expo-notifications';
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Index() {

async function example_basic(){
  await Notifications.scheduleNotificationAsync({
    content:{
      title:"",
      body:""
    }
    ,
    trigger:null
  })
}

async function example_basic1(){
  await Notifications.scheduleNotificationAsync({
    content:{
      title:"",
      body:"",
      subtitle:""
    }
    ,
    trigger:null
  })
}

async function example_basic2(){
  await Notifications.scheduleNotificationAsync({
    content:{
      title:"First Notifications",
      body:"this is testing notifactions",
      data:{
        screen:"",
        route:"/app/ok/this redirect"

      }
    }
    ,
    trigger:null
  })
}

useEffect(()=>{
  Notifications.addNotificationReceivedListener((response)=>{
    const data=response.request.content.data
    console.log(response)
  })
},[])


  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
      <Pressable onPress={example_basic}>
        <Text>Send Notifactions</Text>
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
