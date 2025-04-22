// app/(modals)/name.js
import { View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function NameModal() {
  const [name, setName] = useState('');
  const router = useRouter();

  const saveName = async () => {
    await AsyncStorage.setItem('userName', name);
    router.replace('/(tabs)/1-home'); // Navigate after saving
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Hello!</Text>
      <Text>Welcome to Rohde Creations+! Please provide your name to get started</Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />
      <Button title="Continue" onPress={saveName} />
    </View>
  );
}
