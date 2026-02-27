import { useWindowDimensions } from 'react-native';

/**
 * useResponsive.js
 * Mirrors Flutter's responsive_extensions.dart.
 * Provides custom hook for responsive breakpoints.
 */

export const useResponsive = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const isXSmall = screenWidth < 576;
  const isSmall = screenWidth >= 576 && screenWidth < 768;
  const isMedium = screenWidth >= 768 && screenWidth < 992;
  const isLarge = screenWidth >= 992 && screenWidth < 1200;
  const isXLarge = screenWidth >= 1200;

  const isMobile = screenWidth < 600;
  const isTablet = screenWidth >= 600 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  const isPortrait = screenHeight > screenWidth;
  const isLandscape = screenWidth > screenHeight;

  /**
   * Selects a value based on the current screen size.
   * Mirrors context.responsive() in Flutter.
   */
  const responsive = (mobile, tablet, desktop) => {
    if (isDesktop && desktop !== undefined) return desktop;
    if (isTablet && tablet !== undefined) return tablet;
    return mobile;
  };

  return {
    screenWidth,
    screenHeight,
    isXSmall,
    isSmall,
    isMedium,
    isLarge,
    isXLarge,
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    isLandscape,
    responsive,
  };
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { useResponsive } from './core/utils/useResponsive';
import { View, Text } from 'react-native';

const ResponsiveScreen = () => {
  const { isMobile, isTablet, responsive } = useResponsive();

  // اختيار القيمة بناءً على حجم الشاشة (جوال، هاتف لوحي، كمبيوتر)
  const paddingSize = responsive(10, 20, 30);

  return (
    <View style={{ padding: paddingSize }}>
      <Text>{isMobile ? 'هذا جوال' : isTablet ? 'هذا تابلت' : 'شاشة كبيرة'}</Text>
    </View>
  );
};
*/
