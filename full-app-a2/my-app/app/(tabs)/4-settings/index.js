import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { DarkModeContext } from '../../../components/DarkModeContext';
import { UserNameContext } from '../../../components/UserNameContext';

function SettingsScreen() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { userName, updateUserName } = useContext(UserNameContext);

  return (
    <ScrollView
      style={[darkMode && styles.darkContainer]}
      contentContainerStyle={[styles.container, darkMode && styles.darkContainer]}
    >
      <Text style={[styles.brand, { color: darkMode ? '#ff4c4c' : '#000' }]}>
        Rohde Creations +
      </Text>

      <Text style={[styles.header, darkMode && styles.darkText]}>Settings</Text>

      <Text style={[styles.label, darkMode && styles.darkText]}>Name</Text>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Your name"
        placeholderTextColor={darkMode ? '#ccc' : '#888'}
        value={userName}
        onChangeText={updateUserName}
      />

      <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
      <View style={{ alignItems: 'flex-start' }}>
        <Switch
          value={darkMode}
          onValueChange={(value) => toggleDarkMode(value)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      <Text style={[styles.thankYou, darkMode && styles.darkSubtle]}>
        Hey there,{"\n\n"}
        I just wanted to take a moment to personally thank you for choosing to use this app. 
        It means a lot to me that you're here, exploring the work I've poured my heart into. 
        Every project, video, and design in this space represents countless hours of creativity, 
        learning, and passion. So whether you're just browsing or diving deep—thank you. Seriously.{"\n\n"}
        Your support keeps me inspired to keep creating, keep experimenting, and keep pushing the 
        boundaries of what's possible. I hope you find something here that sticks with you.{"\n\n"}
        With appreciation,{"\n"}
        Joshua Rohde
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
