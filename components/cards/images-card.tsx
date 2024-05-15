import { Dimensions, Image, ImageStyle, StyleProp, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
const ScreenWidth=Dimensions.get("screen").width
type Props = {
    mainImage:string
    number:number
}
export interface IImageSlider {
    ImageStyle?: StyleProp<ImageStyle>;
  }

const ImagesCard = ({mainImage,number}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri:mainImage}} style={{width:"100%",height:"100%",borderRadius:30}} />
      <Text style={{position:"absolute",color:COLORS.white,fontWeight:"700"}}>
        +{number}
      </Text>
    </View>
  )
}

export default ImagesCard

const styles = StyleSheet.create({
    container:{
        width:ScreenWidth/3,
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