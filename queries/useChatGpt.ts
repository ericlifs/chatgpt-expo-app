import { useMutation } from '@tanstack/react-query';
import OpenAI from 'openai';
import { useState } from 'react';

import { storage } from '~/storage/mmkv';
import { Message } from '~/types';

const askChatGpt = async ({ prompt }: { prompt: string }): Promise<Message> => {
  const apiKey = storage.getString('apiKey');

  if (!apiKey) {
    throw new Error('No API Key configured');
  }

  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0.2,
    messages: [{ role: 'user', content: prompt }],
  });

  return {
    author: 'gpt',
    content: completion.choices[0].message.content || `Sorry, I don't know the answer`,
  };
};

export default function useChatGpt() {
  const [messages, setMessages] = useState<Message[]>([]);

  const { isPending, mutate } = useMutation({
    mutationFn: askChatGpt,
    onError: console.log,
    onMutate: ({ prompt }) => {
      setMessages((prevMessages) => [...prevMessages, { author: 'me', content: prompt }]);
    },
    onSuccess: (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    },
  });

  return { messages, askChatGpt: mutate, isPending };
}
