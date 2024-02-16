import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';

import { storage } from '~/storage/mmkv';

export default function SettingsScreen() {
  const initialApiKey = storage.getString('apiKey') || '';
  const [apiKey, setApiKey] = useState(initialApiKey);

  const saveApiKeyToStorage = () => {
    storage.set('apiKey', apiKey);

    Toast.show('API Key stored correctly', {
      position: Toast.positions.TOP,
      duration: Toast.durations.LONG,
    });

    router.navigate('/chat');
  };

  return (
    <View className="flex flex-1 flex-col items-center space-y-4 w-full px-6 py-10">
      <Text className="mb-4" numberOfLines={1}>
        Current API Key: {initialApiKey || '-'}
      </Text>
      <TextInput
        value={apiKey}
        onChangeText={setApiKey}
        className="mb-4 bg-white border-black border-2 px-4 py-3 w-full rounded-xl text-black placeholder:text-gray-500"
        placeholder="Enter your API Key"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Pressable
        disabled={!apiKey}
        className="w-full bg-blue-600 disabled:bg-black py-3 rounded-xl"
        onPress={saveApiKeyToStorage}>
        <Text className="text-white text-center">Save API Key</Text>
      </Pressable>
    </View>
  );
}
