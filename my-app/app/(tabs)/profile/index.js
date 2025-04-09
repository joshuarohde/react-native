import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      {/* Navigate to Details screen inside the same tab */}
      <Link href="/profile/edit">Go to edit</Link>
    </View>
  );
}