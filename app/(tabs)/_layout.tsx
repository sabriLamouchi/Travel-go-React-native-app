import Ionicons from 'react-native-vector-icons/Ionicons'
import {Redirect, Stack, Tabs, useRouter, useSegments} from 'expo-router'
//screens
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, firestore_db } from '../../firebaseConfig';
import HeaderBtn from '../../components/header/HeaderBtn';
import { COLORS, FONT, images, SIZES } from '../../constants';
import { useTabBarScroll } from '../../hooks/useTabBarScroll';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Create a client
export const queryClient = new QueryClient()
const TabLayout =() => {
    const router =useRouter();
    const segments=useSegments();
    const [data,setData]=useState(null);
    const {status}=useTabBarScroll();
    async function getUserData(){
        const docRef=doc(firestore_db,'users',auth.currentUser.uid);
        try {
            const docSnapShot= await getDoc(docRef);
            if (docSnapShot.exists()) {
                console.log("Document data:", docSnapShot.data());
                setData(docSnapShot.data())
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
              return(docSnapShot.data())
        } catch (error) {
            console.log('error to get data',error.message)
        }
        
    }
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <QueryClientProvider client={queryClient} >
                    <Tabs
                        initialRouteName={"home"}
                        screenOptions={({route})=>({
                            headerStyle:{backgroundColor:COLORS.lightWhite,},
                            headerShown:true,                                                                                                                           
                            headerShadowVisible:false,
                            headerTitle:()=>(
                                    <Text style={{marginLeft:20,fontFamily:FONT.bold,textAlign:"center"}}>{`hello ${data?.firstName} `}</Text>
                            ),
                            headerLeft:()=>(
                                <HeaderBtn icon={images.person} type="account" />
                            ),
                            headerRight:()=>(
                                <HeaderBtn icon='notifications' type="notification" color={""} size={null} key={2} />
                            ),
                            tabBarStyle:{
                                height:70,
                                borderRadius:30,
                                backgroundColor:COLORS.secondary,
                                position:"absolute",
                                bottom:0,
                                animate:true
                                
                            },
                            tabBarIcon:({color,focused,size})=>{
                                let iconName=null;
                                let colorIcon= focused ? COLORS.green : COLORS.white
                                let style=focused ? {backgroundColor:COLORS.white,padding:15,borderRadius:30,overflow:"hidden"}:{}
                                size=focused ? 30: size
                                if(route.name=="home"){
                                    iconName="home"
                                }else if(route.name=="profile"){iconName="person"}
                                    return <Ionicons name={iconName} size={size} color={colorIcon}  style={style} />
                                
                            },
                            tabBarShowLabel:false,
                            tabBarHideOnKeyboard:true,
                            
                            
                        })}
                        
                        
                    >
                            <Tabs.Screen  name="home"  />
                            <Tabs.Screen options={{headerShown:false}} name="profile"  />
                    </Tabs>
        </QueryClientProvider>
    );
};

const styles=StyleSheet.create({
    tabBar:{
        position:"relative",
        bottom:25,
        left:20,
        right:20,
        backgroundColor:"red"

    }
})

export default TabLayout;