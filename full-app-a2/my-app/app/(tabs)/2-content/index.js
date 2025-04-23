import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { DarkModeContext } from '../../../components/DarkModeContext';
import { FavouriteContext } from '../../../components/FavouriteContext';
import videos from '../../../components/VideoStorage';
import { AntDesign } from '@expo/vector-icons';

export default function ContentScreen() {
  const { darkMode } = useContext(DarkModeContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={[styles.brand, darkMode && styles.darkText]}>Rohde Creations +</Text>
      <Text style={[styles.header, darkMode && styles.darkText]}>All Videos</Text>

      <View style={styles.projectRow}>
        {videos.map((video) => (
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
          ><View style={styles.imageWrapper}>
            <Image source={{ uri: video.thumbnail }} style={styles.projectImage} resizeMode="cover"/>
            </View>
            <View style={styles.titleRow}>
              <Text style={[styles.projectTitle, darkMode && styles.darkText]}>
                {video.title}
              </Text>
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
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  brand: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  darkText: {
    color: '#fff',
  },
  projectRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  projectCard: {
    width: '48%',
    marginBottom: 16,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1, // Square thumbnail
    borderRadius: 10,
    overflow: 'hidden', // This is important — clips the overflow
    backgroundColor: '#ccc',
  },
  projectImage: {
    width: '140%', // intentionally oversize width
    height: '140%', // intentionally oversize height
    position: 'absolute',
    top: '-20%', // push up
    left: '-18%', // push left
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 4,
    alignSelf: 'stretch',
  },
  projectTitle: {
    fontWeight: '600',
    fontSize: 14,
    flexShrink: 1,
  },
});
