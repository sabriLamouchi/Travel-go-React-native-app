import React, { useState } from 'react';
import { View ,Text, SafeAreaView, TouchableOpacity, Pressable, TextInput, StyleSheet, ScrollView, Alert, ActivityIndicator, ViewStyle, KeyboardAvoidingView, Platform} from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {useFormik} from 'formik'
import { firestore_db,auth } from '../../firebaseConfig';
import { Firestore, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import * as Yup from 'yup'
import { validationSchema } from '../../hooks/validationSchema';
import { useRouter } from 'expo-router';
import { appSignUp } from '../../lib/store';
const regx="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$";
//Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character


const Register = () => {
    const [showPassword,setShowPassword]=useState(true);
    const [onSubmit,setOnSubmit]=useState(false);
    const router =useRouter()
    const formik = useFormik({
        initialValues:{firstName:"",lastName:"",email:"",password:""},
        validationSchema: validationSchema(), // validate the form data
        validateOnChange: false,
        onSubmit: async (formValue) => {
          try { // send the data to Firebase
            setOnSubmit(true)
            const res=await appSignUp(formValue.firstName,formValue.lastName,formValue.email,formValue.password).then(()=>{
                router.navigate("/login");
            })
            setOnSubmit(false)
          } catch (error) {
            // We use Toast to display errors to the user
            setOnSubmit(false);
          }
        },
      })

    return (
        <KeyboardAvoidingView style={{flex:1,backgroundColor:COLORS.primary,gap:50}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            
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
            <View style={{width:"100%", justifyContent:"center",alignItems:"center"}} >
                <Text style={{fontFamily:FONT.bold,fontSize:SIZES.xLarge,color:COLORS.secondary}} >Register</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:5}}>
            <KeyboardAvoidingView style={{justifyContent:"center",alignItems:"center",width:"100%",height:"auto" ,gap:45 }} >
                <View style={{width:"80%"}}>
                    <TextInput
                        placeholder='first name'   blurOnSubmit={true} onBlur={formik.handleBlur('firstName')} nativeID='firstName' onChangeText={(text)=>formik.setFieldValue("firstName",text)} style={{
                            ...styles.textInput('firstName',formik.errors.firstName,formik.touched.firstName),width:'100%'
                        }} />
                    {formik.errors.firstName && formik.touched.firstName ? <Text style={{color:"red",position:"relative",left:10,fontSize:SIZES.xSmall,width:"80%"}}>{formik.errors.firstName}</Text>:null}
                </View>

                <View style={{width:"80%"}}>
                    <TextInput
                        placeholder='Last name'   blurOnSubmit={true} onBlur={formik.handleBlur('lastName')} nativeID='lastName' onChangeText={(text)=>formik.setFieldValue("lastName",text)} style={{
                            ...styles.textInput('lastName',formik.errors.lastName,formik.touched.lastName),width:'100%'
                        }} />
                    {formik.errors.lastName && formik.touched.lastName ? <Text style={{color:"red",position:"relative",left:10,fontSize:SIZES.xSmall,width:"80%"}}>{formik.errors.lastName}</Text>:null}
                </View>
                    
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

                <TouchableOpacity disabled={formik.isSubmitting} style={styles.submitButton}  onPress={(e)=>formik.handleSubmit()} >
                    {
                        !onSubmit ? (
                            <View style={{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:5}}>
                                <Text style={{color:COLORS.white,fontFamily:FONT.medium,fontSize:SIZES.xSmall}}>Register</Text>
                                <View style={{marginTop:5}}>
                                    <Ionicons name='arrow-forward' size={SIZES.medium} color={COLORS.white} />
                                </View>
                            </View>
                        ):(
                            <ActivityIndicator color={COLORS.white} size={SIZES.small}  />
                        )
                    }
                </TouchableOpacity>

                
            </KeyboardAvoidingView>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:5}}>
                <View style={{height:3,backgroundColor:COLORS.secondary,width:"15%"}} />
                <Text style={{fontFamily:FONT.regular,fontSize:SIZES.xSmall,color:COLORS.dark}} >Already have an account</Text>
                <View style={{height:3,backgroundColor:COLORS.secondary,width:"15%"}} />
            </View>
            <View style={{alignItems:"center",width:"100%"}} >
                <TouchableOpacity style={{backgroundColor:COLORS.lightSecondary,width:"80%",padding:10,borderRadius:50}} onPress={()=>router.navigate('/login')} >
                    <Text style={{textAlign:"center",color:COLORS.white,fontFamily:FONT.regular}} >Login</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;

// export type StylesType={
//     textInput:(type:string,error:string,touched:string)=>ViewStyle | any,
//     submitButton:ViewStyle,
// }

const styles=StyleSheet.create<any>({
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

    }
})