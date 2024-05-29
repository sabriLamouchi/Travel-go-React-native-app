import { StyleSheet } from "react-native";
import { COLORS,SIZES,FONT } from "../constants";


export const styles=StyleSheet.create({
    searchContainer:{
        // flex:1,
        zIndex:-1
    },
    nearbyPlacesContainer: {
        backgroundColor:COLORS.primary,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        overflow:"hidden",
        flex:1,
        height:"100%"
    },
    ActivityIndicator: {
        width:"100%",
        height:"100%",
        backgroundColor:COLORS.primary,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        alignItems:"center",
        overflow:"hidden",
        justifyContent:"center",
        alignItems:"center"
    },
    loadingScreen:{
        position:"absolute",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100%",
        zIndex:1,
        
    },
    toastViewStyle:{
        backgroundColor:COLORS.red,
    }

})