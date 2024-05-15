import { registerInDevtools, Store } from "pullstate";

import {signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,updateProfile,onAuthStateChanged}from 'firebase/auth'
import {app,auth, firestore_db} from "../firebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore";

interface authStoreProps{
    isLoggedIn:boolean;
    initialized:boolean,
    user:{email:string,firstname:string,lastname:string}| any;
}
// interface userProps{
//     email:string;
//     firstname:string;
//     lastname:string;
// }

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
                const docSnapsot=await getDoc(doc(firestore_db,'users',auth.currentUser.uid));
                user=docSnapsot.data();
            })
            .catch((error)=>{
                alert("user not available with this informations");
            })
        AuthStore.update((store)=>{
            store.user=user;
            store.isLoggedIn=user ? true:false;

        });
        return user ?? {user:auth.currentUser};
    } catch (error) {
        return {error:error}
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
        })
    AuthStore.update((store)=>{
        store.user=user;
        store.isLoggedIn=true;

    });
    return user ?? {user:auth.currentUser};
} catch (error) {
    return {error:error}
}
};

registerInDevtools({AuthStore});