import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import Header from '../../components/header/header'
import { COLORS } from '../../constants'


const _layout = () => {
  return (
  <>
    {/* <Header/> */}
    <Stack screenOptions={{
      header:()=><Header/>,
      headerTransparent:true
    }} />
  </>
  )
}

export default _layout

const styles = StyleSheet.create({})