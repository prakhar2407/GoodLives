import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../utils/colors';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../utils/constants';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FastImage
        style={styles.imageStyle}
        resizeMode="contain"
        source={{
          uri: 'https://ucarecdn.com/4748640f-b537-4b9b-8896-362944eaaae3/headerbookinglogo.png',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.White,
  },
  imageStyle: {
    width: WINDOW_WIDTH * 0.4,
    height: WINDOW_HEIGHT * 0.4,
  },
});
