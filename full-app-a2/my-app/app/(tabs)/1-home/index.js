import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { DarkModeContext } from '../../../components/DarkModeContext';
import { UserNameContext } from '../../../components/UserNameContext';
import { FavouriteContext } from '../../../components/FavouriteContext';
import { homeVideoLayout } from '../../../components/HomeVideoStorage';

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { darkMode } = useContext(DarkModeContext);
  const { userName } = useContext(UserNameContext);
  const { favourites, toggleFavourite } = useContext(FavouriteContext);

  const mainVideo = homeVideoLayout.main;
  const featuredVideos = homeVideoLayout.featured;

  const handlePress = (video) => {
    router.push({
      pathname: '../../video',
      params: {
        videoId: video.id,
        title: video.title,
        description: video.description,
      },
    });
  };

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>
        Welcome {userName?.trim() || 'Stranger'} to
      </Text>
      <Text style={[styles.brand, { color: darkMode ? '#ff4c4c' : '#000' }]}>
        Rohde Creations +
      </Text>

      <Text style={[styles.sectionHeader, darkMode && styles.darkText]}>New to RC+</Text>

      {/* MAIN FEATURED VIDEO */}
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity
          key={mainVideo.id}
          onPress={() => handlePress(mainVideo)}
          style={styles.projectCard}
        >
          <Image source={{ uri: mainVideo.thumbnail }} style={styles.wideImage} />
          <View style={styles.titleRow}>
            <Text style={[styles.projectTitle, styles.leftAlignedText, darkMode && styles.darkText]}>
              {mainVideo.title}
            </Text>
            <TouchableOpacity onPress={() => toggleFavourite(mainVideo.id)}>
              <AntDesign
                name={favourites.includes(mainVideo.id) ? 'heart' : 'hearto'}
                size={14}
                color={favourites.includes(mainVideo.id) ? 'red' : 'gray'}
                style={{ marginLeft: 6, marginTop: 4.5 }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      {/* FEATURED GRID */}
      <View style={styles.projectRow}>
        {featuredVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            onPress={() => handlePress(video)}
            style={styles.squareCard}
          >
            <View style={styles.imageWrapper}>
              <Image source={{ uri: video.thumbnail }} style={styles.squareImage} resizeMode="cover" />
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

      {/* Announcements */}
      <Text style={[styles.sectionHeader, darkMode && styles.darkText]}>Announcements</Text>
      <View style={[styles.announcementCard, darkMode && styles.darkCard]}>
        <Text style={[styles.announcementText, darkMode && styles.darkText]}>
          🎉 New features coming soon! Stay tuned. Ro-Gang!
        </Text>
      </View>
      <View style={[styles.announcementCard, darkMode && styles.darkCard]}>
        <Text style={[styles.announcementText, darkMode && styles.darkText]}>
          With great joy, I open my new app. Rohde Creations+! This isn't just another streaming
          platform — it's a journey into my creative mind.
        </Text>
      </View>

      <View style={{ height: 80 }} />
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
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  brand: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
  },
  projectCard: {
    flex: 1,
    alignItems: 'center',
  },
  wideImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  squareCard: {
    width: '48%',
    marginBottom: 12,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  squareImage: {
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-20%',
    left: '-18%',
  },
  projectTitle: {
    fontWeight: '600',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 4,
    alignSelf: 'stretch',
  },
  leftAlignedText: {
    textAlign: 'left',
    flexShrink: 1,
  },
  announcementCard: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
  },
  announcementText: {
    fontSize: 14,
  },
  darkText: {
    color: '#ffffff',
  },
  projectRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
});
