import { Dimensions, Image, ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
const ScreenWidth=Dimensions.get("screen").width
type Props = {
    mainImage:string
    number:number,
    onclick?:()=>void
}
export interface IImageSlider {
    ImageStyle?: StyleProp<ImageStyle>;
  }

const ImagesCard = ({mainImage,number,onclick}: Props) => {
  return (
    <TouchableOpacity onPress={onclick} style={styles.container}>
      <Image source={{uri:mainImage}} style={{width:"100%",height:"100%",borderRadius:30}} />
      <View style={{position:"absolute",width:"100%",height:"100%",backgroundColor:COLORS.gray,borderRadius:30,opacity:0.5}} />
      <Text style={{position:"absolute",color:COLORS.white,fontWeight:"700"}}>
        +{number}
      </Text>
    </TouchableOpacity>
  )
}

export default ImagesCard

const styles = StyleSheet.create({
    container:{
        width:ScreenWidth/2.8,
        height:150,
        position:"relative",
        justifyContent:"center",
        alignItems:"center",
        elevation:5,
        shadowColor:COLORS.dark,
        shadowOffset:{width:8,height:10},
        shadowOpacity:0.2
    }
})