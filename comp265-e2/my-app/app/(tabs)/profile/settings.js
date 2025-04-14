// app/(tabs)/profile/settings.js
import { View, Text } from "react-native";

export default function ProfileSettings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>Settings screen for your profile</Text>
    </View>
  );
}

export const options = {
  title: "Settings", // Header title
};
