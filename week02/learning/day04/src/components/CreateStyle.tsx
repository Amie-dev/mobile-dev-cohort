import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CreateStyle = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>CreateStyle</Text>
      <Text style={
        styles.subtitle
      }>CreateStyle</Text>
    </View>
  )
}

export default CreateStyle

const styles = StyleSheet.create({
  card:{
    backgroundColor:"#ffffff"
  },
  title:{

  },
  subtitle:{

  }
})


//shadow
//andorid
/*
elevation:4

*/
//ios
// shadowColor:"#1v1v1",
// shadowOpacity:0.1,
// shadowRadius:8