import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import Header from '../../components/header/header'


const _layout = () => {
  return (
  <>
    <Header/>
    <Slot/>
  </>
  )
}

export default _layout

const styles = StyleSheet.create({})