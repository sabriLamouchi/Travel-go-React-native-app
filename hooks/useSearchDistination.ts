import { useState,useEffect } from "react";
import useSwr from 'swr'
import  axios  from "axios";
import { create } from "zustand";
const RapidAPIKey=process.env.EXPO_PUBLIC_RAPID_API_KEY;
export interface queryProp{
    query:string
}
interface DestinationProps{
  dest_id:number | null
  data:any[]|null
  setData:(data:any[])=>void
  setDestId:(dest: number)=>void
}

export  const useTabBarScroll=create<DestinationProps>((set)=>({
  dest_id:null,
  data:null,
  setDestId:(dest)=>set(()=>({dest_id:dest})),
  setData:(data)=>set(()=>({data:data}))
})
)

const useSearchDistination=async(params:queryProp)=>{
    // const [isLoading,setIsloading]=useState(false);
    // const [error,setError]=useState(null);
    // const [data,setData]=useState([]);
    // const options = {
    //     method: 'GET',
    //     url:'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
    //     headers: {
    //       'X-RapidAPI-Key':RapidAPIKey,
    //       'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
    //     },
    //     params:{...params}
    //   };

    //   const fetchData=async()=> {
    //     try {
    //         const response=await axios.request(options);
    //         if(response.data)
    //           return response.data
    //         else {
    //           alert("there are no distinations with this name of field !! ")
    //           return null;
    //         }
    //     } catch (error) {
    //         alert('there is an error')
    //         console.log(error)
    //     }finally{
    //     }
    //   }
    //   const res=await fetchData();
    // //   useEffect(()=>{
    // //     fetchData();
    // //   },[])

    //   const refetch=()=>{
    //     fetchData();
    //   }
    //   return{res,refetch};

}
export default useSearchDistination;


