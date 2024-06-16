import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { memo, useEffect, useRef } from 'react';
import { defaultStyles } from '~/constants/Styles';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

import tw from 'twrnc';
import { onLocateMe } from '@/hooks/useLocation';

interface Props {
  listings: any;
  mapRef: React.RefObject<MapView>;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMap = memo(({ listings, mapRef }: Props) => {
  const router = useRouter();

  // When the component mounts, locate the user

  // When a marker is selected, navigate to the listing page
  const onMarkerSelected = (event: any) => {
    router.push(`/listing/${event.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}>
        <View
          style={tw`p-2 items-center justify-center bg-white elevation-5 rounded-lg shadow-black shadow-opacity-10 shadow-radius-6 shadow-offset-1-10`}>
          <Text style={tw`text-black text-center font-semibold`}>{points}</Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        ref={mapRef}
        animationEnabled={false}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}>
        {/* Render all our marker as usual */}
        {listings.features.map((item: any) => (
          <Marker
            coordinate={{
              latitude: item.properties.latitude,
              longitude: item.properties.longitude,
            }}
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}>
            <View
              style={tw`p-2 items-center justify-center bg-white elevation-5 rounded-lg shadow-black shadow-opacity-10 shadow-radius-6 shadow-offset-1-10`}>
              <Text style={tw`text-base `}>€ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
});

export default ListingsMap;
