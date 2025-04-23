import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
import { FavouriteContext } from '../components/FavouriteContext';

export default function VideoScreen() {
  const { videoId, title, description } = useLocalSearchParams();
  const { favourites, toggleFavourite } = useContext(FavouriteContext);

  const isFavourited = favourites.includes(videoId);

  const credits = [
    'Directed by Joshua Rohde',
    'Camera by Rene C.',
    'Written by Josh R.',
    'Special Thanks to Sage Funeral Home',
  ];

  const directorNote = `This piece represents more than just a school project — it's a love letter to storytelling. Thank you for watching and supporting my vision.`;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '',
          headerRight: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginRight: 10 }}>
              Rohde Creations +
            </Text>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
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

        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.descriptionBox}>{description}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Credits</Text>
          {credits.map((credit, index) => (
            <Text key={index} style={styles.sectionText}>{credit}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Director's Note</Text>
          <Text style={styles.sectionText}>{directorNote}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
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
});
