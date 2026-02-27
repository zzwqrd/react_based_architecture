import React from 'react';
import { View, StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';

/**
 * Divider component mirroring Flutter's DeviderWidget.
 * A horizontal line used to separate content.
 */
const Divider = ({ color, height, style }) => {
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color || colors.border || '#E0E0E0',
          height: height || verticalScale(1),
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});

export default Divider;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import Divider from './components/Divider';
import { View, Text } from 'react-native';

const MyScreen = () => {
  return (
    <View>
      <Text>العنصر الأول</Text>
      <Divider color="#CCC" height={2} style={{ marginVertical: 10 }} />
      <Text>العنصر الثاني</Text>
    </View>
  );
};
*/
