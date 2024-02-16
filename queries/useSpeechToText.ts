import { useMutation } from '@tanstack/react-query';

import { storage } from '~/storage/mmkv';

const speechToText = async ({ audioUri }: { audioUri: string }) => {
  const apiKey = storage.getString('apiKey');

  if (!apiKey) {
    throw new Error('No API Key configured');
  }

  const formData = new FormData();
  const imageData = {
    uri: audioUri,
    type: 'audio/mp4',
    name: 'audio.m4a',
  };

  formData.append('file', imageData as unknown as Blob);
  formData.append('model', 'whisper-1');

  return fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  }).then((response) => response.json());
};

export default function useSpeechToText() {
  const { data, isPending, mutate } = useMutation({
    mutationFn: speechToText,
  });

  return { transformation: data, transformToText: mutate, isPending };
}
