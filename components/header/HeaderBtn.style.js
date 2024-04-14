import { StyleSheet } from "react-native";

import { COLORS,SIZES } from "../../constants";

export const styles=StyleSheet.create({
    btnContainer:(type)=>({
        width:40,
        height:40,
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:type=="account"?COLORS.white:"",

    }),
    btnImg:(type)=>(
        type==="account" ?{
            width:40,
            height:40,
            borderRadius:100,
    
        } :{
            width:30,
            height:30,
            backgroundColor:COLORS.dark,
            borderRadius:100

        }
    )
});

