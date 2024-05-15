import { ActivityIndicator,Pressable,SafeAreaView, ScrollView, Text,  TouchableOpacity, View } from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { useEffect, useMemo, useState } from "react";
import {router, Stack} from 'expo-router'
import { Dimensions } from "react-native";
import { useFormatDate } from "../../hooks/useFormatdate";
import { getMonth } from "../../hooks/getMonth";
import { COLORS, FONT, SIZES } from "../../constants";
import Textinput from "../../components/TextInput/Textinput";
import ButtonDatePicker from "../../components/ButtonDatePicker/ButtonDatePicker";
import NearbyPlaces from "../../components/nearby/NearbyPlaces";
import { styles } from "../../screens/Home.style";
import DateTimePicker from "@react-native-community/datetimepicker"
import useSearchDistination from "../../hooks/useSearchDistination";
const ScreenDimensions=Dimensions.get('screen');


export default function HomeScreen({navigation}){
    const [isLoading,setIsLoading]=useState(false);
    const [pickDate,setPickDate]=useState(false);
    const[arrival,setArrival]=useState(false);
    const[departure,setDeparture]=useState(false);
    const [date,setDate]=useState("")
    const [arrivalDate,setArrivalDate]=useState<Date | null>(new Date(0))
    const [departureDate,setDepartureDate]=useState<Date | null>(new Date(0))
    const [data,setData]=useState(null)
    //InputState//
    const [location,setLocation]=useState("");
    useMemo(async ()=>
        {
            if(location.length!=0){
                
                try {
                    const {res}=await useSearchDistination({query:location});
                    console.log([...res.data])
                    console.log(location)
                    return res
                } catch (error) {
                    console.log(error)
                }
                
            }
            else {
                alert("please enter the location!!");
                return null
            }
        }
    ,[location])


    const handlePickDate=()=>{
        setPickDate(!pickDate);
        console.log(arrivalDate,departureDate)
        if(arrivalDate.getFullYear()!=1970 && departureDate.getFullYear()!=1970) 
            setDate(changeDate(useFormatDate(arrivalDate),useFormatDate(departureDate)));
    };
    
    const handleArrivaleDateClick=()=>setArrival(!arrival)

    const handleDepartureDateClick=()=>setDeparture(!departure)

    const changeDate=(Adate:string,Ddate:string )=>{
        if(!Adate || !Ddate) return "pick a date";
        let ArrDate=getMonth(Number(Adate.substr(5,2)))+" "+Adate.substr(8,2);
        let DepDate=getMonth(Number(Ddate.substr(5,2)))+" "+Ddate.substr(8,2);
        return  ArrDate+" - "+DepDate;
    }

  
    return( 
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>

            <View style={styles.searchContainer}>
                <View style={{width:"100%",height:ScreenDimensions.height/2.6}}>
                    <ScrollView  contentContainerStyle={{rowGap:15,height:"auto",paddingTop:"10%"}}  showsVerticalScrollIndicator={false}  >

                            <Textinput icon={"search"} placeholder="location"  type="location" setText={(text:string)=>setLocation(text)} value={location} />

                            <ButtonDatePicker title={!date?"pick a date":date} handleClick={handlePickDate} icon={"calendar-clear-outline"} iconIndecator={"chevron-down"} activePickDate={pickDate} />
                            {
                                pickDate ? (
                                    <View style={{flexDirection:"column",marginLeft:30,gap:5}}>
                                        <View style={{width:250}}>
                                            <ButtonDatePicker title={!useFormatDate(arrivalDate)?"Arrival date":useFormatDate(arrivalDate)} handleClick={handleArrivaleDateClick} icon={"calendar"}  />
                                            {
                                                arrival &&
                                                (
                                                <DateTimePicker
                                                testID="dateTimePicker"
                                                value={arrivalDate}
                                                mode={"date"}
                                                is24Hour={false}
                                                onChange={(event,arDate)=>{
                                                    setArrival(false)
                                                    setArrivalDate(arDate)
                                                    }}
                                              />
                                                )
                                            }
                                        </View>
                                        <View style={{width:250}}>
                                            <ButtonDatePicker title={!useFormatDate(departureDate) ?"Departure date":useFormatDate(departureDate)} handleClick={handleDepartureDateClick} icon="calendar" />
                                            {
                                                departure &&
                                                (
                                                <DateTimePicker
                                                testID="dateTimePicker"
                                                value={departureDate}
                                                mode={"date"}
                                                is24Hour={true}
                                                onChange={(event,departureDate)=>{
                                                    setDeparture(false)
                                                    setDepartureDate(departureDate)
                                                    }}
                                                    />
                                                )
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
                                } onPress={()=>{ if(location){
                                    router.push(`/(search)/${location}`)
                                }}}>
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
                        <ActivityIndicator color={COLORS.primary}  size="large" style={{position:"relative",top:"20%"}} />
                    : 
                        <NearbyPlaces />
                    }
                    
                 </View>
               

            </View>
        </SafeAreaView>
    );
}
