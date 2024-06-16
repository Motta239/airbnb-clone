import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Share,
  NativeScrollEvent,
} from 'react-native';
import listingsData from '@/assets/data/airbnb-listings.json';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { defaultStyles } from '~/constants/Styles';
import tw from 'twrnc';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const listing = (listingsData as any[]).find((item) => item.id === id);
  const navigation = useNavigation();
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
    if (event.nativeEvent.contentOffset.y > IMG_HEIGHT - 100) {
      setBackgroundColor('white');
    } else {
      setBackgroundColor('transparent');
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerStyle: {
            backgroundColor: backgroundColor,
          },

          headerRight: () => (
            <View style={tw`flex-row items-center justify-center gap-2.5`}>
              <TouchableOpacity
                style={tw`w-10 h-10 rounded-full bg-white items-center justify-center`}
                onPress={shareListing}>
                <Ionicons name="share-outline" size={22} color={'#000'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`w-10 h-10 rounded-full bg-white items-center justify-center`}>
                <Ionicons name="heart-outline" size={22} color={'#000'} />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={tw`w-10 h-10 rounded-full bg-white items-center justify-center`}
              onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={'#000'} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={tw`flex-1 bg-white`}>
        <Animated.ScrollView
          contentContainerStyle={tw`pb-25`}
          onScroll={onScroll}
          scrollEventThrottle={16}>
          <Animated.Image
            source={{ uri: listing.xl_picture_url }}
            style={[tw`h-75 w-full`]}
            resizeMode="contain"
          />
          <View style={tw`p-6 bg-white`}>
            <Text style={tw`text-2xl font-bold `}>{listing.name}</Text>
            <Text style={tw`text-lg mt-2.5 `}>
              {listing.room_type} in {listing.smart_location}
            </Text>
            <Text style={tw`text-base text-gray-500 my-1 `}>
              {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
              {listing.bathrooms} bathrooms
            </Text>
            <View style={tw`flex-row gap-1`}>
              <Ionicons name="star" size={16} />
              <Text style={tw`text-base `}>
                {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
              </Text>
            </View>
            <View style={tw`h-px bg-gray-300 my-4`} />
            <View style={tw`flex-row items-center gap-3`}>
              <Image
                source={{ uri: listing.host_picture_url }}
                style={tw`w-12.5 h-12.5 rounded-full bg-gray-300`}
              />
              <View>
                <Text style={tw`font-medium text-base`}>Hosted by {listing.host_name}</Text>
                <Text>Host since {listing.host_since}</Text>
              </View>
            </View>
            <View style={tw`h-px bg-gray-300 my-4`} />
            <Text style={tw`text-base mt-2.5  `}>{listing.description}</Text>
          </View>
        </Animated.ScrollView>
        <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
          <View style={tw`flex-row justify-between items-center`}>
            <TouchableOpacity style={tw`h-full justify-center flex-row items-center gap-1`}>
              <Text style={tw`text-base `}>€{listing.price}</Text>
              <Text>night</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[defaultStyles.btn, tw`px-5`]}>
              <Text style={defaultStyles.btnText}>Reserve</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

export default DetailsPage;
