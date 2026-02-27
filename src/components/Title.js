import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';

/**
 * Title component mirroring TitleWidget in Flutter.
 */
const Title = ({ text, style, ...props }) => {
  return (
    <Text style={[styles.title, style]} {...props}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.black || '#000000',
    fontWeight: '900',
    fontSize: scale(15),
  },
});

export default Title;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import Title from './components/Title';

const SectionScreen = () => {
  return (
    <Title 
      text="الأقسام المميزة" 
      style={{ marginVertical: 12, paddingHorizontal: 16 }} 
    />
  );
};
*/
