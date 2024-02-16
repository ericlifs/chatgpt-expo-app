import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer initialRouteName="chat">
            <Drawer.Screen name="chat" options={{ title: 'Chat' }} />
            <Drawer.Screen name="whisper" options={{ title: 'Voice to text' }} />
            <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
          </Drawer>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </RootSiblingParent>
  );
}
