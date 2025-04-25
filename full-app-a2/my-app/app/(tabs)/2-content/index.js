import React, { useContext, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { DarkModeContext } from '../../../components/DarkModeContext';
import { FavouriteContext } from '../../../components/FavouriteContext';
import videos from '../../../components/VideoStorage';
import { collections } from '../../../components/CollectionStorage';
import { AntDesign } from '@expo/vector-icons';

export default function ContentScreen() {
  const { darkMode } = useContext(DarkModeContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const router = useRouter();

  const [sortOption, setSortOption] = useState('default');

  const getSortedVideos = () => {
    let sorted = [...videos];
    switch (sortOption) {
      case 'a-z':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case 'oldest':
        return sorted;
      case 'newest':
        return sorted.reverse();
      case 'liked':
        return sorted.filter((v) => favourites.includes(v.id));
      default:
        return sorted;
    }
  };

  const sortedVideos = getSortedVideos();

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={[styles.brand, { color: darkMode ? '#ff4c4c' : '#000' }]}>Rohde Creations +</Text>
      <Text style={[styles.header, darkMode && styles.darkText]}>Project Collections</Text>

      <View style={styles.row}>
        {collections.map((collection) => (
          <TouchableOpacity
            key={collection.id}
            style={[styles.collectionButton, darkMode && styles.darkButton]}
            onPress={() => router.push(`/project?collectionId=${collection.id}`)}
          >
            <Image
              source={{ uri: collection.mainVideo.thumbnail }}
              style={styles.collectionBackground}
              resizeMode="cover"
            />
            <View style={styles.collectionOverlay}>
              <Text style={[styles.buttonText, darkMode && styles.darkText]}>{collection.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filterHeader}>
        <Text style={[styles.header, darkMode && styles.darkText]}>All Videos</Text>
        <View style={[styles.pickerWrapper, darkMode && styles.darkPickerWrapper]}>
        <Picker
  selectedValue={sortOption}
  onValueChange={(itemValue) => setSortOption(itemValue)}
  dropdownIconColor={darkMode ? '#fff' : '#000'}
  style={[styles.picker, darkMode ? styles.darkPicker : styles.lightPicker]} 
>
    <Picker.Item label="Default" value="default" />
    <Picker.Item label="Title (A-Z)" value="a-z" />
    <Picker.Item label="Title (Z-A)" value="z-a" />
    <Picker.Item label="Newest → Oldest" value="newest" />
    <Picker.Item label="Oldest → Newest" value="oldest" />
    <Picker.Item label="Liked Only ❤️" value="liked" />
  </Picker>
</View>


      </View>

      <View style={styles.projectRow}>
        {sortedVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            onPress={() =>
              router.push({
                pathname: '../../video',
                params: {
                  title: video.title,
                  videoId: video.id,
                  description: video.description,
                },
              })
            }
            style={styles.projectCard}
          >
            <View style={styles.imageWrapper}>
              <Image source={{ uri: video.thumbnail }} style={styles.projectImage} resizeMode="cover" />
            </View>
            <View style={styles.titleRow}>
              <Text style={[styles.projectTitle, darkMode && styles.darkText]}>{video.title}</Text>
              <TouchableOpacity onPress={() => toggleFavourite(video.id)}>
                <AntDesign
                  name={favourites.includes(video.id) ? 'heart' : 'hearto'}
                  size={14}
                  color={favourites.includes(video.id) ? 'red' : 'gray'}
                  style={{ marginLeft: 6, marginTop: 4.5 }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  darkContainer: { backgroundColor: '#121212' },
  brand: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  header: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
  darkText: { color: '#fff' },
  projectRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  projectCard: { width: '48%', marginBottom: 16 },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  projectImage: {
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-20%',
    left: '-18%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 4,
    alignSelf: 'stretch',
  },
  projectTitle: { fontWeight: '600', fontSize: 14, flexShrink: 1 },
  collectionButton: {
    width: '48%',
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '150%',
    height: '150%',
    opacity: 0.3,
    position: 'absolute',
    left: '-40',
  },
  collectionOverlay: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  buttonText: { fontSize: 14, fontWeight: '600', color: '#000' },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 2,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    width: 170,
    height: 50,
    fontSize: 14,
    paddingVertical: 0,
    marginTop: -4,
  },
  lightPicker: {
    backgroundColor: '#eee',
    color: '#000',
  },
  darkPicker: {
    backgroundColor: '#333',
    color: '#fff',
  },
  
  pickerWrapper: {
    width: 170,
    height: 40,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
  darkPickerWrapper: {
    backgroundColor: '#333',
  },
  
  
  
});
