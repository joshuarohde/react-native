import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="1-home" options={{ title: 'Home' }} />
      <Tabs.Screen name="2-content" options={{ title: 'Content' }} />
      <Tabs.Screen name="3-settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
