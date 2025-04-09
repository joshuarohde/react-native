import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ tabBarItemStyle: { display: "none" } }} />
      <Tabs.Screen name="(tabs)/home" options={{ title: "Home" }} />
      <Tabs.Screen name="(tabs)/profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}