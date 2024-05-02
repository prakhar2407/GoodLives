import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {FONTS_FAMILY, FONTS_SIZE} from '../utils/fonts';
import Animated, {SlideInLeft, SlideOutRight} from 'react-native-reanimated';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils/constants';
import {COLORS} from '../utils/colors';

export default function Toast() {
  const toast = useSelector((state: any) => state.toastReducer.data);

  if (!toast) {
    return null;
  }

  return (
    <Animated.View
      entering={SlideInLeft}
      exiting={SlideOutRight}
      style={[
        styles.toastContainer,
        {backgroundColor: toast.isError ? COLORS.Red : COLORS.Green},
      ]}>
      <Text style={styles.toastContainerText}>
        {toast?.toastMessage || 'Something Went Wrong'}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    width: WINDOW_WIDTH * 0.8,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: WINDOW_HEIGHT * 0.02,
    borderRadius: 8,
  },
  toastContainerText: {
    fontFamily: FONTS_FAMILY.Poppins_SemiBold,
    fontSize: FONTS_SIZE.Medium,
    color: COLORS.White,
  },
});
