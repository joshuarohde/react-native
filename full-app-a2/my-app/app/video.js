import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';

import { FavouriteContext } from '../components/FavouriteContext';
import { DarkModeContext } from '../components/DarkModeContext';
import videos from '../components/VideoStorage';

export default function VideoScreen() {
  const { videoId } = useLocalSearchParams();
  const { favourites, toggleFavourite } = useContext(FavouriteContext);
  const { darkMode } = useContext(DarkModeContext);

  const video = videos.find((v) => v.id === videoId);

  if (!video) {
    return (
      <View style={[styles.container, darkMode && styles.darkContainer]}>
        <Text style={[styles.title, darkMode && styles.darkText]}>
          Video not found.
        </Text>
      </View>
    );
  }

  const { title, description, credits, directorNote } = video;
  const isFavourited = favourites.includes(videoId);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: darkMode ? '#121212' : '#fff',
          },
          headerTintColor: darkMode ? '#fff' : '#000',
          headerRight: () => (
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                marginRight: 10,
                color: darkMode ? '#ff4c4c' : '#000',
              }}
            >
              Rohde Creations +
            </Text>
          ),
        }}
      />

<ScrollView
  style={[styles.container, darkMode && styles.darkContainer]}
  contentContainerStyle={styles.scrollContent}
>

        <View style={styles.titleRow}>
          <Text style={[styles.title, darkMode && styles.darkText]}>{title}</Text>
          <TouchableOpacity onPress={() => toggleFavourite(videoId)}>
            <Ionicons
              name={isFavourited ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavourited ? 'red' : '#888'}
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.videoWrapper}>
          <View style={styles.aspectVideoContainer}>
            <YoutubePlayer
              height={'100%'}
              width={'100%'}
              play={false}
              videoId={videoId}
              webViewStyle={{ backgroundColor: 'transparent' }}
            />
          </View>
        </View>

        <Text style={[styles.descriptionLabel, darkMode && styles.darkText]}>
          Description
        </Text>
        <Text
          style={[
            styles.descriptionBox,
            darkMode && styles.darkBox,
            darkMode && styles.darkText,
          ]}
        >
          {description}
        </Text>

        {credits && (
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, darkMode && styles.darkText]}>
              Credits
            </Text>
            {credits.map((credit, index) => (
              <Text
                key={index}
                style={[styles.sectionText, darkMode && styles.darkText]}
              >
                {credit}
              </Text>
            ))}
          </View>
        )}

        {directorNote && (
          <View style={styles.section}>
            <Text style={[styles.sectionHeader, darkMode && styles.darkText]}>
              Director&apos;s Note
            </Text>
            <Text style={[styles.sectionText, darkMode && styles.darkText]}>
              {directorNote}
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#fff',
  },
  darkBox: {
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  videoWrapper: {
    marginBottom: 16,
  },
  aspectVideoContainer: {
    aspectRatio: 16 / 9,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  descriptionBox: {
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40, // extra room to scroll below the last item
  },
  
});
