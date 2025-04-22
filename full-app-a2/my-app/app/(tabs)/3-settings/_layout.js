import { Stack } from 'expo-router';

export default function ContentLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Make sure it's OFF here too
      }}
    />
  );
}