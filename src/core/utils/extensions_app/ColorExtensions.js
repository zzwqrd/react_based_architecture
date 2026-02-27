import { AppColors } from '../AppColors';

/**
 * ColorExtensions.js
 * Mirrors Flutter's ColorExtensions.
 * Provides color manipulation and extended theme colors.
 */

export const ColorExtensions = {
  ...AppColors,

  // Helper to adjust color opacity (alpha)
  withOpacity: (hex, opacity) => {
    const op = Math.round(opacity * 255).toString(16).padStart(2, '0');
    return `${hex}${op}`;
  },

  // Basic Color Shifting (Simulated)
  lighten: (color, percent = 10) => {
    // Basic implementation for hex colors
    return color; // Placeholder for actual implementation if needed
  },

  darken: (color, percent = 10) => {
    return color; // Placeholder
  },
};

/**
 * Gradients mapped from Flutter's ColorExtensions
 */
export const AppGradients = {
  primary: [AppColors.primaryColor, AppColors.primaryColor1 || AppColors.primaryColor],
  success: ['#4CAF50', '#81C784'],
  error: ['#F44336', '#E57373'],
  warning: ['#FF9800', '#FFB74D'],
  info: ['#2196F3', '#64B5F6'],
  sunset: ['#FF7043', '#FFAB40'],
  ocean: ['#0277BD', '#00BCD4'],
  forest: ['#388E3C', '#66BB6A'],
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { ColorExtensions, AppGradients } from './core/utils/extensions_app/ColorExtensions';
import { View } from 'react-native';

const ColorBox = () => {
  // يمكن دمج Gradient مع مكتبة react-native-linear-gradient
  const semiTransparent = ColorExtensions.withOpacity('#FF0000', 0.5);

  return <View style={{ backgroundColor: semiTransparent, width: 50, height: 50 }} />;
};
*/
