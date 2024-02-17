import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import tailshake from 'tailshake';

import useChatGpt from '~/queries/useChatGpt';

export default function ChatScreen() {
  const flatListRef = useRef<FlatList>(null);

  const [prompt, setPrompt] = useState('');
  const { askChatGpt, messages, isPending } = useChatGpt();

  const onAskButtonPress = () => {
    askChatGpt({ prompt });
    setPrompt('');

    flatListRef.current?.scrollToEnd();
  };

  return (
    <View className="flex flex-1 items-center">
      <FlatList
        ref={flatListRef}
        data={messages}
        className="flex-1 w-full"
        contentContainerClassName="p-6"
        extraData={{ isPending }}
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
        ListFooterComponent={() => {
          if (isPending) {
            return (
              <View className="my-4">
                <ActivityIndicator />
              </View>
            );
          }

          return null;
        }}
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
          onPress={onAskButtonPress}>
          <Text disabled={!prompt} className="text-white text-center">
            Ask
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
