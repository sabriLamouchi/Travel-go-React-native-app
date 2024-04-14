import { StyleSheet } from "react-native";
import { COLORS,SIZES,FONT } from "../../../constants";


export const styles=StyleSheet.create({
    nearbyPlaceContainer:{
        justifyContent:"center",
        alignItems:"center",
        gap:10,
        position:'relative',
        width:"100%",
        fontWeight:FONT.bold,
        fontSize:SIZES.large,
    },
    imageContainer:(description)=>({
        width:"100%",
        height:description ? 200:250,
        position:"relative",
        paddingTop:description ? 0 : 10
    }),
    image:{
        width:340,
        height:'100%',
        borderRadius:25
    },
    imageBanner:{
        position:"absolute",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:13,
        bottom:0,
        right:0,
        backgroundColor:COLORS.green,
        width:160,
        textAlign:"center",
        height:50,
        borderTopLeftRadius:50,
        borderBottomRightRadius:25,

        
    },
    imageText:{
        color:COLORS.white,
        fontSize:SIZES.medium,
        fontFamily:FONT.regular,
        textAlign:"center",
        textAlignVertical:"center"
    },
    description:{
        flexDirection:"column",
        width:320,
        gap:10,
        height:"auto",
        overflow:"scroll"
    },
    placeRegion:{
        position:"relative",
        bottom:"70%",
        backgroundColor:COLORS.gray,
        width:100,
        left:'36%',
        opacity:0.6,
        borderRadius:25,
        justifyContent:"center",
        alignItems:"center",

    }
})