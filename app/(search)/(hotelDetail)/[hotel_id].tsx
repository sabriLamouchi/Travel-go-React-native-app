import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { GetHotelDetails, useHotelDetails, useSearchedData } from '../../../lib/store'
import { useQueries, useQuery } from '@tanstack/react-query'
import { COLORS } from '../../../constants'

type Props = {
    params: {
        hotel_id: string
    }
}
const HotelId = (props: Props) => {
    const params=useLocalSearchParams()
    const{data:hotels}=useSearchedData()
    const {hotelsDetails,setHotelsDetails}=useHotelDetails()
    const hotel=useMemo(()=>hotels?.find((item)=>item.property.id==params.hotel_id),[hotels,params.hotel_id])
    console.log(hotel);
    console.log(params.hotel_id)
    const{isPending,data,error}=useQuery({
        queryKey: ['hotelDetails',params.hotel_id,hotel],
        queryFn:async ()=>{
            const details=hotelsDetails?.find((item)=>item.id==params.hotel_id);
            if(details==undefined){
              await GetHotelDetails(params.hotel_id,hotel.property.checkinDate,hotel.property.checkoutDate).then((res)=>{
                setHotelsDetails([...hotelsDetails,res])
                return res;
              })
            }else{
              return details;
            }
        }
    })
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       {
        isPending?<ActivityIndicator color={COLORS.green} size="large"/>
        : error?<Text>{error.message}</Text>:
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>{data?.hotel_id}</Text>
        </View>
       }
    </SafeAreaView>
  )
}

export default HotelId

const styles = StyleSheet.create({})