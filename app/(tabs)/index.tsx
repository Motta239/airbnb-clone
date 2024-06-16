import { View } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import listingsData from "@/assets/data/airbnb-listings.json";
import ListingsMap from "@/components/ListingsMap";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import MapView from "react-native-maps";

const Page = () => {
  const items = useMemo(() => listingsData as any, []);
  const getoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>("Tiny homes");

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  const mapRef = useRef<MapView>(null);

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      {/* Define pour custom header */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingsMap listings={getoItems} mapRef={mapRef} />
      <ListingsBottomSheet
        listings={items}
        category={category}
        mapRef={mapRef}
      />
    </View>
  );
};

export default Page;
