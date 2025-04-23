import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavouriteContext = createContext();

export function FavouriteProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const loadFavourites = async () => {
      const json = await AsyncStorage.getItem('favourites');
      if (json) setFavourites(JSON.parse(json));
    };
    loadFavourites();
  }, []);

  const toggleFavourite = async (videoId) => {
    const isFav = favourites.includes(videoId);
    const updated = isFav
      ? favourites.filter((id) => id !== videoId)
      : [...favourites, videoId];
    setFavourites(updated);
    await AsyncStorage.setItem('favourites', JSON.stringify(updated));
  };

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
}
