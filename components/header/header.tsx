import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { COLORS, SIZES } from '../../constants'
import { useRouter } from 'expo-router'

type Props = {}
const screenSizes={
    padding:10
}
const Header = (props: Props) => {
    const router =useRouter()
  return (
    <View style={styles.main} >
        <Pressable style={styles.leftIcons} onPress={()=>{router.back()}}>
            <Ionicons name="arrow-back" size={SIZES.large-5} color={COLORS.white} />
        </Pressable>
        <View style={styles.rightIcons}>
        <Ionicons name="share-social" size={SIZES.large-5} color={COLORS.white} />
        <Ionicons name="calendar" size={SIZES.large-5} color={COLORS.white} />
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    main:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:35,
        // backgroundColor: 'rgba(52, 52, 52, alpha)',
        backgroundColor: 'transparent'
    },
    rightIcons:{
        flexDirection:"row",
        justifyContent:"center",
        gap:25,
        paddingHorizontal:screenSizes.padding
    },
    leftIcons:{
        paddingLeft:screenSizes.padding,
        elevation:5,
        shadowColor:COLORS.dark,
        shadowOffset:{width:5,height:5},
        shadowOpacity:0.5
    }
})