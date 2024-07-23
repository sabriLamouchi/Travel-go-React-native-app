import { ActivityIndicator, Dimensions, FlatList, Image, ImageStyle, Modal, SafeAreaView, ScrollView, StatusBar, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
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
import ReadMore from '../../components/globals/read-more'
import Button from '../../components/globals/button'
import { useSearchedData } from '../../lib/store'
import { set } from 'date-fns'
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
    const {data:hotels,dest_id,destination}=useSearchedData()
    const [bestHotelIndex,setBestHotelIndex]=useState<number>(0);  
    const [isModalVisible,setIsModalVisible]=useState(false);
    console.log("hotels",hotels,dest_id,destination)

  //best hotel in the list:
  useMemo(()=>{
    var reviewScore=0;
    var BestIndex=0;
    hotels.map((item,index)=>{
      console.log(item.reviewScore);
      if(item.property.reviewScore>reviewScore){
        BestIndex=index;
        reviewScore=item.property.reviewScore;
      }
    })
    setBestHotelIndex(BestIndex);
  },[bestHotelIndex])
  console.log("best hotel index",bestHotelIndex)
  //tab view logic 
  const pagerViewRef=useRef(null)
  console.log(pageindex)
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.white,width:"100%"}}>
      <StatusBar barStyle="default" hidden={true} />
      <View style={styles.destinationView}>
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
            <Image source={{uri:item.urls.regular}} width={ScreenWidth}   style={{ borderBottomLeftRadius:15,
            borderBottomRightRadius:15,}} />
            )}
            />
            <View style={styles.destinationTitle}>
              <Text style={{textAlign:"center",fontFamily:FONT.medium,fontSize:SIZES.xLarge,textTransform:"capitalize",color:COLORS.white}}>
                {params.dest_id as string}
              </Text>
              <Rates text={hotels.length.toString()} iconName='hotel' />
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
          <View style={{width:ScreenWidth,position:"relative"}}>
            <AnimatPager style={{justifyContent:"center",alignItems:"center",width:'auto',height:ScreenHeight}} initialPage={0} ref={pagerViewRef}>
              <ScrollView contentContainerStyle={styles.page}  showsVerticalScrollIndicator={false} key="1">
                <View style={{marginHorizontal:30,marginVertical:10,flexDirection:"row",gap:20,alignItems:"center"}}>
                  <HotelCard hotelImage={hotels[bestHotelIndex].property.photoUrls[0]} hotelName={hotels[bestHotelIndex].property.name} reviewScore={hotels[bestHotelIndex].property.reviewScore} hotelId={hotels[bestHotelIndex].property.id} />
                  {/* <Link href="/hotelsModal"> */}
                  {data && <ImagesCard mainImage={data.results[0].urls.regular} onclick={()=>{setIsModalVisible(true)}} number={hotels.length} />}
                  {/* </Link> */}
                </View>
                <View style={{marginHorizontal:10}} >
                  <Text style={{fontFamily:FONT.bold,fontSize:SIZES.small}} > Details </Text>
                  <ReadMore maxChar={100} textStyle={{marginTop:10,fontFamily:FONT.light,fontSize:SIZES.small,marginLeft:10}}  >
                     {hotels[bestHotelIndex].accessibilityLabel}
                  </ReadMore>
                </View>
              </ScrollView>
              <View style={styles.page} key="2">
                <Text>Second page</Text>
              </View>
              <View style={styles.page} key="3">
                <Text>Third page</Text>
              </View>
            </AnimatPager>
            <Button style={{width:"30%",height:50,alignSelf:"center",bottom:380,position:"absolute"}} textStyle={{fontSize:SIZES.medium}} >
                  Continue
            </Button>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
        >
        <View style={{height:ScreenHeight*0.6,backgroundColor:COLORS.primary,bottom:0,position:"absolute",left:0,right:0, borderTopLeftRadius:30,borderTopRightRadius:30}}>
        <TouchableOpacity onPress={()=>setIsModalVisible(false)} style={{ width: '100%', height: 'auto', backgroundColor:COLORS.lightSecondary,justifyContent:"center",alignItems:"center",padding:10,borderTopEndRadius:30,borderTopStartRadius:30 }}>
          <Text style={{ fontSize:SIZES.large, fontWeight: "bold",color:COLORS.white }}>Hotels</Text>
         </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent:"center",alignItems:"center",flexDirection:"row",flexWrap:"wrap",rowGap:20,columnGap:20,marginTop:10 }}>
            {
              hotels.map((item,index)=>(
                  <HotelCard hotelImage={hotels[index].property.photoUrls[0]} hotelName={hotels[index].property.name} reviewScore={hotels[index].property.reviewScore} hotelId={hotels[index].property.id} />
              ))
            }
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default SearchedDistination

const styles = StyleSheet.create<any>({
  destinationView:{
    height:ScreenHeight*0.45,
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    zIndex:-1,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,

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
    width:"100%",
    paddingBottom:400,
    position:"relative"
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
    color:index == currentPageIndex ? COLORS.white : COLORS.dark,
  })
})