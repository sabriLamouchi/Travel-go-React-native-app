import { registerInDevtools, Store } from "pullstate";

import {signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,updateProfile,onAuthStateChanged}from 'firebase/auth'
import {app,auth, firestore_db} from "../firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { create } from "zustand";
import axios from "axios";

interface authStoreProps{
    isLoggedIn:boolean;
    initialized:boolean,
    user:{email:string,firstname:string,lastname:string}| any;
}

export const AuthStore=new Store<authStoreProps>({
    isLoggedIn:false,
    initialized:false,
    user:null
})

const unsub=onAuthStateChanged(auth,(user)=>{
    AuthStore.update((store)=>{
        store.user=user; 
        store.initialized=true;
        store.isLoggedIn=user ? true:false;
    })
})

export const appSignIn=async(email:string,password:string)=>{
    try {
        let user=null;
        await signInWithEmailAndPassword(auth,email,password).then(async ()=>{
            console.log("sign in:",auth.currentUser)
                const docSnapsot=await getDoc(doc(firestore_db,'users',auth.currentUser.uid));
                user=docSnapsot.data();
            })
            .then(()=>{
                AuthStore.update((store)=>{
                    store.user=user;
                    store.isLoggedIn=user ? true:false;
                });
            })
        return user && {status:true};
    } catch (error) {
        return{status:false, error}
    }
}


export const appSignOut=async ()=>{
    try {
        await signOut(auth);
        AuthStore.update((store)=>{
            store.user=null;
            store.isLoggedIn=false;

        })
        return {user : null};
    } catch (error) {
        return {error:error}
    }
}

export const appSignUp=async(firstName:string,lastName:string,email:string,password:string)=>{
try {
    let user=null;
    const res=await createUserWithEmailAndPassword(auth,email,password).then(async()=>{
        await setDoc(doc(firestore_db,'users',auth.currentUser.uid),{
            firstName,
            lastName,
            email,
        })}).then(async ()=>{
            const docSnapsot=await getDoc(doc(firestore_db,'users',auth.currentUser.uid));
            user=docSnapsot.data();
        }).then(()=>{
            AuthStore.update((store)=>{
                store.user=user;
                store.isLoggedIn=true;
        
            });
        })

    return user && {user:auth.currentUser};
} catch (error) {
    return {error:error}
}
};

registerInDevtools({AuthStore});


//search distination :
interface DestinationProps{
    destination:string | null,
    dest_id:string | null
    data:any[]|null
    setData?:(data:any[])=>void
    setDestId?:(dest: string)=>void
    setDestination?:(destination:string)=>void
  }

  export  const useSearchedData=create<DestinationProps>((set)=>({
    destination:null,
    dest_id:null,
    data:null,
    setDestId:(dest)=>set(()=>({dest_id:dest})),
    setData:(data)=>set(()=>({data:data})),
    setDestination:(dest)=>set(()=>({destination:dest}))
  })
  )

  export const GetDistinationId=async(location:string | null ):Promise<string> |null=>{
    const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination',
        params: {query:location},
        headers: {
          'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
      };
    
    try {
        const response = await axios.request(options);
        if (response.data.status) {
            return response?.data.data[1].dest_id
        }
        return null
    } catch (error) {
        console.error("destination error:",error);
        throw error
    }
  }

  interface SeachHotelsProps{
    dest_id:string,
    arrival_date:string,
    departure_date:string,
    adults?:string | null
  }

  export const GetSearchHotels=async({dest_id,arrival_date,departure_date,adults}:SeachHotelsProps):Promise<any[]>|null=>{
    const options = {
        method: 'GET',
        url: 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
          dest_id: dest_id,
          search_type: 'CITY',
          arrival_date: arrival_date,
          departure_date: departure_date,
          adults: adults,
          page_number: '1',
          languagecode: 'en-us',
        },
        headers: {
          'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        if (response.data?.status) {
            return response?.data.data.hotels
        }
        return null
    } catch (error) {
        console.error("hotelsSearch error",error);
        throw error
    }
  }

  