import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
const AuthLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}} >
        <Stack.Screen name="welcome" options={{headerShown:false}}/>
        <Stack.Screen name="login"  />
        <Stack.Screen name="register"  />
    </Stack>
  )
}

export default AuthLayout