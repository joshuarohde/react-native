import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewToRCPlusVideo from '../../../components/NewToRCPlusVideo';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem('userName');
      if (name) setUserName(name);
    };
    getName();
  }, []);

  const handleProjectPress = (id) => {
    navigation.navigate('/project', { id });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome {userName || 'NAME'} to</Text>
      <Text style={styles.brand}>Rohde Creations +</Text>

      <Text style={styles.sectionHeader}>New to RC+</Text>
      <View style={{ marginVertical: 16 }}>
        <NewToRCPlusVideo />
      </View>

      <Text style={styles.sectionHeader}>Projects</Text>
      <View style={styles.projectRow}>
        <TouchableOpacity style={styles.projectCard} onPress={() => handleProjectPress(1)}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.projectImage} />
          <Text style={styles.projectTitle}>Interactive Intervew</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.projectCard} onPress={() => handleProjectPress(2)}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.projectImage} />
          <Text style={styles.projectTitle}>A For Anniversay</Text>
        </TouchableOpacity>
        </View>

<Text style={styles.sectionHeader}>Announcements</Text>
<View style={styles.announcementCard}>
  <Text style={styles.announcementText}>🎉 New features coming soon! Stay tuned. Ro-Gang!</Text>
</View>
<View style={styles.announcementCard}>
  <Text style={styles.announcementText}>
    With great joy, I open my new app. Rohde Creations+! This isn't just another streaming platform — it's a journey into my creative mind.
  </Text>
</View>

{/* Spacer to give breathing room before nav */}
<View style={{ height: 80 }} />

</ScrollView>


  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
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
    aspectRatio: 1,
    backgroundColor: '#ccc',
    borderRadius: 10,
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
  announcementText: {
    fontSize: 14,
  },
});
