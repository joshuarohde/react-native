import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { DarkModeContext } from '../../../components/DarkModeContext';
import { UserNameContext } from '../../../components/UserNameContext';
import videos from '../../../components/VideoStorage';


export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { darkMode } = useContext(DarkModeContext);
  const { userName } = useContext(UserNameContext); 

  const handleProjectPress = (id) => {
    navigation.navigate('/project', { id });
  };

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
    <Text style={[styles.title, darkMode && styles.darkText]}>
      Welcome {userName?.trim() || 'Stranger'} to
    </Text>
      <Text style={[styles.brand, darkMode && styles.darkText]}>Rohde Creations +</Text>

      <Text style={[styles.sectionHeader, darkMode && styles.darkText]}>New to RC+</Text>
      <View style={{ marginVertical: 16 }}>
                                                                                                          {videos.map((video) => (
                                                                                                      <TouchableOpacity
                                                                                                        key={video.id}
                                                                                                        onPress={() =>
                                                                                                          router.push({
                                                                                                            pathname: '../../video',
                                                                                                            params: {
                                                                                                              title: video.title,
                                                                                                              videoId: video.videoId,
                                                                                                              description: video.description,
                                                                                                            },
                                                                                                          })
                                                                                                        }
                                                                                                        style={styles.projectCard}
                                                                                                      >
                                                                                                        <Image source={{ uri: video.thumbnail }} style={styles.projectImage} />
                                                                                                        <Text
                                                                                                          style={[
                                                                                                            styles.projectTitle,
                                                                                                            styles.leftAlignedText,
                                                                                                            darkMode && styles.darkText,
                                                                                                          ]}
                                                                                                        >
                                                                                                          {video.title}
                                                                                                        </Text>
                                                                                                      </TouchableOpacity>
                                                                                                    ))}
      </View>

      <View style={styles.projectRow}>
        <TouchableOpacity style={styles.projectCard} onPress={() => handleProjectPress(1)}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.projectImage} />
          <Text style={[styles.projectTitle, darkMode && styles.darkText]}>
            Interactive Interview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.projectCard} onPress={() => handleProjectPress(2)}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.projectImage} />
          <Text style={[styles.projectTitle, darkMode && styles.darkText]}>
            A For Anniversary
          </Text>
        </TouchableOpacity>
      </View>

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
  projectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  projectCard: {
    flex: 1,
    alignItems: 'center',
  },
  projectImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  leftAlignedText: {
    marginTop: 4,
    fontWeight: '600',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  projectTitle: {
    marginTop: 4,
    fontWeight: '600',
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
});
