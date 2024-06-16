import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  // Update Clerk user data
  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  // Capture image from camera roll
  // Upload to Clerk as avatar
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row justify-between p-6`}>
        <Text style={tw`font-bold text-2xl`}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      {user && (
        <View
          style={tw`bg-white p-6 rounded-xl mx-6 mt-6 shadow-lg items-center mb-6`}
        >
          <TouchableOpacity onPress={onCaptureImage}>
            <Image
              source={{ uri: user?.imageUrl }}
              style={tw`w-25 h-25 rounded-full bg-gray-300`}
            />
          </TouchableOpacity>
          <View style={tw`flex-row gap-1.5`}>
            {!edit && (
              <View
                style={tw`flex-1 flex-row items-center justify-center gap-2`}
              >
                <Text style={tw`font-bold text-xl`}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            )}
            {edit && (
              <View
                style={tw`flex-1 flex-row items-center justify-center gap-2`}
              >
                <TextInput
                  placeholder="First Name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  style={tw`border p-2 rounded w-25`}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  style={tw`border p-2 rounded w-25`}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons
                    name="checkmark-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>{email}</Text>
          <Text>Since {user?.createdAt!.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn && (
        <TouchableOpacity
          onPress={() => signOut()}
          style={tw`bg-black p-4 rounded mx-6`}
        >
          <Text style={tw`text-white text-center`}>Log Out</Text>
        </TouchableOpacity>
      )}
      {!isSignedIn && (
        <Link href={"/(modals)/login"} asChild>
          <TouchableOpacity style={tw`bg-black p-4 rounded mx-6`}>
            <Text style={tw`text-white text-center`}>Log In</Text>
          </TouchableOpacity>
        </Link>
      )}
    </SafeAreaView>
  );
};

export default Page;
