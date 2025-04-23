import React, { useContext } from 'react';
import { Stack } from 'expo-router';
import { View, StatusBar, StyleSheet } from 'react-native';
import { DarkModeProvider, DarkModeContext } from '../components/DarkModeContext';
import { UserNameProvider } from '../components/UserNameContext';
import { FavouriteProvider } from '../components/FavouriteContext';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

function LayoutWrapper() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={darkMode ? '#121212' : '#ffffff'}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

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

// Optional: if you use this file also for your tabs layout
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
        tabBarInactiveTintColor: darkMode ? '#888888' : '#888888',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === '1-home') iconName = 'home';
          else if (route.name === '2-content') iconName = 'albums';
          else if (route.name === '3-settings') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
}

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
