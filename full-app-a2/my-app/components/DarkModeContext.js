import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadMode = async () => {
      const stored = await AsyncStorage.getItem('darkMode');
      if (stored === 'true' || stored === 'false') {
        setDarkMode(stored === 'true');
      }
    };
    loadMode();
  }, []);

  const toggleDarkMode = async (value) => {
    setDarkMode(value);
    await AsyncStorage.setItem('darkMode', value.toString());
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
