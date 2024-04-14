import React, { useEffect, useState } from 'react';
import { View,Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Pressable, ScrollView, Dimensions } from 'react-native';
import { auth, firestore_db } from '../../firebaseConfig';
import { COLORS, FONT, SIZES } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { validationSchema } from '../../hooks/validationSchema';
import { signInWithEmailAndPassword } from 'firebase/auth';
const screenDimension=Dimensions.get('screen');
const Login = ({navigation}) => { 
    const [showPassword,setShowPassword]=useState(true);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState(""); 
    const handleSubmit=()=>{
        if(validationSchema()){
            signInWithEmailAndPassword(auth,email,password)
            .then((res)=>
            
               {
                console.log('log in')
                navigation.navigate('home')
               }
            )
            .catch((error)=>{
                
                alert("this email doesn't exist!!")
            })
        }
    
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.primary,gap:50}} >
            <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",padding:10,marginTop:20}}>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:"center",alignItems:"center"}}
                        onPress={()=>navigation.goBack()} >
                        <Ionicons name='arrow-back' color={COLORS.lightWhite} size={SIZES.large} />
                    </TouchableOpacity>
                <View style={{}} >
                    <Text style={{fontFamily:FONT.medium,color:COLORS.secondary,textAlign:"center"}}>
                        Welcome to 
                        <Text style={{fontFamily:FONT.bold,fontSize:SIZES.medium,color:COLORS.green,textAlign:"center"}} >
                            Travel GO
                        </Text>
                    </Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={{flex:1,gap:screenDimension.height/20}}>
                <View style={{width:"100%", justifyContent:"center",alignItems:"center"}} >
                    <Text style={{fontFamily:FONT.bold,fontSize:SIZES.xLarge,color:COLORS.secondary}} >Login</Text>
                </View>
                <View style={{justifyContent:"center",alignItems:"center",width:"100%",height:"auto" ,gap:45 }} >

                    <View style={{width:"100%",alignItems:"center"}}>
                        <TextInput placeholder='Email' blurOnSubmit={true} name='email' onChangeText={(text)=>setEmail(text)} style={styles.textInput('email',"")} />
                    </View>

                    <View style={{alignItems:"center",width:"100%"}}>
                        <View style={{width:"100%",flexDirection:"row",justifyContent:"center"}}>
                            <TextInput placeholder='password' blurOnSubmit={true} name="passwod"secureTextEntry={showPassword} onChangeText={(text)=>setPassword(text)} style={{...styles.textInput('password',""),borderBottomLeftRadius:10,borderTopLeftRadius:10}} />

                            <Pressable onPress={()=>setShowPassword(!showPassword)} style={{alignSelf:"center",backgroundColor:COLORS.lightWhite,height:"100%",padding:5,flexDirection:"row",borderTopEndRadius:10,borderBottomRightRadius:10}} >
                                <Ionicons name={showPassword ?"eye-off": "eye"} color={COLORS.dark} size={SIZES.medium} style={{alignSelf:"center"}} />
                            </Pressable>
                        </View>
                    </View>



                    <TouchableOpacity onPress={handleSubmit}  style={styles.submitButton} >
                        <Text style={{color:COLORS.white,fontFamily:FONT.medium,fontSize:SIZES.xSmall}}>Sign in</Text>
                        <View style={{marginTop:5}}>
                            <Ionicons name='arrow-forward' size={SIZES.medium} color={COLORS.white} />
                        </View>
                    </TouchableOpacity>


                </View>
                <View style={{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:5}}>
                    <View style={{height:3,width:"auto",backgroundColor:COLORS.secondary,width:"15%"}} />
                    <Text style={{fontFamily:FONT.regular,fontSize:SIZES.xSmall,color:COLORS.dark}} >You don't have an account</Text>
                    <View style={{height:3,width:"auto",backgroundColor:COLORS.secondary,width:"15%"}} />
                </View>
                <View style={{alignItems:"center",width:"100%"}} >
                    <TouchableOpacity style={{backgroundColor:COLORS.lightSecondary,width:"80%",padding:10,borderRadius:50}} onPress={()=>navigation.navigate("register")} >
                        <Text style={{textAlign:"center",color:COLORS.white,fontFamily:FONT.regular}} >Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;

const styles=StyleSheet.create({
    textInput:(type,error)=>({
        width:type!="password"? "80%": "72%",
        height:50,
        backgroundColor:COLORS.lightWhite,
        fontSize:SIZES.small,
        fontFamily:FONT.medium,
        color:COLORS.dark,
        borderRadius:type!="password"? 10 : 0,
        padding:5,
        borderWidth:error ? 3: 0,
        borderColor:error ? COLORS.red: "",
    }),
    submitButton:{
        width:"40%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:5,
        backgroundColor:COLORS.green,
        padding:15,
        borderRadius:50,
        position:"relative"

    },
    errorText:{
        color:COLORS.red,
        fontSize:SIZES.xSmall,
        position:"relative",
        left:'-10%',
    }
})