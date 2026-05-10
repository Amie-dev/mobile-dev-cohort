import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FlattenStyle = () => {

  const flat=StyleSheet.flatten([styleA.text,styleB.text])//marge two style

  return (
    <View>
      <Text style={flat}>FlattenStyle</Text>
    </View>
  )
}

export default FlattenStyle

const styleA = StyleSheet.create({text:{

}})
const styleB = StyleSheet.create({text:{

}})
