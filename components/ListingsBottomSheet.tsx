import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Listings from "@/components/Listings";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { onLocateMe } from "@/hooks/useLocation";
import MapView from "react-native-maps";
import { BlurView } from "expo-blur";

interface Props {
  listings: any[];
  category: string;
  mapRef: React.RefObject<MapView>;
}

// Bottom sheet that wraps our Listings component
const ListingsBottomSheet = ({ listings, category, mapRef }: Props) => {
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      enableDynamicSizing={true}
      handleComponent={() => (
        <BlurView
          intensity={100}
          tint="default"
          style={tw`flex-row w-15 h-15 justify-center  items-center overflow-hidden rounded-xl left-2 top-[-20]`}
        >
          <View style={tw` `}>
            <TouchableOpacity
              style={tw`   p-2 rounded-lg elevation-2 shadow-black shadow-opacity-10 shadow-radius-6 shadow-offset-1-10`}
              onPress={() => onLocateMe({ mapRef })}
            >
              <Ionicons name="navigate" size={24} color={Colors.dark} />
            </TouchableOpacity>
          </View>
        </BlurView>
      )}
      enableHandlePanningGesture
      handleIndicatorStyle={tw`bg-gray-400`}
      style={tw`bg-white elevation-4 shadow-lg rounded-t-full`}
    >
      <View style={tw`flex-1`}>
        <Listings listings={listings} refresh={refresh} category={category} />
        <View style={tw`absolute bottom-8 w-full items-center`}>
          <TouchableOpacity
            onPress={onShowMap}
            style={tw`bg-black py-4 px-7 rounded-full flex-row items-center`}
          >
            <Text style={tw`font-bold text-white`}>Map</Text>
            <Ionicons name="map" size={20} style={tw`ml-2`} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ListingsBottomSheet;
