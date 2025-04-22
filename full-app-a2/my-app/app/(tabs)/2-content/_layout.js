import { Stack, useSegments } from 'expo-router';

export default function ContentLayout() {
  const segments = useSegments();

  const isVideoScreen = segments[2] === 'video'; // Assuming segments: ['(tabs)', '2-content', 'video']

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'flex',
        },
        tabBarActiveTintColor: isVideoScreen ? 'transparent' : undefined,
      }}
    />
  );
}
