
import { Stack ,SplashScreen, Slot} from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {useFonts} from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
SplashScreen.preventAutoHideAsync();


const Layout=()=>{
        const [fontsLoaded]=useFonts({
                RBold:require('../assets/fonts/Roboto-Bold.ttf'),
                RMedium:require('../assets/fonts/Roboto-Medium.ttf'),
                RRegular:require('../assets/fonts/Roboto-Regular.ttf'),
                RLight:require('../assets/fonts/Roboto-Light.ttf'),
        });
        
            const onLayoutRootview=useCallback(async()=>{
            if(fontsLoaded){
                await SplashScreen.hideAsync();
            }
        },[fontsLoaded]);
        
        if(!fontsLoaded) return null;

        return (
                <RootSiblingParent>
                    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootview}>
                        <Stack  screenOptions={{headerShown:false}}/>
                    </GestureHandlerRootView>
                </RootSiblingParent>
            
         
        );
};
export default Layout;