import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { styles } from "./NearbyPlaces.style";
import NearbPlaceCard from "./card/NearbPlaceCard";
import { nearbyPlaces } from "../../constants/data";
import SwiperFlatList from 'react-native-swiper-flatlist'
import { COLORS } from "../../constants";
import {collection, onSnapshot, query} from 'firebase/firestore'
import {firestore_db} from '../../firebaseConfig'
import { useEffect, useState } from "react";
const NearbyPlaces = () => {
    const [nearbPlaces,setNearbyPlaces]=useState([]);
    useEffect(()=>{
        const nearbyRef=collection(firestore_db,"nearbypPlaces");
        const subscriber=onSnapshot(nearbyRef,{
            next:(snapshot)=>{
                const nrbPlaces=[];
                snapshot.docs.forEach((doc)=>{
                    nrbPlaces.push({
                        id:doc.id,
                        ...doc.data(),
                    });
                });
                setNearbyPlaces(nrbPlaces);
            }
        });
        
        return ()=>subscriber();
    },[]);

    

    return (
        <View style={styles.nearbyContainer}> 
    
                <SwiperFlatList
                    index={0}
                    data={nearbPlaces}
                    autoplay
                    autoplayLoop={true}
                    autoplayLoopKeepAnimation={true}

                    autoplayDelay={4}

                    renderItem={({ item,index }) => (
                        <NearbPlaceCard
                        key={index}
                        image_url={item.image_url}
                        hotels={item.hotels}
                        country={item.country}
                        description={item.description}
                        region={item.region}
                        name={item.name}
                    />
                    )}
                    />
        </View>

    );
};

export default NearbyPlaces;