import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { DarkModeContext, DarkModeProvider } from '../../components/DarkModeContext';
import { UserNameProvider } from '../../components/UserNameContext';
import { useSegments } from 'expo-router';

function TabsWithDarkMode() {
  const { darkMode } = useContext(DarkModeContext);
  const segments = useSegments();

  const isInVideo = segments.includes('video');

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkMode ? '#121212' : '#ffffff',
          borderTopColor: darkMode ? '#222' : '#ccc',
        },
        // Unselect tab if viewing the video screen
        tabBarActiveTintColor: isInVideo && route.name === '2-content' ? 'transparent' :
                              darkMode ? '#ffffff' : '#000000',
        tabBarInactiveTintColor: '#888888',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === '1-home') iconName = 'home';
          else if (route.name === '2-content') iconName = 'albums';
          else if (route.name === '3-settings') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="1-home" options={{ title: 'Home' }} />

      <Tabs.Screen
        name="2-content"
        options={{
          title: 'Content',
          href: '/(tabs)/2-content', // always reset to index when clicked
        }}
      />

      <Tabs.Screen name="3-settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

export default function TabsLayout() {
  return (
    <DarkModeProvider>
      <UserNameProvider>
        <TabsWithDarkMode />
      </UserNameProvider>
    </DarkModeProvider>
  );
}
