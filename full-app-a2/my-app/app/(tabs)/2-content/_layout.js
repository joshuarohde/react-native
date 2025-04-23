import { Stack, useSegments } from 'expo-router';

export default function ContentLayout() {
  const segments = useSegments();

  const isVideoScreen = segments[2] === 'video'; 

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
