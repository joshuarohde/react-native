// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { DarkModeContext } from '../../components/DarkModeContext';

export default function TabsLayout() {
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
