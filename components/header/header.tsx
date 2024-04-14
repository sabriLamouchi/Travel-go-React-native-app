import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { SIZES } from '../../constants'
import { useRouter } from 'expo-router'

type Props = {}
const screenSizes={
    padding:10
}
const Header = (props: Props) => {
    const router =useRouter()
  return (
    <SafeAreaView style={styles.main} >
        <Pressable style={styles.leftIcons} onPress={()=>{router.back()}}>
            <Ionicons name="arrow-back" size={SIZES.medium} />
        </Pressable>
        <View style={styles.rightIcons}>
        <Ionicons name="share-social" size={SIZES.medium} />
        <Ionicons name="calendar" size={SIZES.medium} />
        </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    main:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        
    },
    rightIcons:{
        flexDirection:"row",
        justifyContent:"center",
        gap:20,
        paddingHorizontal:screenSizes.padding
    },
    leftIcons:{
        paddingLeft:screenSizes.padding
    }
})