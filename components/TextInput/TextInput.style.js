import { StyleSheet } from "react-native";
import { COLORS,SIZES,FONT } from "../../constants";


export const styles=StyleSheet.create({
    inputContainer:{
        justifyContent:"start",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:COLORS.white,
        width:"80%",
        height:"auto",
        marginLeft:"auto",
        marginRight:"auto",
        borderRadius:10,
        gap:7,
        padding:5

    },
    image:{
        width:25,
        height:25,
       
    },
    textInput:{
        fontFamily:FONT.regular,
        fontSize:SIZES.small,
        justifyContent:"center",
        width:"80%",
        
    }
})