import { ActivityIndicator, Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { searchDestination } from '../../constants/data'
import { COLORS, FONT, SIZES } from '../../constants'
import useSearchPhoto from '../../hooks/useSearchPhoto'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Rates from '../../components/rates'
type Props = {}
const ScreenWidth=Dimensions.get("screen").width
const SearchedDistination = (props: Props) => {
    const params=useLocalSearchParams()
    // const [photos,setPhotos]=useState(null)
    const{data,isLoading}=useSearchPhoto({query:params.dest_id as string});
    console.log(data)
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.primary}}>
      <View style={styles.destinationView} >
        {
          isLoading?(
            <ActivityIndicator color={COLORS.green} size="large" />
          )
          :data ? (
            <>
            <SwiperFlatList
            index={0}
            data={data.results}
            autoplay
            autoplayLoop={true}
            autoplayLoopKeepAnimation={true}
            autoplayDelay={3}
            renderItem={({ item,index }) => (
              <Image source={{uri:item.urls.regular}} width={ScreenWidth} height={350} style={styles.destinationImage} />
            )}
            />
            <View style={styles.destinationTitle}>
              <Text style={{textAlign:"center",fontFamily:FONT.medium,fontSize:SIZES.xLarge,textTransform:"capitalize",color:COLORS.white}}>
                {params.dest_id as string}
              </Text>
              <Rates text={searchDestination.hotels  } iconName='hotel' />
            </View>
            </>
          ):(
            <ActivityIndicator color={COLORS.green} size="large" />
          )
        }
      </View>
    </SafeAreaView>
  )
}

export default SearchedDistination

const styles = StyleSheet.create({
  destinationView:{
    height:420,
    justifyContent:"center",
    alignItems:"center",

  },
  destinationImage:{
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },
  destinationTitle:{
    position:"absolute",
    paddingHorizontal:20,
    paddingVertical:10,
    
  }
})