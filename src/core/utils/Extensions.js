/**
 * Extensions.js
 * Mirrors Flutter's extensions.dart.
 * Provides utility functions for common primitive operations.
 */

export const StringExtensions = {
  /**
   * Converts hex string to ARGB hex (React Native usually uses #RRGGBB or #RRGGBBAA)
   */
  getColor: (colorStr) => {
    let clean = colorStr.trim().replace('#', '');
    if (clean.length === 6) clean = `FF${clean}`;
    // Simple conversion for RN (assumes #AARRGGBB -> #RRGGBBAA or similar if needed)
    // Most RN styles use #RRGGBB
    return `#${clean.substring(2)}${clean.substring(0, 2)}`;
  },

  isImage: (str) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(str);
  },

  isVideo: (str) => {
    return /\.(mp4|mov|wmv|avi|mkv|flv|webm)$/i.test(str);
  },

  isPhone: (str) => str.startsWith('5') && str.length === 9,

  toArabicNumber: (str) => {
    const map = {
      '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
      '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
    };
    return str.split('').map(char => map[char] || char).join('');
  },

  truncate: (str, maxLength) => {
    if (str.length > maxLength) {
      return `${str.substring(0, maxLength)}...`;
    }
    return str;
  }
};

export const IntExtensions = {
  seconds: (val) => val * 1000,
  milliseconds: (val) => val,
  minutes: (val) => val * 60 * 1000,
  hours: (val) => val * 60 * 60 * 1000,
  days: (val) => val * 24 * 60 * 60 * 1000,
};

/**
 * Layout Extensions - helper for React Native styles
 * Mirrors the ExtensionWidget logic.
 */
export const LayoutExtensions = {
  center: { alignItems: 'center', justifyContent: 'center' },
  toEnd: { alignItems: 'flex-end' },
  toStart: { alignItems: 'flex-start' },
  toBottom: { justifyContent: 'flex-end' },
  
  withPadding: ({ all = 0, vertical = 0, horizontal = 0, top = 0, bottom = 0, left = 0, right = 0 }) => ({
    paddingTop: all + vertical + top,
    paddingBottom: all + vertical + bottom,
    paddingLeft: all + horizontal + left,
    paddingRight: all + horizontal + right,
  }),
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { StringExtensions, IntExtensions, LayoutExtensions } from './core/utils/Extensions';
import { View, Text } from 'react-native';

const ExampleComponent = () => {
  const arabicNum = StringExtensions.toArabicNumber('123'); // يعطي ١٢٣
  const duration = IntExtensions.seconds(5); // يعطي 5000 ملي ثانية

  return (
    <View style={LayoutExtensions.center}>
      <Text>{arabicNum}</Text>
    </View>
  );
};
*/
