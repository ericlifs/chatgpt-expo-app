import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';

const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: '/(drawer)',
};

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </RootSiblingParent>
  );
}
