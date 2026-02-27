import { StyleSheet } from 'react-native';
import { AppColors } from '../AppColors';

/**
 * TextExtensions.js
 * Mirrors Flutter's SmartTextExtensions and TextStyleExtensions.
 * Provides a comprehensive typography system.
 */

export const TextStyles = StyleSheet.create({
  // Material Design 3 Typography
  displayLarge: { fontSize: 57, fontWeight: '400', lineHeight: 64, letterSpacing: -0.25 },
  displayMedium: { fontSize: 45, fontWeight: '400', lineHeight: 52 },
  displaySmall: { fontSize: 36, fontWeight: '400', lineHeight: 44 },
  
  headlineLarge: { fontSize: 32, fontWeight: '400', lineHeight: 40 },
  headlineMedium: { fontSize: 28, fontWeight: '400', lineHeight: 36 },
  headlineSmall: { fontSize: 24, fontWeight: '400', lineHeight: 32 },
  
  titleLarge: { fontSize: 22, fontWeight: '400', lineHeight: 28 },
  titleMedium: { fontSize: 16, fontWeight: '500', lineHeight: 24, letterSpacing: 0.15 },
  titleSmall: { fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: 0.1 },
  
  bodyLarge: { fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0.5 },
  bodyMedium: { fontSize: 14, fontWeight: '400', lineHeight: 20, letterSpacing: 0.25 },
  bodySmall: { fontSize: 12, fontWeight: '400', lineHeight: 16, letterSpacing: 0.4 },
  
  labelLarge: { fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: 0.1 },
  labelMedium: { fontSize: 12, fontWeight: '500', lineHeight: 16, letterSpacing: 0.5 },
  labelSmall: { fontSize: 11, fontWeight: '500', lineHeight: 16, letterSpacing: 0.5 },

  // Brand / Custom Styles
  button: { fontSize: 14, fontWeight: '500', letterSpacing: 1.25 },
  caption: { fontSize: 12, fontWeight: '400', letterSpacing: 0.4 },
  overline: { fontSize: 10, fontWeight: '500', letterSpacing: 1.5 },
  
  // Font Family Specific
  cairo: { fontFamily: 'Cairo' },
  tajawal: { fontFamily: 'Tajawal' },
  roboto: { fontFamily: 'Roboto' },
  
  // Weight Variations
  thin: { fontWeight: '100' },
  light: { fontWeight: '300' },
  normal: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semiBold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
  black: { fontWeight: '900' },

  // Decoration Variations
  underline: { textDecorationLine: 'underline' },
  lineThrough: { textDecorationLine: 'line-through' },
  italic: { fontStyle: 'italic' },
});

/**
 * Helper to combine styles with overrides
 */
export const styledText = (baseStyle, overrides = {}) => ({
  ...baseStyle,
  ...overrides,
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { TextStyles, styledText } from './core/utils/extensions_app/TextExtensions';
import { Text } from 'react-native';

const TitleText = () => {
  return (
    <Text style={styledText(TextStyles.displayMedium, { color: 'red' })}>
      نص مخصص بناءً على الثيم
    </Text>
  );
};
*/
