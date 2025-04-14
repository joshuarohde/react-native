// app/(tabs)/notes/details.js
import { View, Text } from "react-native";

export default function NoteDetails() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>Here are the note details!</Text>
    </View>
  );
}

export const options = {
  title: "Note Details", // Shows in the header
};
