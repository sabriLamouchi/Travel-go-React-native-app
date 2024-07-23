import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View , TouchableWithoutFeedback,Image, Dimensions, FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { GetHotelDetails, useHotelDetails, useSearchedData } from '../../../lib/store'
import { useQueries, useQuery } from '@tanstack/react-query'
import { COLORS } from '../../../constants'
import { hotleRooms } from '../../../constants/data';
import Gallery from '../../../components/gallery'
type Props = {
    params: {
        hotel_id: string
    }
}

const { height,width } = Dimensions.get('window');
const HotelId = (props: Props) => {
    const [hotelRoomImages,setHotelRoomImages]=useState<string[]>(null)
    const params=useLocalSearchParams()
    const{data:hotels}=useSearchedData()
    const {hotelsDetails,setHotelsDetails}=useHotelDetails()
    const hotel=useMemo(()=>hotels?.find((item)=>item.property.id==params.hotel_id),[hotels,params.hotel_id])
    console.log(hotel);
    console.log(hotelsDetails)
    const{isPending,data,error}=useQuery({
        queryKey: ['hotelDetails',params.hotel_id,hotel],
        queryFn:async ()=>{
            const details=hotelsDetails?.find((item)=>item.id==params.hotel_id);
            if(details==undefined){
              await GetHotelDetails(params.hotel_id as string,hotel.property.checkinDate,hotel.property.checkoutDate).then((res)=>{
                setHotelsDetails([...hotelsDetails,res]);
                return res;
              })
            }else{
              return details;
            }
        }
    })
    useEffect(()=>{
      hotelsDetails?.map((item)=>{
        console.log(item.hotel_id);
        if(item.hotel_id==params.hotel_id){
          item?.rooms.forEach((item:any)=>{
            if(item.photos.length>0){
              item.photos.forEach((photo:any)=>{
                setHotelRoomImages([...hotelRoomImages,photo.url_original]);
              })
            }
          })
        }
      })
    },[hotelRoomImages,hotelsDetails])
  return (
    <SafeAreaView style={{flex:1}}>
       {
        isPending?<ActivityIndicator color={COLORS.green} size="large"/>
        : error?<Text>{error.message}</Text>:
        // <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        //     <Text>{data?.hotel_id}</Text>
        // </View>
            <Gallery images={hotleRooms}/>
       }
    </SafeAreaView>
  )
}

export default HotelId

const styles = StyleSheet.create({
    viewImage:{
        width:width,
        height:"75%",
        backgroundColor:'green',
      }
})