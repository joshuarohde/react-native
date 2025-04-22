// app/index.js
export const options = {
  headerShown: false,
};

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkName = async () => {
      const name = await AsyncStorage.getItem('userName');
      if (!name) {
        router.replace('/(modals)/name'); 
      } else {
        router.replace('/(tabs)/1-home');
      }
    };

    checkName();
  }, []);

  return null; // we redirect immediately so no UI here
}
