import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useSearchedData } from '../../../lib/store'

type Props = {
    params: {
        hotel_id: string
    }
}
const HotelId = (props: Props) => {
    const params=useLocalSearchParams()
    const{data:hotels}=useSearchedData()
    const hotel=useMemo(()=>hotels?.find((item)=>item.property.id==params.hotel_id),[hotels,params.hotel_id])
    console.log(hotel);
    console.log(params.hotel_id)
  return (
    <View>
      <Text>HotelId: {params.hotel_id}</Text>
    </View>
  )
}

export default HotelId

const styles = StyleSheet.create({})