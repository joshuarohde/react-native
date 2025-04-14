// app/(tabs)/notes/index.js
import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function NotesIndex() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>This is the Notes tab.</Text>
      <Button title="Go to Note Details" onPress={() => router.push("/(tabs)/notes/details")} />
    </View>
  );
}
