import React from 'react';
import { Button, Image, Pressable, Text, TextInput, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { styles } from './ButtonDatePicker.style';
import Ionicons from 'react-native-vector-icons/Ionicons'

interface ButtonDatePickerProps{
    handleClick:any
    title:string,
    icon:string,
    iconIndecator?:any | null
    activePickDate?:boolean
}
const ButtonDatePicker = ({handleClick,title,icon,iconIndecator,activePickDate}:ButtonDatePickerProps) => {
    return (
        <View style={styles.ButtonContainer}>
            {/* <Image source={icon} resizeMode='cover' style={styles.image(null)}  /> */}
            <Ionicons name={icon} color={COLORS.primary} size={SIZES.medium} />
            <Pressable onPress={handleClick} style={styles.Button} >
                <Text style={styles.text}>{title}</Text>
            </Pressable>
            {iconIndecator ? 
            (<Ionicons name={iconIndecator} size={SIZES.medium} color={COLORS.secondary} style={styles.image(activePickDate)} />):null}
        </View>
    );
};

export default ButtonDatePicker;