// app/(tabs)/profile/index.js
import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function ProfileIndex() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Welcome to your Profile</Text>
      <Button title="Go to Settings" onPress={() => router.push("/(tabs)/profile/settings")} />
    </View>
  );
}
