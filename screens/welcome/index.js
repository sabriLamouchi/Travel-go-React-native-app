// import React,{useState,useEffect} from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { COLORS, FONT, SIZES } from '../../constants';
// import LottieView from 'lottie-react-native';
// const WelcomeScreen = ({navigation}) => {
//     const [LottieAnim, setLottieAnim] = useState()
    
//     useEffect(() => {
//            fetch('https://lottie.host/fc1c79a3-b338-4fb1-9c4b-704d1c9b8d96/IlUE9IdHfx.json', {
//                method: "GET",
//            })
//                .then((response) => response.json())
//                .then((responseData) => {
//                 //    console.log(responseData);
//                    setLottieAnim(responseData)
//                })
//                .catch((error) => {
//                    console.log(error);
//                })
//        }, [])
//     return (
//         <View style={{flex:1,backgroundColor:"#fff"}}>
//             <View style={styles.container}>
//                 {
//                     LottieAnim ? (
//                         <LottieView
//                         source={LottieAnim}
//                         autoPlay
//                         loop
//                         style={{
//                             width:"100%",
//                             height:300,
//                             // backgroundColor:"#eee"
//                         }}
//                         />
//                     ): null
//                 }
//                 <Text style={{fontFamily:FONT.medium,color:COLORS.secondary}}>
//                     Welcome to 
//                     <Text style={{fontFamily:FONT.bold,fontSize:SIZES.xLarge,color:COLORS.green}} >
//                         Travel GO
//                     </Text>
//                 </Text>
//             </View>
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity onPress={()=>navigation.navigate('register')} style={styles.button('login')} >
//                     <Text style={styles.Text}>Register</Text>
//                 </TouchableOpacity>
//                 <Text style={{fontSize:SIZES.xSmall,fontFamily:FONT.regular,color:COLORS.secondary}} >Already have an account</Text>
//                 <TouchableOpacity onPress={()=>navigation.navigate('login')} style={styles.button('register')}>
//                     <Text style={styles.Text} >Login</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles=StyleSheet.create({
//     container:{
//         justifyContent:"center",
//         alignItems:"center",
//         flex:1,
//     },
//     buttonContainer:{
//        justifyContent:"center",
//        alignItems:"center",
//        width:"100%",
//        gap:5
//     },
//     button:(type)=>({
//         width:"80%",
//         flexDirection:"row",
//         justifyContent:"center",
//         alignItems:"center",
//         backgroundColor: type==="login" ? COLORS.green: COLORS.lightSecondary,
//         height:"20%",
//         borderRadius:20,
//         borderWidth:type=="login" ? 0: 4,
//         borderColor: COLORS.green,
        
//     }),
//     Text:{
//         fontFamily:FONT.medium,
//         fontSize:SIZES.small,
//         color:COLORS.lightWhite,

//     }
// })

// export default WelcomeScreen;