import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { COLORS, FONT } from '../../constants'

type Props = {
    style?:ViewStyle
    children:string
    textStyle?:TextStyle
}

const Button = ({style,textStyle,children}: Props) => {
  return (
    <TouchableOpacity style={{...styles.button,...style}} onPress={()=>{}}>
      <Text style={{...styles.text,...textStyle}} >{children}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        backgroundColor:COLORS.green,
        elevation:5,
        shadowColor:COLORS.dark,
        shadowOffset:{width:0,height:5},
        shadowOpacity:0.2,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        color:COLORS.white,
        fontWeight:"500"
    }
})