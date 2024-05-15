import { ActivityIndicator, Dimensions, FlatList, Image, ImageStyle, SafeAreaView, ScrollView, StatusBar, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { searchDestination } from '../../constants/data'
import { COLORS, FONT, SIZES } from '../../constants'
import useSearchPhoto from '../../hooks/useSearchPhoto'
import SwiperFlatList from 'react-native-swiper-flatlist'
import Rates from '../../components/rates'
import PagerView from 'react-native-pager-view';
import { Animated } from 'react-native'
import HotelCard from '../../components/cards/hotel-card'
import { hotel } from '../../constants/data'
import ImagesCard from '../../components/cards/images-card'
type Props = {}
const ScreenWidth=Dimensions.get("screen").width
const ScreenHeight=Dimensions.get("screen").height
const pages=["Hotels","foods","Activities","communities"]
const AnimatPager=Animated.createAnimatedComponent(PagerView);
export interface IImageSlider {
  ImageStyle?: StyleProp<ImageStyle>;
}
const SearchedDistination = (props: Props) => {
    const params=useLocalSearchParams()
    // const [photos,setPhotos]=useState(null)
    const{data,isLoading}=useSearchPhoto({query:params.dest_id as string});
    const [pageindex,setPageIndex]=useState(0);
    const [currentPageIndex,setCurrentpageindex]=useState<number>(0)
    // console.log(data)

    //tab view logic 
    const pagerViewRef=useRef(null)
    

  console.log(pageindex)
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
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
              <Image source={{uri:item.urls.regular}} width={ScreenWidth}  style={{ borderBottomLeftRadius:30,
              borderBottomRightRadius:30,}} />
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
      <View style={styles.container}>
        <View style={{width:"100%"}}>
          <ScrollView contentContainerStyle={{marginTop:10,padding:10, gap:30}} horizontal showsHorizontalScrollIndicator={false}>
            {pages.map((item,index)=>{
              return(
                <TouchableOpacity onPress={()=>{
                  pagerViewRef.current?.setPage(index)
                  console.log(pagerViewRef.current?.props.children.indexOf(pagerViewRef.current?.props.children[index]))
                  setCurrentpageindex(pagerViewRef.current?.props.children.indexOf(pagerViewRef.current?.props.children[index]))
                  setPageIndex(index)
                }} style={styles.pageButton(index,currentPageIndex)}>
                <Text style={{fontFamily:FONT.large,fontSize:SIZES.xSmall,...styles.textButton(index,currentPageIndex)}}>
                  {item}
                </Text>
              </TouchableOpacity>
              )
          })}
          </ScrollView>
          <View style={{width:ScreenWidth}}>
            <AnimatPager style={{justifyContent:"center",alignItems:"center",width:'auto',height:ScreenHeight}} initialPage={0} ref={pagerViewRef}>
              <View style={styles.page} key="1">
                <View style={{marginHorizontal:30,marginVertical:10,flexDirection:"row",gap:20,alignItems:"center"}}>
                  <HotelCard hotelImage={hotel.photoUrls} hotelName={hotel.name} reviewScore={hotel.reviewScorex} />
                  {data && <ImagesCard mainImage={data.results[0].urls.regular} number={10} />}
                </View>
              </View>
              <View style={styles.page} key="2">
                <Text>Second page</Text>
              </View>
              <View style={styles.page} key="3">
                <Text>Third page</Text>
              </View>
            </AnimatPager>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SearchedDistination

const styles = StyleSheet.create<any>({
  destinationView:{
    height:ScreenHeight/2.5,
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
    
  },
  container:{
    flex:1,
    backgroundColor:COLORS.primary,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    overflow:"hidden",
    width:ScreenWidth,
  },
  page:{
    width:"100%"
  },
  pageButton:(index:number,currentPageIndex:number)=>({
    width:100,
    justifyContent:"center",
    alignItems:"center",
    padding:12,
    borderRadius:30,
    backgroundColor:index == currentPageIndex ? COLORS.lightSecondary : COLORS.white,
  }),
  textButton:(index:number,currentPageIndex:number)=>({
    color:index == currentPageIndex ? COLORS.white : COLORS.primary,
  })
})