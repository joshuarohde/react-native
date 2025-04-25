import React, { useContext } from 'react';
import { Stack, Tabs } from 'expo-router';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DarkModeProvider, DarkModeContext } from '../components/DarkModeContext';
import { UserNameProvider } from '../components/UserNameContext';
import { FavouriteProvider } from '../components/FavouriteContext';

// Renders the base layout for stack navigation
function LayoutWrapper() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={darkMode ? '#121212' : '#ffffff'}
      />
      <Stack>
  {/* Main app layout */}
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="video" options={{ presentation: 'card', headerShown: false }} />
  <Stack.Screen name="project" options={{ presentation: 'card', headerShown: false }} />

</Stack>

    </View>
  );
}

// This is used for your tabbed layout
function TabsWithDarkMode() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkMode ? '#121212' : '#ffffff',
          borderTopColor: darkMode ? '#222' : '#ccc',
        },
        tabBarActiveTintColor: darkMode ? '#ffffff' : '#000000',
        tabBarInactiveTintColor: '#888888',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === '1-home') iconName = 'home';
          else if (route.name === '2-content') iconName = 'albums';
          else if (route.name === '3-search') iconName = 'search';
          else if (route.name === '4-settings') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="1-home" options={{ title: 'Home' }} />
      <Tabs.Screen name="2-content" options={{ title: 'Content' }} />
      <Tabs.Screen name="3-search" options={{ title: 'Search' }} />
      <Tabs.Screen name="4-settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}

// This is the layout used by expo-router depending on routing depth
export default function RootLayout() {
  return (
    <DarkModeProvider>
      <UserNameProvider>
        <FavouriteProvider>
          <LayoutWrapper />
        </FavouriteProvider>
      </UserNameProvider>
    </DarkModeProvider>
  );
}

// Optional: If you render your tabs via `app/(tabs)/_layout.js`, export this
export function TabsLayout() {
  return (
    <DarkModeProvider>
      <UserNameProvider>
        <FavouriteProvider>
          <TabsWithDarkMode />
        </FavouriteProvider>
      </UserNameProvider>
    </DarkModeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dark: {
    backgroundColor: '#121212',
  },
  light: {
    backgroundColor: '#ffffff',
  },
});
