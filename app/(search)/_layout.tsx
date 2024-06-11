import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import Header from '../../components/header/header'
import { COLORS } from '../../constants'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../(tabs)/_layout'
const _layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
          <Stack.Screen name="(hotelDetail)"/>
        </Stack>
        </QueryClientProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})