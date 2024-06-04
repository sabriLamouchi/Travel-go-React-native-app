import { ActivityIndicator,Pressable,SafeAreaView, ScrollView, Text,  TouchableOpacity, View } from "react-native";
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
import { GetDistinationId, GetSearchHotels, useSearchedData } from "../../lib/store";
import { useMutation } from "@tanstack/react-query";
import { validateSearchDistinationSchema } from "../../hooks/validationSchema";
import { format, parseISO } from 'date-fns';
import { BlurView } from "expo-blur";
import { toast, ToastPosition, Toasts } from '@backpackapp-io/react-native-toast';
import { ToastErrorTheme, ToastSuccessTheme } from "../../constants/theme";
const ScreenDimensions=Dimensions.get('screen');


export default function HomeScreen({navigation}){
    const [isLoading,setIsLoading]=useState(false);
    const [pickDate,setPickDate]=useState(false);
    const[arrival,setArrival]=useState(false);
    const[departure,setDeparture]=useState(false);
    const [date,setDate]=useState("")
    const [arrivalDate,setArrivalDate]=useState<Date | null >(new Date(0))
    const [departureDate,setDepartureDate]=useState<Date | null>(new Date(0))
    const [adults,setAdults]=useState<string>("")
    const [isSearching,setIsSearching]=useState<boolean>(false);
    // const [data,setData]=useState(null)
    const{setData,setDestId,dest_id,data,destination,setDestination}=useSearchedData()
    //InputState//
    const [location,setLocation]=useState<string>("");
    const handlePickDate=()=>{
        setPickDate(!pickDate);
        console.log(format(arrivalDate,"yyyy-MM-dd"),format(departureDate,"yyyy-MM-dd"))
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

    //ditination Providers Click:
    const {mutateAsync:getDistinationIdMutaion}=useMutation({
        mutationFn:GetDistinationId,
        onError(error, variables, context) {
            alert("there is an error to get destination id !!: "+error.message)
        },
    })
    const {mutateAsync:getHotelsDataMutation}=useMutation({
        mutationFn:GetSearchHotels,
        onError(error, variables, context) {
            alert("there is an error in hotels api !!: "+error.message)
        },
    })

    const handleSearchDistination=async()=>{
        // Type inference in action
        const arrivalFinalDate=format(arrivalDate,"yyyy-MM-dd");
        const departureFinalDate=format(departureDate,"yyyy-MM-dd")
        const result=validateSearchDistinationSchema.safeParse({
            location:location,
            arrival_date:arrivalFinalDate,
            departure_date:departureFinalDate,
            adults:adults
        })
        console.log("sibon",adults)

        if(result?.success){
            try{
                setIsSearching(true);
                if(destination!=location){
                    await getDistinationIdMutaion(location).then(async (res:string)=>{
                        console.log("dstination_id",res);
                        if(res!=null){
                            setDestination(location)
                            setDestId(res);
                            await getHotelsDataMutation(
                                {dest_id:res,
                                arrival_date:arrivalFinalDate,
                                departure_date:departureFinalDate,
                                adults:adults}
                            ).then((res)=>{
                                console.log("hotels",res)
                                if(res!=null){
                                    setData(res)
                                    alert("hotels get with success!!");
                                }
                                else{
                                    alert("there are no hotels with this inputs ,please check your arrival and deaprture date!!")
                                    toast("there are no hotels with this inputs ,please check your arrival and deaprture date!!", {
                                        duration: 4000,
                                        position: ToastPosition.TOP,
                                        icon: '📣',
                                        styles: {
                                        view:ToastErrorTheme,
                                        text:{
                                            fontFamily:FONT.medium
                                        }
                                        },
                                    });
                                    toast("please check your arrival and deaprture date!!",{
                                        duration: 6000,
                                        position: ToastPosition.TOP,
                                        icon: '📣',
                                        styles: {
                                        view:ToastErrorTheme,
                                        text:{
                                            fontFamily:FONT.medium
                                        }
                                        },
                                    });
                                }
                            })
                        }
                        else{
                            toast("this destination is not available", {
                                duration: 4000,
                                position: ToastPosition.TOP,
                                icon: '📣',
                                styles: {
                                view:ToastErrorTheme,
                                text:{
                                    fontFamily:FONT.medium
                                }
                                },
                            });
                        }
                        
                    })
                }else{
                    //search hotels with same destination it stored .
                    console.log("searched from cache");
                    if(data==null || data?.length ==0){
                        await getHotelsDataMutation(
                            {dest_id,
                            arrival_date:arrivalFinalDate,
                            departure_date:departureFinalDate,
                            adults:adults}
                        ).then((res)=>{
                            console.log("hotels",res)
                            if(res==null || res?.length==0){
                                toast("there are no hotels with this inputs ,please check your arrival and deaprture date!!", {
                                    duration: 4000,
                                    position: ToastPosition.TOP,
                                    icon: '📣',
                                    styles: {
                                    view:ToastErrorTheme,
                                    text:{
                                        fontFamily:FONT.medium
                                    }
                                    },
                                });
                                toast("please check your arrival and deaprture date!!",{
                                    duration: 6000,
                                    position: ToastPosition.TOP,
                                    icon: '📣',
                                    styles: {
                                    view:ToastErrorTheme,
                                    text:{
                                        fontFamily:FONT.medium
                                    }
                                    },
                                });
                            }
                            else{
                                setData(res)
                                alert("hotels get with success!!");
                            }
                        })
                    }else{
                        toast("search get with success!!",{
                            duration: 4000,
                            position: ToastPosition.TOP,
                            icon: '📣',
                            styles: {
                            view:ToastSuccessTheme,
                            text:{
                                fontFamily:FONT.medium
                            }
                            },
                        });
                    }
                    
                }
               
            }catch(error){
                console.log("error",error)
                throw error
                
            }
            finally{
                setIsSearching(false);
            }
        }
        else{
            result.error.issues.forEach((err,index)=>{
                toast(err.message, {
                    duration: 2000+(index*1000),
                    position: ToastPosition.TOP,
                    icon: "📣",
                    styles: {
                    view:ToastErrorTheme,
                    text:{
                        fontFamily:FONT.medium
                    }
                    },
                });
            })
            

        }
        if (dest_id==null || data==null || data?.length==0){
            return false;
        }
        return true;
        
    }
    return( 
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.lightWhite}}>
        <Toasts/>
            <View style={styles.searchContainer}>
                {
                    isSearching &&
                    <BlurView intensity={10} tint="light" style={styles.loadingScreen} >
                    <ActivityIndicator size={"large"} color={COLORS.secondary} />
                </BlurView> 
                }
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
                                                is24Hour={false}
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
                            
                            <Textinput icon={"person"} placeholder="Adults" setText={(text:string)=>setAdults(text)} value={adults} />
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
                                }
                                disabled={isSearching} 
                                onPress={async ()=>{
                                    await handleSearchDistination().then((res)=>{
                                        console.log("res",res);
                                        if(res){
                                            router.push(`/(search)/${destination}`);
                                        }
                                    })
                                    
                                }}>
                                <Text style={{
                                    color:COLORS.white,
                                    fontSize:SIZES.xSmall,
                                    fontFamily:FONT.regular,
                                    textAlign:"center"
                                    }}>Search</Text>
                            </TouchableOpacity>
                        </ScrollView>
                 </View>
            </View>
            <View style={styles.nearbyPlacesContainer}>
                    {isLoading?
                        <ActivityIndicator color={COLORS.primary}  size="large" style={{position:"relative",top:"20%"}} />
                    : 
                        <NearbyPlaces />
                    }
                    
                 </View>
        </SafeAreaView>

    );
}
