import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import useChatGpt from '~/queries/useChatGpt';

export default function ChatScreen() {
  const [prompt, setPrompt] = useState('');
  const { askChatGpt } = useChatGpt();

  return (
    <View className="flex flex-1 pt-10 items-center">
      <View className="flex-1" />
      <View className="flex flex-row w-full px-6 pb-10 pt-4 bg-neutral-300">
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          className="mr-4 bg-white border-black border-2 px-4 py-3 flex-1 rounded-3xl text-black placeholder:text-gray-500"
          placeholder="Enter your message"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          disabled={!prompt}
          className="bg-blue-600 disabled:bg-black p-3 px-5 rounded-3xl"
          onPress={() => askChatGpt({ prompt })}>
          <Text disabled={!prompt} className="text-white text-center">
            Ask
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
