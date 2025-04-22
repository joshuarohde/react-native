import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DarkModeContext } from '../../../components/DarkModeContext';

export default function ContentScreen() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <ScrollView
      style={[styles.container, darkMode && styles.darkContainer]}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={[styles.brand, darkMode && styles.darkText]}>Rohde creations +</Text>
      <Text style={[styles.header, darkMode && styles.darkText]}>Project Collections</Text>
  
      {[0, 1, 2, 3].map((_, rowIdx) => (
        <View key={`collection-row-${rowIdx}`} style={styles.row}>
          {[0, 1].map((_, colIdx) => (
            <View
              key={`collection-btn-${rowIdx}-${colIdx}`}
              style={[styles.collectionButton, darkMode && styles.darkButton]}
            >
              <Text style={[styles.buttonText, darkMode && styles.darkText]}>Project Name</Text>
            </View>
          ))}
        </View>
      ))}
  
      <Text style={[styles.header, darkMode && styles.darkText]}>All Videos</Text>
  
      <View style={styles.projectRow}>
        {[0, 1, 2, 3, 4, 5].map((_, index) => (
          <View key={`project-${index}`} style={styles.projectCard}>
            <View style={styles.projectImage} />
            <Text style={[styles.projectTitle, darkMode && styles.darkText]}>Project Name</Text>
          </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  collectionButton: {
    flex: 1,
    backgroundColor: '#eee',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  darkButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  videoCard: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  videoThumbnail: {
    backgroundColor: '#ccc',
    height: 100,
    borderRadius: 8,
  },
  videoTitle: {
    marginTop: 8,
    fontSize: 14,
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
    fontSize: 14,
    textAlign: 'center',
  },
  
});
