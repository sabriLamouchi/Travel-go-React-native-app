import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useRootNavigationState, useRouter, useSegments } from 'expo-router'
import { AuthStore } from '../lib/store';
import { COLORS } from '../constants';

export default function Index() {
    const segments=useSegments();
    const router=useRouter();

    const navigationState=useRootNavigationState();
    const {initialized,isLoggedIn}=AuthStore.useState();
    console.log(initialized)
    useEffect(()=>{
        if(!navigationState?.key || !initialized)return;

        const inAuthGroup=segments[0]==="(auth)";

        if(
            //if user not signedIn and th initial segment is not anything
            //segment is not anything in the auth group. 
            !isLoggedIn && 
            !inAuthGroup
        ){
            router.replace("/welcome");
            console.log("redirected to welcome page")

        }else if(isLoggedIn){
            //go to tabs route
            router.replace("/(tabs)/home")
            // router.replace("/(sreach)/(hotelDetail)/123")
            console.log("redirected to  tabs page")
        }
    },[segments,navigationState?.key,initialized]
    )
  return (
    <View>
      {!navigationState?.key ? <Text>LOADING...</Text>:<>
      <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
        <ActivityIndicator color={COLORS.green} size="large" />
      </View>
      </>}
    </View>
  )
}