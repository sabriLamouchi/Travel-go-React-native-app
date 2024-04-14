import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

type Props = {}

const SearchedDistination = (props: Props) => {
    const params=useLocalSearchParams()
  return (
    <View>
      <Text>
        {params.id}
      </Text>
    </View>
  )
}

export default SearchedDistination

const styles = StyleSheet.create({})