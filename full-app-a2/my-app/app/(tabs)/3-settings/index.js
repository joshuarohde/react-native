import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkModeContext } from '../../../components/DarkModeContext';

function SettingsScreen() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const name = await AsyncStorage.getItem('userName');
      if (name) setUserName(name);
    };
    loadData();
  }, []);

  return (
    <ScrollView
      style={[darkMode && styles.darkContainer]}
      contentContainerStyle={[styles.container, darkMode && styles.darkContainer]}
    >
      <Text style={[styles.brand, darkMode && styles.darkText]}>Rohde creations +</Text>
      <Text style={[styles.header, darkMode && styles.darkText]}>Settings</Text>

      <Text style={[styles.label, darkMode && styles.darkText]}>Name</Text>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Your name"
        placeholderTextColor={darkMode ? '#ccc' : '#888'}
        value={userName}
        onChangeText={text => {
          setUserName(text);
          AsyncStorage.setItem('userName', text);
        }}
      />

      <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
      <View style={{ alignItems: 'flex-start' }}>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      <Text style={[styles.thankYou, darkMode && styles.darkSubtle]}>
        Insert personal thank-you from Joshua Rohde here for choosing to use the app.
      </Text>
    </ScrollView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  brand: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  thankYou: {
    marginTop: 24,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  darkText: {
    color: '#fff',
  },
  darkSubtle: {
    color: '#aaa',
  },
});
