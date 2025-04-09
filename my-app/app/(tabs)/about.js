import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function AboutScreen() {
  // Get URL parameters
  const params = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>About Screen</Text>
      <Text>Special Parameter: {params.special}</Text>
    </View>
  );
}
