import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import Header from '../../components/header/header'
import { COLORS } from '../../constants'
const _layout = () => {
  return (
      <Stack initialRouteName='[dest_id]' screenOptions={{
        header:()=><Header/>,
        headerTransparent:true
      }}>
        <Stack.Screen name="[dest_id]"/>
        <Stack.Screen name="hotelsModal" 
        options={{
          headerShown:false,
          presentation: 'modal',
        }}/>
      </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})