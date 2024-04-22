import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { COLORS, FONT, SIZES } from '../constants'
type Props = {
    text:string,
    iconName:string
}

const Rates = ({text,iconName}: Props) => {
  return (
    <View style={styles.main}>
        <Text style={{color:COLORS.secondary,fontFamily:FONT.bold,fontSize:SIZES.small}}>
            {text}
        </Text>
        <FontAwesome6 name={iconName} color={COLORS.yellow} size={SIZES.small} />
    </View>
  )
}

export default Rates

const styles = StyleSheet.create({
    main:{
        marginTop:10,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5,
        backgroundColor:COLORS.white,
        padding:8,
        borderRadius:30,
    }
})