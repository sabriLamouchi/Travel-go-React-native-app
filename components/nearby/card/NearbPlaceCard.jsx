import { Image, ScrollView, Text,View  } from 'react-native';
import { styles } from './NearbPlaceCard.style';
import { images,icons, COLORS, FONT, SIZES } from '../../../constants';
import { useCallback, useEffect, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
const NearbPlaceCard = ({hotels,country,image_url,description,region}) => {
    const [textShown,setTextShown]=useState(false);
    const [lengthMore,setLengthMore]=useState(false);
    const [numLines,setNumLines]=useState(undefined);
    const toggleNumberOfLines=()=>{
        setTextShown(!textShown);
    }
    useEffect(() => {
        setNumLines(textShown ? undefined : 4);
      }, [textShown]);
    
    const onTextLayout=useCallback((e)=>{
        setLengthMore(e.nativeEvent.lines.length>=4);
        console.log(e.nativeEvent.lines.length>=4)
    },[lengthMore]);
    return (
            <View style={{flex:1,margin:5,width:"100%",paddingHorizontal:12,paddingTop:5}}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{gap:25}} >
                    <View style={styles.nearbyPlaceContainer}>
                        <View style={styles.imageContainer(description)}>
                            <Image source={
                                typeof image_url ==="string" ?
                                {
                                    uri: image_url ? image_url: images.randomPlace
                            }
                            :
                            image_url
                            } resizeMode='stretch' style={styles.image} />
                            <View style={styles.imageBanner}>
                                <Text style={styles.imageText}>
                                    {hotels}
                                </Text>
                                <FontAwesome6 name="hotel" size={SIZES.small} color={COLORS.yellow} />
                            </View>
                            <View style={styles.placeRegion}>
                                <Text style={{fontFamily:FONT.medium,fontSize:SIZES.large,color:COLORS.white,textAlign:"center"}}>
                                    {region}
                                    
                                </Text>
                            </View>
                        </View>

                    </View>
                    {description ?
                                        <View style={styles.description} showsVerticalScrollIndicator={false}>
                                        <Text style={{fontFamily:FONT.medium,fontSize:SIZES.xSmall}} >Details</Text>
                                        <Text
                                        onTextLayout={onTextLayout}
                                        numberOfLines={textShown ?undefined:4}
                                        onPress={toggleNumberOfLines}
                                        style={{fontFamily:FONT.regular,fontSize:SIZES.xSmall}} 
                                        >
                                            {description}
                                            {
                                                lengthMore ?
                                                <Text
                                                
                                                style={{fontFamily:FONT.medium}}
                                                >
                                                    {
                                                        textShown ?'...ReadLess'
                                                        :'...ReadMore'
                                                    }
                                                </Text>
                                                : null 
                                            }
                                        </Text>
                                </View>
                                :
                                null}
                </ScrollView>
            </View>
    );
};

export default NearbPlaceCard;