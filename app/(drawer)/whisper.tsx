import { Audio } from 'expo-av';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';
import tailshake from 'tailshake';

import useSpeechToText from '~/queries/useSpeechToText';

export default function WhisperScreen() {
  const [recording, setRecording] = useState<Audio.Recording>();
  const { transformToText, transformation, isPending } = useSpeechToText();

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
    } catch (err) {
      Toast.show('There was an issue when recording audio');
    }
  };

  const stopRecording = async () => {
    setRecording(undefined);

    if (recording) {
      await recording.stopAndUnloadAsync();
    }

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    uploadRecording();
  };

  const uploadRecording = async () => {
    const audioUri = recording?.getURI();

    if (!audioUri) {
      return;
    }

    transformToText({ audioUri });
  };

  return (
    <>
      <View className="flex-1 justify-center items-center">
        <View className="flex flex-1 justify-center items-center">
          {isPending && <ActivityIndicator />}
          {Boolean(transformation?.text) && !isPending && <Text>{transformation.text}</Text>}
        </View>

        <View className="flex flex-row justify-center w-full pb-10 pt-4 border-black border-t bg-neutral-300">
          <Pressable
            disabled={isPending}
            onPress={!recording ? startRecording : stopRecording}
            className={tailshake(
              'bg-blue-600 disabled:bg-black p-3 px-5 rounded-3xl',
              recording && '!bg-red-800'
            )}>
            <Text disabled={isPending} className="text-white text-center">
              {!recording ? 'Start recording' : 'Stop recording'}
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
