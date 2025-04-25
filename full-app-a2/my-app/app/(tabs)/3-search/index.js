import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { DarkModeContext } from '../../../components/DarkModeContext';
import videos from '../../../components/VideoStorage';

export default function SearchScreen() {
  const { darkMode } = useContext(DarkModeContext);
  const router = useRouter();
  const [query, setQuery] = useState('');

  const normalize = (str) => str?.toLowerCase() ?? '';

  const getMatchScore = (video, query) => {
    if (!query) return 0;

    const q = normalize(query);
    const title = normalize(video.title);
    const credits = typeof video.credits === 'string' ? normalize(video.credits) : '';

    const titleIndex = title.indexOf(q);
    const creditsIndex = credits.indexOf(q);

    let score = 0;
    if (titleIndex !== -1) score += 100 - titleIndex; // earlier = stronger match
    if (creditsIndex !== -1) score += 50 - creditsIndex;

    return score;
  };

  const sortedVideos = [...videos].sort((a, b) => {
    const aScore = getMatchScore(a, query);
    const bScore = getMatchScore(b, query);
    return bScore - aScore;
  });

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <TextInput
        style={[styles.searchInput, darkMode && styles.inputDark]}
        placeholder="Search by name or credits..."
        placeholderTextColor={darkMode ? '#888' : '#aaa'}
        value={query}
        onChangeText={setQuery}
      />

      <ScrollView>
        {sortedVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            onPress={() => router.push(`/video/${video.id}`)}
            style={[styles.videoCard, darkMode && styles.videoCardDark]}
          >
            <Text style={[styles.title, darkMode && styles.textDark]}>
              {video.title}
            </Text>
            <Text style={[styles.credits, darkMode && styles.textDark]}>
              {video.credits ?? 'No credits'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: '#000',
  },
  inputDark: {
    borderColor: '#555',
    backgroundColor: '#1f1f1f',
    color: '#fff',
  },
  videoCard: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  videoCardDark: {
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  credits: {
    fontSize: 14,
    color: '#666',
  },
  textDark: {
    color: '#ddd',
  },
});
