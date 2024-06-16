import { View, Text, ListRenderItem, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useEffect, useRef, useState } from 'react';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';
import tw from 'twrnc';
import { defaultStyles } from '~/constants/Styles';

interface Props {
  listings: any[];
  refresh: number;
  category: string;
}

const Listings = ({ listings: items, refresh, category }: Props) => {
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Use for "updating" the views data after category changed
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  // Render one listing row for the FlatList
  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={tw`p-4 gap-2.5 my-4`} entering={FadeInRight} exiting={FadeOutLeft}>
          <Animated.Image source={{ uri: item.medium_url }} style={tw`w-full h-75 rounded-lg`} />
          <TouchableOpacity style={tw`absolute right-7.5 top-7.5`}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-lg  `}>{item.name}</Text>
            <View style={tw`flex-row gap-1`}>
              <Ionicons name="star" size={16} />
              <Text style={tw` `}>{item.review_scores_rating / 20}</Text>
            </View>
          </View>
          <Text style={tw` `}>{item.room_type}</Text>
          <View style={tw`flex-row gap-1`}>
            <Text style={tw` `}>€ {item.price}</Text>
            <Text style={tw` `}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={renderRow}
        data={loading ? [] : items}
        ref={listRef}
        ListHeaderComponent={
          <Text style={tw`text-center   text-lg mt-1`}>{items.length} homes</Text>
        }
      />
    </View>
  );
};

export default Listings;
