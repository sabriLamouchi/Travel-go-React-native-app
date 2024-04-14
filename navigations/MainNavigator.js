import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {NavigationContainer} from '@react-navigation/native'
import TabNavigator from "./TabNavigator";
import Search from "../screens/search/Search";
import WelcomeScreen from "../screens/welcome";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import Login from "../screens/login";
import Register from "../screens/register";

const Stack=createNativeStackNavigator();


function MainNavigator() {
    const [initializing,setInitilizing]=useState(true);
    const [user,setUser]=useState();
  
    const onAuthStateChanged=(user)=>{
      setUser(user);
      if(initializing) setInitilizing(false);
    }
    async function handleAuth(){
        const subscriber= auth.onAuthStateChanged(onAuthStateChanged);
    }
    useEffect(()=>{
        handleAuth();
      return ()=>handleAuth();
    },[user])
    if (initializing) return null;

    if (!user){
        return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name='welcome' component={WelcomeScreen} />
            <Stack.Screen options={{headerShown:false}} name='login' component={Login} />
            <Stack.Screen options={{headerShown:false}} name='register' component={Register} />
        </Stack.Navigator>)
    }
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="home" component={TabNavigator} />
            <Stack.Screen options={{headerShown:false}} name="search" component={Search} />
        </Stack.Navigator>
    );


};

export default ()=>(
    <NavigationContainer independent={true}>
            <MainNavigator/>
    </NavigationContainer>
);