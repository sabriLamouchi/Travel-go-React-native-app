import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import HomeScreen from "../screens/Home"
import Profile from '../screens/setings/Profile.js';
import { COLORS, FONT } from '../constants/theme.js';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import HeaderBtn from '../components/header/HeaderBtn';
import { auth, firestore_db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
//Screen names
const HomeName="home";
const profileName='profile'

const Tab= createBottomTabNavigator();


const TabNavigator =({navigation}) => {
    const [data,setData]=useState({});
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
        // return ()=>userData
    },[])
    return (
        
                    <Tab.Navigator

                        initialRouteName={HomeName}
                        screenOptions={({route})=>({
                            tabBarIcon:({focused,color,size})=>{
                                let iconName;

                                if(route.name===HomeName)
                                    iconName = focused ? 'home' : 'home-outline'
                                else if(route.name===profileName)
                                    iconName= focused ?'person' : 'person-outline'

                                return <Ionicons name={iconName} size={size} color={color} />
                            },
                            headerStyle:{backgroundColor:COLORS.lightWhite},
                            headerShadowVisible:false,
                            headerTitle:()=>(
                                    <Text style={{marginLeft:20,fontFamily:FONT.bold,textAlign:"center"}}>{`hello ${data?.firstName} `}</Text>
                            ),
                            headerLeft:()=>(
                                <HeaderBtn icon={images.person} type="account" />
                            ),
                            headerRight:()=>(
                                <HeaderBtn icon={'notifications'} type="notification"  />
                            ),
                        })}
                        
                        style={styles.tabBar}
                        tabStyle={styles.tabBar}
                        tabBarOptions={
                            {
                                activeTintColor: COLORS.green,
                                headerShadowVisible:false,
                                tabBarLabel:false,
                                activeColor:COLORS.green,
                                inactiveColor:COLORS.secondary,
                                
                            }
                        }
   
                        
                    >
                            <Tab.Screen screenOptions={{headerShown:false}} name={HomeName} component={HomeScreen} />
                            <Tab.Screen screenOptions={{headerShown:false}} name={profileName} component={Profile} />
                    </Tab.Navigator>
                   
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

export default TabNavigator;