import '../global.css';

import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer initialRouteName="chat">
          <Drawer.Screen name="chat" options={{ headerShown: true, title: 'Chat' }} />
          <Drawer.Screen name="whisper" options={{ headerShown: true, title: 'Voice to text' }} />
          <Drawer.Screen name="settings" options={{ headerShown: true, title: 'Settings' }} />
        </Drawer>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
}
