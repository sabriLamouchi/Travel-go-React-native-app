import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { appSignOut } from '../../lib/store'
import { useRouter } from 'expo-router'

const Profile = () => {
  const router=useRouter();
  const handlePress=async()=>{
    await appSignOut().then(()=>{
      router.replace("/welcome");
      alert('Signed out 🚪');})
  }
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Pressable onPress={handlePress} >
        <Text>Sign out</Text>
      </Pressable>
    </View>
  )
}

export default Profile