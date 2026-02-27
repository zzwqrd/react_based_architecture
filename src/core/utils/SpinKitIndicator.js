import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

/**
 * SpinKitIndicator.js
 * Mirrors Flutter's SpinKitIndicator.
 */

export const SpinKitType = {
  wave: 'wave',
  circle: 'circle',
};

const SpinKitIndicator = ({ type = SpinKitType.wave, color = '#F4511E', size = 'large' }) => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpinKitIndicator;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import SpinKitIndicator, { SpinKitType } from './core/utils/SpinKitIndicator';

const LoadingScreen = () => {
  return (
    <SpinKitIndicator 
      type={SpinKitType.circle} 
      color="#00A585" 
      size="large" 
    />
  );
};
*/
