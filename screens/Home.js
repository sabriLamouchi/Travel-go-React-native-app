import { ActivityIndicator,Pressable,SafeAreaView, ScrollView, Text,  TouchableOpacity, View } from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {COLORS,icons,images,FONT, SIZES} from '../constants'
import { styles } from "./Home.style";
import Textinput from "../components/TextInput/Textinput";
import NearbyPlaces from "../components/nearby/NearbyPlaces";
import { useState } from "react";
import ButtonDatePicker from "../components/ButtonDatePicker/ButtonDatePicker";;
import DatePicker from 'react-native-date-picker'
import { useFormatDate } from "../hooks/useFormatdate";
import { getMonth } from "../hooks/getMonth";
import HeaderBtn from "../components/header/HeaderBtn";
import {Stack} from 'expo-router'
import { auth } from "../firebaseConfig";
import { Dimensions } from "react-native";
const ScreenDimensions=Dimensions.get('screen');
export default function HomeScreen({navigation}){
    const [isLoading,setIsLoading]=useState(false);
    const [pickDate,setPickDate]=useState(false);
    const[arrival,setArrival]=useState(false);
    const[departure,setDeparture]=useState(false);
    const [date,setDate]=useState("")
    const [arrivalDate,setArrivalDate]=useState(new Date(0))
    const [departureDate,setDepartureDate]=useState(new Date(0))
    const {data:Adate}=useFormatDate(arrivalDate);
    const {data:Ddate}=useFormatDate(departureDate);

    const handlePickDate=()=>{
        setPickDate(!pickDate);
        if(Adate && Ddate) setDate(changeDate(Adate,Ddate));
        console.log(Adate,Ddate);
    };
    const handleArrivaleDateClick=()=>setArrival(!arrival)
    const handleDepartureDateClick=()=>setDeparture(!departure)
    const changeDate=(Adate,Ddate)=>{
        if(!Adate || !Ddate) return "pick a date";
        ArrDate=getMonth(Number(Adate.substr(5,2)))+" "+Adate.substr(8,2);
        DepDate=getMonth(Number(Ddate.substr(5,2)))+" "+Ddate.substr(8,2);
        return  ArrDate+" - "+DepDate;
    }

  
    return( 
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>

            <View style={styles.searchContainer}>
                <View style={{width:"100%",height:ScreenDimensions.height/2.6}}>
                    <ScrollView  contentContainerStyle={{rowGap:15,height:"auto",paddingTop:"10%"}}  showsVerticalScrollIndicator={false}  >
                            <Textinput icon={"search"} placeholder="location"  />
                            <ButtonDatePicker title={!date?"pick a date":date} handleClick={handlePickDate} icon={"calendar-clear-outline"} iconIndecator={"chevron-down"} activePickDate={pickDate} />
                            {
                                pickDate ? (
                                    <View style={{flexDirection:"column",marginLeft:30,gap:5}}>
                                        <View style={{width:250}}>
                                            <ButtonDatePicker title={!Adate?"Arrival date":Adate} handleClick={handleArrivaleDateClick} icon={"calendar"} />
                                            {
                                                arrival ?
                                                (
                                                <DatePicker
                                                    modal
                                                    mode="date"
                                                    open={arrival}
                                                    date={arrivalDate}
                                                    onConfirm={(arrivalDate)=>{
                                                        setArrival(false)
                                                        setDate(changeDate(Adate,Ddate))
                                                        setArrivalDate(arrivalDate)
                                                    }}
                                                    onCancel={()=>setArrival(false)}
                                                />
                                                ): null
                                            }
                                        </View>
                                        <View style={{width:250}}>
                                            <ButtonDatePicker title={!Ddate ?"Departure date":Ddate} handleClick={handleDepartureDateClick} icon={"calendar"} />
                                            {
                                                departure ?
                                                (
                                                <DatePicker
                                                    modal
                                                    mode="date"
                                                    title="Departure Date"
                                                    open={departure}
                                                    date={departureDate}
                                                    onConfirm={(departureDate)=>{
                                                        setDeparture(false)
                                                        changeDate(Adate,Ddate)
                                                        setDepartureDate(departureDate)
                                                    }}
                                                    onCancel={()=>setDeparture(false)}
                                                />
                                                ): null
                                            }
                                        </View>
                                    </View>
                                )
                                :null
                                    
                            }
                            
                            <Textinput icon={"person"} placeholder="Adults"/>
                            <TouchableOpacity style={ 
                                {
                                    backgroundColor:COLORS.green,
                                    width:"30%",
                                    marginLeft:"auto",
                                    marginRight:"auto",
                                    padding:10,
                                    justifyContent:"center",
                                    borderRadius:30
                                }
                                } onPress={()=>{navigation.navigate('search')}}>
                                <Text style={{
                                    color:COLORS.white,
                                    fontSize:SIZES.xSmall,
                                    fontFamily:FONT.regular,
                                    textAlign:"center"
                                    }}>Search</Text>
                            </TouchableOpacity>
                        </ScrollView>
                 </View>
                 <View style={styles.nearbyPlacesContainer}>
                    {isLoading?
                        <ActivityIndicator  size="large" style={{color:COLORS.primary,position:"relative",top:"20%"}} />
                    : 
                        <NearbyPlaces />
                    }
                    
                 </View>
               

            </View>
        </SafeAreaView>
    );
}
