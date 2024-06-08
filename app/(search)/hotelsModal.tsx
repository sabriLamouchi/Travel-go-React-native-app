import { ScrollView, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSearchedData } from '../../lib/store';
import HotelCard from '../../components/cards/hotel-card';
import { COLORS, SIZES } from '../../constants';
export default function Modal() {
    const {data:hotels,dest_id,destination}=useSearchedData()
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  const isPresented = router.canGoBack();
  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor:COLORS.primary}}>
      {!isPresented && <Link href="../">Dismiss</Link>}
      <View style={{ width: '100%', height: 'auto', backgroundColor:COLORS.lightSecondary,justifyContent:"center",alignItems:"center",padding:10 }}>
        <Text style={{ fontSize:SIZES.large, fontWeight: "bold",color:COLORS.white }}>Hotels</Text>
      </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent:"center",alignItems:"center",flexDirection:"row",flexWrap:"wrap",rowGap:20,columnGap:20,marginTop:10 }}>
        {
            hotels.map((item,index)=>(
                <HotelCard hotelImage={hotels[index].property.photoUrls[0]} hotelName={hotels[index].property.name} reviewScore={hotels[index].property.reviewScore} hotelId={hotels[index].property.id} />
            ))
        }
        </ScrollView>
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
    </View>
  );
}
