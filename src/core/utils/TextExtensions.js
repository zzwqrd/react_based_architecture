import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../themes/colors';

/**
 * TextExtensions mirrors text_extensions.dart from Flutter.
 * Helper functions to construct RichText and UnderlinedRichText equivalents.
 */

export const BuildRichText = ({
  text,
  onTap,
  style,
  textAlign = 'left', // Equivalent to TextAlign.start
  textDecorationLine,
  textDecorationColor,
}) => {
  return (
    <TouchableOpacity onPress={onTap} activeOpacity={0.8}>
      <Text
        style={[
          styles.baseText,
          style,
          { 
            textAlign, 
            textDecorationLine, 
            textDecorationColor 
          }
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const BuildUnderlinedRichText = ({
  text,
  onTap,
  style,
  textAlign = 'left',
  underlineColor = colors.secondary || '#000',
}) => {
  return (
    <BuildRichText
      text={text}
      onTap={onTap}
      style={style}
      textAlign={textAlign}
      textDecorationLine="underline"
      textDecorationColor={underlineColor}
    />
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontSize: scale(14),
    color: colors.textPrimary || '#000',
  },
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { BuildUnderlinedRichText } from './core/utils/TextExtensions';

const LoginScreen = () => {
  return (
    <BuildUnderlinedRichText 
      text="هل نسيت كلمة المرور؟" 
      onTap={() => console.log('الانتقال لصفحة استعادة كلمة المرور')} 
      underlineColor="blue"
    />
  );
};
*/
