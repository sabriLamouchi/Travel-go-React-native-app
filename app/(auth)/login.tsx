import React, { useEffect, useState } from 'react';
import { View,Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Pressable, ScrollView, Dimensions, ViewStyle ,KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { validationSchema } from '../../hooks/validationSchema';
import { useRouter } from 'expo-router';
import { appSignIn } from '../../lib/store';
import {useFormik} from 'formik'
import {toast, ToastPosition, Toasts } from '@backpackapp-io/react-native-toast';
import { ToastErrorTheme } from '../../constants/theme';
const screenDimension=Dimensions.get('screen');
const Login = () => { 
    const router=useRouter();
    const [showPassword,setShowPassword]=useState(true);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState(""); 
    const [isSubmit,setIsSubmit]=useState(false);

    const formik = useFormik({
        initialValues:{email:"",password:""},
        validationSchema: validationSchema(), // validate the form data
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                setIsSubmit(true);
                const res=await appSignIn(formValue.email,formValue.password);
                if(res?.status){
                    router.replace("/(tabs)/home")
                }
                else{
                    
                    console.log("error", res.error.message)
                    toast(res.error.message.includes("(auth/invalid-credential)")
                    ? "Email or Password is incirrect" : res.error.message , {
                        duration: 3000,
                        position: ToastPosition.TOP,
                        icon: '📣',
                        styles: {
                        view:{
                            ...ToastErrorTheme,
                            flexDirection:"row",
                            justifyContent:"center",
                        },
                        text:{
                            fontFamily:FONT.medium,
                            color:COLORS.white
                        },
                        },

                    });
                }
                
            } catch (error) {
                console.log("Login-error: ",error);
            }
            finally{
                setIsSubmit(false);
            }
        },
      })

    return (
        <>
        <Toasts overrideDarkMode={true} extraInsets={
            {
                bottom:100
            }
        } />
        <KeyboardAvoidingView style={{flex:1,backgroundColor:COLORS.primary,gap:50,zIndex:-1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            
            <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",padding:10,marginTop:20}}>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:"center",alignItems:"center"}}
                        onPress={()=>router.back()} >
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
                    <View style={{width:"80%"}}>
                        <TextInput
                            placeholder='Email'  blurOnSubmit={true} onBlur={formik.handleBlur('email')} onChangeText={(text)=>formik.setFieldValue('email',text)} style={{...styles.textInput('email',formik.errors.email,formik.touched.email),width:"100%"}} />
                        {formik.errors.email && formik.touched.email ? <Text style={{color:"red",position:"relative",left:10,fontSize:SIZES.xSmall,width:"80%"}}>{formik.errors.email}</Text>:null}
                    </View>

                     <View style={{width:"100%"}}>
                        <KeyboardAvoidingView style={{flexDirection:"row",justifyContent:"center"}}>
                            <TextInput 
                                placeholder='password' blurOnSubmit={true} onBlur={formik.handleBlur('password')} secureTextEntry={showPassword} onChangeText={(text)=>formik.setFieldValue('password',text)}  nativeID='password' style={{...styles.textInput('password',formik.errors.password,formik.touched.password),borderBottomLeftRadius:10,borderTopLeftRadius:10}} />

                            <Pressable 
                                onPress={()=>setShowPassword(!showPassword)} style={{alignSelf:"center",backgroundColor:COLORS.lightWhite,height:"100%",padding:5,flexDirection:"row",borderTopEndRadius:10,borderBottomRightRadius:10}} >
                                <Ionicons name={showPassword ?"eye-off": "eye"} color={COLORS.dark} size={SIZES.medium} style={{alignSelf:"center"}} />
                            </Pressable>
                        </KeyboardAvoidingView>
                        {formik.errors.password && formik.touched.password ? <Text style={{color:"red",position:"relative",left:50,fontSize:SIZES.xSmall,width:"80%"}}>{formik.errors.password}</Text>:null}
                    </View>
                    <TouchableOpacity onPress={formik.submitForm}  style={styles.submitButton} disabled={isSubmit} >
                        {
                            isSubmit ? (
                                <ActivityIndicator size="small" color={COLORS.white} />
                            ): 
                                (
                                    <>

                                        <Text style={{color:COLORS.white,fontFamily:FONT.medium,fontSize:SIZES.xSmall}}>Sign in</Text>
                                        <View style={{marginTop:5}}>
                                            <Ionicons name='arrow-forward' size={SIZES.medium} color={COLORS.white} />
                                        </View>
                                    </>
                                )
                        }
                    </TouchableOpacity>


                </View>
                <View style={{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:5}}>
                    <View style={{height:3,backgroundColor:COLORS.secondary,width:"15%"}} />
                    <Text style={{fontFamily:FONT.regular,fontSize:SIZES.xSmall,color:COLORS.dark}} >You don't have an account</Text>
                    <View style={{height:3,backgroundColor:COLORS.secondary,width:"15%"}} />
                </View>
                <View style={{alignItems:"center",width:"100%"}} >
                    <TouchableOpacity style={{backgroundColor:COLORS.lightSecondary,width:"80%",padding:10,borderRadius:50}} onPress={()=>router.navigate("/register")} >
                        <Text style={{textAlign:"center",color:COLORS.white,fontFamily:FONT.regular}} >Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </>
        
    );
};

export default Login;
export type StylesType={
    textInput:(type:any,error:string,touched?:string)=>ViewStyle,
    submitButton:ViewStyle,
    errorText:ViewStyle
}

const styles=StyleSheet.create<StylesType| any >({
    textInput:(type: string,error: any,touched:any)=>({
        width:type!="password"? "80%": "70%",
        height:50,
        backgroundColor:COLORS.lightWhite,
        fontSize:SIZES.small,
        fontFamily:FONT.medium,
        color:COLORS.dark,
        borderRadius:type!="password"? 10 : 0,
        padding:5,
        borderWidth: error && touched ? 2: 0 ,
        borderColor : error && touched ? "#D04848": ""
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