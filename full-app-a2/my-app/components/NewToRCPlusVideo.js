import React from 'react';
import { View, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function NewToRCPlusVideo() {
  return (
    <View style={styles.wrapper}>
      <YoutubePlayer
        height={'100%'}
        width={'100%'}
        play={false}
        videoId={'6Sfb-WU0Ir8'}
        webViewStyle={styles.video}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
  },
  video: {
    flex: 1,
    borderRadius: 10,
  }
});
