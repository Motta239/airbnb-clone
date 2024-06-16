import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { categories } from "@/assets/data/catigories";

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`bg-white h-32 `}>
        <View style={tw`flex-row items-center justify-between px-6 pb-4`}>
          <View
            style={tw`bg-white flex-row gap-2 flex-1 p-3 items-center w-70 border border-gray-300 rounded-full shadow-lg`}
          >
            <Link href={"/(modals)/booking"} asChild>
              <TouchableOpacity style={tw`flex-1 flex-row gap-2`}>
                <Ionicons name="search" size={24} />
                <View>
                  <Text style={tw`font-semibold`}>Where to?</Text>
                  <Text style={tw`text-gray-500`}>Anywhere · Any week</Text>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
          {/* <Link href={"/(modals)/filters"} asChild>
            <TouchableOpacity style={tw`p-2 border border-gray-400 rounded-full`}>
              <Ionicons name="options-outline" size={24} />
            </TouchableOpacity>
          </Link> */}
        </View>

        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`items-center gap-5 px-4`}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              style={tw`${
                activeIndex === index ? "border-b-2 border-black pb-2" : "pb-2"
              } flex-1 items-center justify-center`}
              onPress={() => selectCategory(index)}
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={activeIndex === index ? "#000" : Colors.grey}
              />
              <Text
                style={tw`${
                  activeIndex === index
                    ? "text-black font-bold text-sm"
                    : "text-gray-500 text-base font-semibold"
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;
