import Drawer from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer initialRouteName="/index">
      <Drawer.Screen name="index" options={{ title: 'Chat', drawerLabel: 'Chat' }} />
      <Drawer.Screen name="whisper" options={{ title: 'Voice to text' }} />
      <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
    </Drawer>
  );
}
