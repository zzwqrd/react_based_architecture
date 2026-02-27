/**
 * LoadingBtn.js
 * Mirrors Flutter's LoadingBtn widget (loading_app.dart).
 *
 * Uses ActivityIndicator by default.
 * Replace <ActivityIndicator> with <LottieView> if lottie-react-native is installed:
 *   import LottieView from 'lottie-react-native';
 *   <LottieView source={require('../../assets/lottie/loading_a.json')} autoPlay loop style={{ width: 40, height: 40 }} />
 */
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../core/themes/colors';

/**
 * LoadingBtn — the spinner widget shown INSIDE the button while loading.
 * Mirrors Flutter's `LoadingBtn` class.
 */
export const LoadingBtn = ({ color, size = 24 }) => (
  <View style={styles.center}>
    <ActivityIndicator color={color || colors.white} size={size < 30 ? 'small' : 'large'} />
  </View>
);

/**
 * LoadingAppWidget — full-screen or sized loading indicator.
 * Mirrors Flutter's `LoadingApp` widget.
 */
export const LoadingAppWidget = ({ height = 90 }) => (
  <View style={[styles.center, { height }]}>
    <ActivityIndicator color={colors.primary} size="large" />
  </View>
);

const styles = StyleSheet.create({
  center: {
    width: scale(40),
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { LoadingBtn, LoadingAppWidget } from './components/button_animation/LoadingBtn';

const MyScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LoadingAppWidget />
    </View>
  );
};
*/
