import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserNameContext = createContext();

export function UserNameProvider({ children }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) setUserName(storedName);
    };
    loadName();
  }, []);

  const updateUserName = async (newName) => {
    setUserName(newName);
    await AsyncStorage.setItem('userName', newName);
  };

  return (
    <UserNameContext.Provider value={{ userName, updateUserName }}>
      {children}
    </UserNameContext.Provider>
  );
}
