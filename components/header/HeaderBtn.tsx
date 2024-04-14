import { Image, Touchable } from "react-native";
import { TouchableOpacity } from "react-native";
import { styles } from "./HeaderBtn.style";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS, SIZES } from "../../constants";
interface HeaderBtnProps{
    icon:string | any
    type?:string,
    color?:string,
    handleClick?:any,
    size?:number,
}
const HeaderBtn=({icon,type,handleClick,color,size}:HeaderBtnProps)=>{
    return(
        <TouchableOpacity style={styles.btnContainer(type)} onPress={handleClick}>
            {
                type==='account'?(
                    <Image source={icon} resizeMode="cover" style={styles.btnImg(type)} />
                   
                ):
                <Ionicons name={icon} size={size?size:SIZES.large} color={color? color:COLORS.secondary} />
            }
        </TouchableOpacity>
    );

}

export default HeaderBtn;