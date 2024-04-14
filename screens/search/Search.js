import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import {Stack,useRouter} from 'expo-router'
import HeaderBtn from '../../components/header/HeaderBtn';
import Ionicons from 'react-native-vector-icons/Ionicons'
const Search = ({navigation}) => {
    const router=useRouter();
    return (
        <SafeAreaView style={{flex:1,backgroundColor:COLORS.primary}} >
            <View style={{flex:1,marginTop:50,flexDirection:"row",justifyContent:"space-between",paddingHorizontal:10}}>
                <HeaderBtn icon='arrow-back-outline' color={COLORS.white} handleClick={()=>navigation.goBack()} />
                <View style={{flexDirection:"row",gap:10}}>
                    <HeaderBtn icon='share-social-outline' color={COLORS.white}  />
                    <HeaderBtn icon='heart'  color={COLORS.white} />
                </View>
            </View>

        </SafeAreaView>
    );
};

export default Search;