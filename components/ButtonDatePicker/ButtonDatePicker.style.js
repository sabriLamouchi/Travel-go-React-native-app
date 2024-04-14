import { StyleSheet } from "react-native";
import { COLORS,SIZES,FONT } from "../../constants";

export const styles=StyleSheet.create({
    ButtonContainer:{
        justifyContent:"space-between",
        gap:5,
        width:"80%",
        height:"auto",
        alignItems:"center",
        flexDirection:"row",
        backgroundColor:COLORS.white,
        marginLeft:"auto",
        marginRight:"auto",
        borderRadius:10,
        padding:5
    },
    Button:{
        width:"80%",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
    },
    text:{
        fontFamily:FONT.regular,
        fontSize:SIZES.small,
        width:"100%",
        color:"gray",
        textAlign:"center"
    },
    image:(activePickDate)=>({
        transform:activePickDate? [{rotateZ:"180deg"}]:"",
    })

})


