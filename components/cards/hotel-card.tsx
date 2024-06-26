import { Dimensions, Image, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT, SIZES } from '../../constants'
import { useRouter } from 'expo-router';
const ScreenWidth=Dimensions.get("screen").width
type Props = {
    hotelImage:string
    hotelName:string,
    reviewScore?:number,
    hotelId?:string
}
export interface IImageSlider {
    ImageStyle?: StyleProp<ImageStyle>;
  }

const HotelCard = ({hotelImage,hotelName,reviewScore,hotelId}: Props) => {
  const router=useRouter()
  return (
    <TouchableOpacity onPress={()=>{router.navigate(`(hotelDetail)/${hotelId}`)}} style={styles.container}>
      <Image source={{uri:hotelImage}} style={{width:"100%",height:"100%",borderRadius:30}} resizeMode='cover' />
      <View style={styles.label}>
        <Text style={{fontFamily:FONT.regular,fontSize:SIZES.xSmall,fontWeight:"700",textAlign:"center",overflow:"hidden"}}>
             {hotelName}
        </Text>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:3}}>
            <Text style={{fontSize:SIZES.xSmall,color:COLORS.lightSecondary}}> 
                {reviewScore}
            </Text>
            <Ionicons name="star" size={20} color={COLORS.yellow} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HotelCard

const styles = StyleSheet.create({
    container:{
        width:ScreenWidth/2.5,
        height:180,
        position:"relative",
        elevation:5,
        shadowColor:COLORS.dark,
        shadowOffset:{width:5,height:10},
        shadowOpacity:0.2
    },
    label:{
        position:"absolute",
        bottom:0,
        width:"100%",
        backgroundColor:COLORS.white,
        borderRadius:30,
        borderTopLeftRadius:0
    }
})