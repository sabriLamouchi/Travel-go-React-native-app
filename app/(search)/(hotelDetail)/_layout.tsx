import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '../../../components/header/header'
type Props = {}

const _layout = (props: Props) => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        header:()=><Header/>,
      }}
    />
  )
}

export default _layout

const styles = StyleSheet.create({})