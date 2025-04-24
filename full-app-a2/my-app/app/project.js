import React, { useContext } from 'react';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ScrollView, Text, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { collections } from '../components/CollectionStorage';
import { DarkModeContext } from '../components/DarkModeContext';

export default function ProjectScreen() {
  const { collectionId } = useLocalSearchParams();
  const router = useRouter();
  const { darkMode } = useContext(DarkModeContext);

  const collection = collections.find(c => c.id === collectionId);

  if (!collection) {
    return (
      <View style={[styles.centered, darkMode && styles.darkContainer]}>
        <Text style={darkMode && styles.darkText}>Collection not found.</Text>
      </View>
    );
  }

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
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
              marginRight: 10,
              color: darkMode ? '#ff4c4c' : '#000', // Red in dark mode, black in light
            }}>
              Rohde Creations +
            </Text>
          )
          ,
        }}
      />
      <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
        <Text style={[styles.title, darkMode && styles.darkText]}>{collection.title}</Text>
        <Text style={[styles.about, darkMode && styles.darkText]}>{collection.about}</Text>

        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/video',
              params: {
                title: collection.mainVideo.title,
                videoId: collection.mainVideo.id,
                description: collection.mainVideo.description,
              },
            })
          }
          style={styles.featuredWrapper}
        >
          <Image
            source={{ uri: collection.mainVideo.thumbnail }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
          <Text style={[styles.videoTitle, darkMode && styles.darkText]}>{collection.mainVideo.title}</Text>
        </TouchableOpacity>

        <Text style={[styles.subHeader, darkMode && styles.darkText]}>Collection Videos</Text>
        <View style={styles.grid}>
          {collection.subVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              onPress={() =>
                router.push({
                  pathname: '/video',
                  params: {
                    title: video.title,
                    videoId: video.id,
                    description: video.description,
                  },
                })
              }
              style={styles.videoCard}
            >
              <Image source={{ uri: video.thumbnail }} style={styles.videoThumb} />
              <Text style={darkMode && styles.darkText}>{video.title}</Text>
            </TouchableOpacity>
          ))}
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
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  about: {
    fontSize: 16,
    marginBottom: 16,
  },
  featuredWrapper: {
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: 12,
    backgroundColor: '#ccc',
  },
  videoTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  videoCard: {
    width: '48%',
    marginBottom: 16,
  },
  videoThumb: {
    width: '100%',
    height: 100,
    borderRadius: 6,
  },
});
