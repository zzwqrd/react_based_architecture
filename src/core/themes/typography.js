/**
 * Mirrors Flutter's app_styles.dart + flutter_screenutil scaling.
 * Uses Cairo font family (mirrors MyFontFamily from fonts.gen.dart).
 * Scaling done via react-native-size-matters (mirrors flutter_screenutil).
 */
import { scale, verticalScale } from 'react-native-size-matters';

// ─── Font Families ────────────────────────────────────────────────────────────
// Mirrors Flutter's MyFontFamily class
export const FontFamily = {
  cairoBlack:      'Cairo-Black',
  cairoBold:       'Cairo-Bold',
  cairoExtraBold:  'Cairo-ExtraBold',
  cairoExtraLight: 'Cairo-ExtraLight',
  cairoLight:      'Cairo-Light',
  cairoMedium:     'Cairo-Medium',
  cairoRegular:    'Cairo-Regular',    // default body font
  cairoSemiBold:   'Cairo-SemiBold',
};

// Default font used across the app — mirrors AppStyles.smallText fontFamily
export const defaultFont = FontFamily.cairoRegular;

// ─── Font Sizes ───────────────────────────────────────────────────────────────
export const FontSize = {
  xs:   scale(10),
  sm:   scale(12),
  base: scale(14),
  md:   scale(16),
  lg:   scale(18),
  xl:   scale(20),
  xxl:  scale(24),
  h1:   scale(32),
};

// ─── Text Style Presets ────────────────────────────────────────────────────────
// Mirrors Flutter: AppStyles.largeText, AppStyles.mediumText, AppStyles.smallText etc.
export const TextStyles = {
  large: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    fontFamily: FontFamily.cairoBold,
  },
  medium: {
    fontSize: FontSize.md,
    fontWeight: '500',
    fontFamily: FontFamily.cairoMedium,
  },
  small: {
    fontSize: FontSize.sm,
    fontWeight: 'normal',
    fontFamily: FontFamily.cairoRegular,
  },
  semiBold: {
    fontSize: FontSize.base,
    fontWeight: '600',
    fontFamily: FontFamily.cairoSemiBold,
  },
  heading: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    fontFamily: FontFamily.cairoBold,
    letterSpacing: 1.2,
  },
};

// ─── Spacing ──────────────────────────────────────────────────────────────────
export const Spacing = {
  xs:   scale(4),
  sm:   scale(8),
  md:   scale(16),
  lg:   scale(24),
  xl:   scale(32),
  xxl:  scale(48),
};

const typography = { FontFamily, FontSize, TextStyles, Spacing, defaultFont };
export default typography;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import typography from './core/themes/typography';
import { Text } from 'react-native';

const TitleText = () => {
  return (
    <Text style={{ fontFamily: typography.FontFamily.cairoBold, fontSize: typography.FontSize.large }}>
      نص تجريبي
    </Text>
  );
};
*/
