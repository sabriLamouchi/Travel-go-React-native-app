import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

interface Props {
    images: string[] | null;
    
}
const { height,width } = Dimensions.get('window');
const Gallery = ({images}: Props) => {
    const[viewImage,setViewImage]=useState<string|null>(images[0])
  return (
    <View style={{justifyContent:'flex-start',alignItems:'center',height:height*2/5}}>
    <View style={styles.viewImage}>
      <Image source={{uri:viewImage}} style={{width:width,height:"100%"}}/>
    </View>
    <FlatList
    showsHorizontalScrollIndicator={false}
      data={images}
      style={{borderBottomLeftRadius:25,borderBottomRightRadius:25}}
      keyExtractor={(item,index)=>index.toString()}
      horizontal={true}
      renderItem={({item})=>(
        <TouchableOpacity style={{width:width/5,height:100,justifyContent:'center',alignItems:'center'}} onPress={()=>{
          setViewImage(item)
          console.log(item)
        }}>
          <Image source={{uri:item}} style={{width:width/5,height:100}}/>
        </TouchableOpacity>
      )}/>
 </View>
  )
}

export default Gallery

const styles = StyleSheet.create({
    viewImage:{
        width:width,
        height:"75%",
        backgroundColor:'green',
      }
})