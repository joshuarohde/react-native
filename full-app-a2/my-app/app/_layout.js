import { Stack } from 'expo-router';
import { View, StatusBar, StyleSheet } from 'react-native';
import { DarkModeProvider, DarkModeContext } from '../components/DarkModeContext';
import { useContext } from 'react';

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
      <LayoutWrapper />
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
