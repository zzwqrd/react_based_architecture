/**
 * SizingExtensions.js
 * Mirrors Flutter's size_extensions.dart.
 * Provides a centralized spacing, radius, and icon size system.
 */

export const AppSizing = {
  // Spacing System (Material Design 3)
  spacing0: 0,
  spacing1: 4,
  spacing2: 8,
  spacing3: 12,
  spacing4: 16,
  spacing5: 20,
  spacing6: 24,
  spacing7: 28,
  spacing8: 32,
  spacing9: 36,
  spacing10: 40,
  spacing12: 48,
  spacing16: 64,
  spacing20: 80,
  spacing24: 96,

  // Legacy Spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // Border Radius System
  radius0: 0,
  radius1: 4,
  radius2: 8,
  radius3: 12,
  radius4: 16,
  radius5: 20,
  radius6: 24,
  radius8: 32,
  radiusFull: 9999,

  // Legacy Radius
  radiusXS: 4,
  radiusSM: 8,
  radiusMD: 12,
  radiusLG: 16,
  radiusXL: 20,
  radiusXXL: 24,
  radiusRounded: 9999,

  // Icon Sizes
  icon12: 12,
  icon16: 16,
  icon20: 20,
  icon24: 24,
  icon28: 28,
  icon32: 32,
  icon36: 36,
  icon40: 40,
  icon48: 48,
  icon56: 56,
  icon64: 64,

  // Avatar Sizes
  avatar24: 24,
  avatar32: 32,
  avatar40: 40,
  avatar48: 48,
  avatar56: 56,
  avatar64: 64,
  avatar80: 80,
  avatar96: 96,
  avatar128: 128,

  // Button Heights
  buttonSmall: 32,
  buttonMedium: 40,
  buttonLarge: 48,
  buttonExtraLarge: 56,

  // Input Heights
  inputSmall: 32,
  inputMedium: 40,
  inputLarge: 48,
};

// /*
// =========================================
// مثال على الاستخدام (Example Usage):
// =========================================
// import { AppSizing } from './core/utils/AppSizing';
// import { View } from 'react-native';

// const StyledBox = () => {
//   return (
//     <View style={{ 
//       margin: AppSizing.marginMedium, 
//       padding: AppSizing.paddingSmall, 
//       borderRadius: AppSizing.radiusLarge 
//     }}>
//       {/* محتوى الصندوق */}
//     </View>
//   );
// };
// */
