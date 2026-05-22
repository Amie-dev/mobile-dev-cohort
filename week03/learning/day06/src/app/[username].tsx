import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const UserNameScreen = () => {
  const {username}=useLocalSearchParams()
  return (
    <View>
      <Text>{username}</Text>
      <Text>UserNameScreen</Text>
    </View>
  )
}

export default UserNameScreen

const styles = StyleSheet.create({})