import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function VideoScreen() {
  const { videoId, title, description } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: '', // hide default title
          headerRight: () => (
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginRight: 10 }}>
              Rohde Creations +
            </Text>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>

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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
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
});
