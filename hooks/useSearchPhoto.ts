import { useState,useEffect } from "react";
import useSwr from 'swr'
import  axios  from "axios";

const clientId=process.env.EXPO_PUBLIC_UNSPLASH_CLIENT_ID;
export interface queryProp{
    query:string
}

const useSearchPhoto=(params:queryProp)=>{
    const [isLoading,setIsloading]=useState(false);
    const [error,setError]=useState(null);
    const [data,setData]=useState(null);


      const fetchData=async()=> {
        try {
            setIsloading(true)
            const response=await axios.get(
                `https://api.unsplash.com/search/photos?query=${params.query}&client_id=${clientId}&per_page=4`
            );
            if(response)
              setData(response.data)
            setIsloading(false)
        } catch (error) {
            alert('there is an error')
            console.log(error)
            setError(error)
        }finally{
            setIsloading(false);
        }
      }
      useEffect(()=>{
        fetchData();
      },[])

      const refetch=()=>{
        fetchData();
      }
      return{data,refetch,isLoading,error};
}
export default useSearchPhoto;