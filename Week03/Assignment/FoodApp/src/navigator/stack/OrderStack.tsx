import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OrderScreen from '../../screens/OrderScreen'

const OrderStack = () => {
  const Stack=createStackNavigator()
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name='order' component={OrderScreen} />
    </Stack.Navigator>
  )
}

export default OrderStack

const styles = StyleSheet.create({})