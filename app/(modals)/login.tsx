import Colors from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '~/constants/Styles';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}
const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: 'oauth_facebook',
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-6`}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, tw`mb-7.5`]}
      />

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={tw`flex-row gap-2.5 items-center my-7.5`}>
        <View style={tw`flex-1 border-b border-black`} />
        <Text style={tw`  text-gray-500 text-base`}>or</Text>
        <View style={tw`flex-1 border-b border-black`} />
      </View>

      <View style={tw`gap-5`}>
        <TouchableOpacity
          style={tw`bg-white border border-gray-500 h-12.5 rounded-lg items-center justify-center flex-row px-2.5`}>
          <Ionicons name="mail-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={tw`text-black text-base  `}>Continue with Phone</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-white border border-gray-500 h-12.5 rounded-lg items-center justify-center flex-row px-2.5`}
          onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="md-logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={tw`text-black text-base  `}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-white border border-gray-500 h-12.5 rounded-lg items-center justify-center flex-row px-2.5`}
          onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={tw`text-black text-base  `}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-white border border-gray-500 h-12.5 rounded-lg items-center justify-center flex-row px-2.5`}
          onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={tw`text-black text-base  `}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;
