import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Stack } from 'expo-router';
import { DarkModeContext } from '../../components/DarkModeContext';

export default function NameModal() {
  const [name, setName] = useState('');
  const router = useRouter();
  const { darkMode } = useContext(DarkModeContext);

  const saveName = async () => {
    if (!name.trim()) return;
    await AsyncStorage.setItem('userName', name.trim());
    router.replace('/(tabs)/1-home');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.container, darkMode && styles.darkContainer]}
      >
        <View>
          <Text style={[styles.heading, darkMode && styles.darkText]}>Hello!</Text>
          <Text style={[styles.text, darkMode && styles.darkText]}>
            Welcome to Rohde Creations+. Please enter your name to get started:
          </Text>
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor={darkMode ? '#aaa' : '#888'}
            value={name}
            onChangeText={setName}
            style={[styles.input, darkMode && styles.inputDark]}
          />
          <Button
            title="Continue"
            onPress={saveName}
            disabled={!name.trim()}
            color={darkMode ? '#ff4c4c' : undefined}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  darkText: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  inputDark: {
    backgroundColor: '#1e1e1e',
    borderColor: '#444',
    color: '#fff',
  },
});
