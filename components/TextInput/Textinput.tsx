import {  Text, TextInput, View } from "react-native";
import { styles } from "./TextInput.style";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS, SIZES } from "../../constants";
import { useEffect } from "react";
interface TextInputProps{
    type?:string
    icon:string,
    placeholder:string
    handlerEvent?:any
    setText?:any
    value?:string
}
const Textinput = ({icon,placeholder,handlerEvent,type,setText,value}:TextInputProps) => {
    return (
        <View style={styles.inputContainer}>
            {/* <Image source={icon} resizeMode="cover" style={styles.image} /> */}
            <Ionicons name={icon} size={SIZES.medium} color={COLORS.primary} />
            {
                <TextInput placeholder={placeholder} style={styles.textInput} onEndEditing={(e:any)=>setText(e.nativeEvent.text)} />
            }
            
            
        </View>
    );
};

export default Textinput;