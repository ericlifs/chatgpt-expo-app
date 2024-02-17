import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import tailshake from 'tailshake';

import useChatGpt from '~/queries/useChatGpt';

export default function ChatScreen() {
  const [prompt, setPrompt] = useState('');
  const { askChatGpt, messages } = useChatGpt();

  return (
    <View className="flex flex-1 items-center">
      <FlatList
        data={messages}
        className="flex-1 w-full"
        contentContainerClassName="p-6"
        ListEmptyComponent={() => <View className="flex-1 w-full p-6" />}
        renderItem={({ item, index }) => (
          <>
            <Text className={tailshake('text-lg', item.author === 'me' && 'font-bold mb-2')}>
              {item.content}
            </Text>
            {item.author === 'gpt' && index !== messages.length - 1 && (
              <View className="my-4 h-px bg-black" />
            )}
          </>
        )}
      />

      <View className="flex flex-row w-full px-6 pb-10 pt-4 border-black border-t bg-neutral-300">
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          className="mr-4 bg-white border-black border px-4 py-3 flex-1 rounded-3xl text-black placeholder:text-gray-500"
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
