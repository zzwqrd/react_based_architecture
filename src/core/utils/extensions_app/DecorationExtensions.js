import { StyleSheet } from 'react-native';
import { AppColors } from '../AppColors';
import { AppSizing } from '../AppSizing';

/**
 * DecorationExtensions.js
 * Mirrors Flutter's DecorationExtensions and ContainerExtensions.
 * Provides style objects for card-like views, shadows, and inputs.
 */

export const DecorationExtensions = StyleSheet.create({
  // Card Decorations
  card: {
    backgroundColor: AppColors.whiteColor || '#FFFFFF',
    borderRadius: AppSizing.radiusMD || 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  elevatedCard: {
    backgroundColor: AppColors.whiteColor || '#FFFFFF',
    borderRadius: AppSizing.radiusMD || 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  productItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EFF0F6',
  },

  // Input Field Decoration (Base style for containers)
  inputField: {
    backgroundColor: AppColors.scaffoldBackgroundColor || '#F5F5F5',
    borderRadius: AppSizing.radiusSM || 8,
    paddingHorizontal: AppSizing.spacing4 || 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  focusedInputField: {
    borderColor: AppColors.mainColor || '#0057b7',
    borderWidth: 2,
  },

  errorInputField: {
    borderColor: AppColors.redColor || '#F44336',
    borderWidth: 1,
  },

  // Circle Helper
  circle: {
    borderRadius: 9999,
  },
});

/**
 * Helper to create a category decoration with a specific color
 */
export const getCategoryDecoration = (color) => ({
  backgroundColor: color,
  borderRadius: 15,
});

/**
 * Helper for custom shadows
 */
export const getShadow = ({ color = '#000', opacity = 0.1, blur = 8, offset = { x: 0, y: 2 } }) => ({
  shadowColor: color,
  shadowOffset: { width: offset.x, height: offset.y },
  shadowOpacity: opacity,
  shadowRadius: blur,
  elevation: blur / 2,
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { DecorationExtensions, getShadow } from './core/utils/extensions_app/DecorationExtensions';
import { View } from 'react-native';

const Card = () => {
  return (
    <View style={[DecorationExtensions.card, getShadow({ color: '#113342', opacity: 0.2 })]}>
      <Text>عنصر بظل وتنسيق بطاقة</Text>
    </View>
  );
};
*/
