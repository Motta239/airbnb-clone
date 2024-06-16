import * as Location from "expo-location";
import MapView from "react-native-maps";

export const onLocateMe = async ({
  mapRef,
}: {
  mapRef: React.RefObject<MapView>;
}) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 7,
    longitudeDelta: 7,
  };

  mapRef.current?.animateToRegion(region);
};
