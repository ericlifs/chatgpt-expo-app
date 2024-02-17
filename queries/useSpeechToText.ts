import { useMutation } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';

import { storage } from '~/storage/mmkv';

const speechToText = async ({ audioUri }: { audioUri: string }) => {
  const apiKey = storage.getString('apiKey');

  if (!apiKey) {
    throw new Error('No API Key configured');
  }

  const { body } = await FileSystem.uploadAsync(
    'https://api.openai.com/v1/audio/transcriptions',
    audioUri,
    {
      fieldName: 'file',
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      parameters: {
        model: 'whisper-1',
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return JSON.parse(body);
};

export default function useSpeechToText() {
  const { data, isPending, mutate } = useMutation({
    mutationFn: speechToText,
  });

  return { transformation: data, transformToText: mutate, isPending };
}
