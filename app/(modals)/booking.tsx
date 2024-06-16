import { View, Text, ScrollView, Image, SafeAreaView } from "react-native";
import { useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { places } from "@/assets/data/places";
import { useRouter } from "expo-router";
// @ts-ignore
import DatePicker, { DateType } from "react-native-ui-datepicker";
import { guestsGropus } from "@/assets/data/catigories";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({
    startDate: undefined,
    endDate: undefined,
  });
  const [groups, setGroups] = useState(guestsGropus);
  const router = useRouter();
  const today = new Date().toISOString().substring(0, 10);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View
        style={tw`bg-white rounded-lg m-2.5 shadow-lg shadow-black shadow-opacity-30 shadow-radius-4 shadow-offset-2 shadow-offset-2 gap-5`}
      >
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={tw`flex-row justify-between p-5`}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={tw`font-bold text-sm text-gray-500`}>Where</Text>
            <Text style={tw`font-bold text-sm text-gray-900`}>
              I'm flexible
            </Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 0 && (
          <Text style={tw`font-bold text-2xl p-5`}>Where to?</Text>
        )}
        {openCard == 0 && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={tw`px-5 pb-5`}
          >
            <View
              style={tw`h-12 flex-row justify-center items-center bg-white border border-gray-400 rounded-lg mb-4`}
            >
              <Ionicons
                style={tw`p-2.5`}
                name="ios-search"
                size={20}
                color="#000"
              />
              <TextInput
                style={tw`flex-1 p-2.5 bg-white`}
                placeholder="Search destinations"
                placeholderTextColor={Colors.grey}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`flex-row gap-6`}
            >
              {places.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedPlace(index)}
                  key={index}
                >
                  <Image
                    source={item.img}
                    style={
                      selectedPlace == index
                        ? tw`border-2 border-gray-500 rounded-lg w-25 h-25`
                        : tw`w-25 h-25 rounded-lg`
                    }
                  />
                  <Text style={tw` o pt-1.5`}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </View>

      {/* When */}
      <View
        style={tw`bg-white rounded-lg m-2.5 shadow-lg shadow-black shadow-opacity-30 shadow-radius-4 shadow-offset-2 shadow-offset-2 gap-5`}
      >
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={tw`flex-row justify-between p-5`}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={tw`font-bold text-sm text-gray-500`}>When</Text>
            <Text style={tw`font-bold text-sm text-gray-900`}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 1 && (
          <Text style={tw`font-bold text-2xl p-5`}>When's your trip?</Text>
        )}

        {openCard == 1 && (
          <Animated.View style={tw`px-5 pb-5`}>
            <DatePicker
              mode="range"
              startDate={range.startDate}
              endDate={range.endDate}
              onChange={(params) => setRange(params)}
              headerButtonColor={Colors.primary}
              selectedItemColor={Colors.primary}
              selectedTextStyle={{
                fontWeight: "bold",
                color: "#fff",
              }}
              todayContainerStyle={{ borderWidth: 1 }}
              monthContainerStyle={{
                borderWidth: 0,
                borderRadius: 30,
                margin: 10,
              }}
              yearContainerStyle={{
                borderWidth: 0,
                borderRadius: 30,
                margin: 10,
              }}
            />
          </Animated.View>
        )}
      </View>

      {/* Guests */}
      <View
        style={tw`bg-white rounded-lg m-2.5 shadow-lg shadow-black shadow-opacity-30 shadow-radius-4 shadow-offset-2 shadow-offset-2 gap-5`}
      >
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={tw`flex-row justify-between p-5`}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={tw`font-bold text-sm text-gray-500`}>Who</Text>
            <Text style={tw`font-bold text-sm text-gray-900`}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 2 && (
          <Text style={tw`font-bold text-2xl p-5`}>Who's coming?</Text>
        )}

        {openCard == 2 && (
          <Animated.View style={tw`px-5 pb-5`}>
            {groups.map((item, index) => (
              <View
                key={index}
                style={[
                  tw`flex-row justify-between items-center py-4`,
                  index + 1 < guestsGropus.length
                    ? tw`border-b border-gray-500`
                    : null,
                ]}
              >
                <View>
                  <Text style={tw`font-bold text-base`}>{item.name}</Text>
                  <Text style={tw`text-base text-gray-500`}>{item.text}</Text>
                </View>

                <View style={tw`flex-row gap-2.5 items-center justify-center`}>
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups];
                      newGroups[index].count =
                        newGroups[index].count > 0
                          ? newGroups[index].count - 1
                          : 0;

                      setGroups(newGroups);
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={26}
                      color={groups[index].count > 0 ? Colors.grey : "#cdcdcd"}
                    />
                  </TouchableOpacity>
                  <Text style={tw`text-lg min-w-4.5 text-center`}>
                    {item.count}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups];
                      newGroups[index].count++;
                      setGroups(newGroups);
                    }}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={26}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Animated.View>
        )}
      </View>

      {/* Footer */}
      <Animated.View
        style={tw`absolute bottom-0 left-0 right-0 bg-white p-5 shadow-lg shadow-black shadow-opacity-30 shadow-radius-4 shadow-offset-2 shadow-offset-2`}
        entering={SlideInDown.delay(200)}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <TouchableOpacity
            style={tw`h-full justify-center`}
            onPress={onClearAll}
          >
            <Text style={tw`s font-bold underline`}>Clear all</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw` bg-[${Colors.primary}] rounded-lg py-2 px-4 flex-row items-center gap-2`}
            onPress={() => router.back()}
          >
            <Ionicons
              name="search-outline"
              size={24}
              style={tw`text-white`}
              color={"#fff"}
            />
            <Text style={tw`text-white  font-bold `}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Page;
