import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppStyles } from '../AppStyles';

/**
 * useAppContext.js
 * Mirrors Flutter's ContextExtensions.
 * Provides a hook to access screen dimensions, safe areas, and dynamic styles.
 */

export const useAppContext = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Safe Area Insets
  const safeArea = {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
  };

  // Keyboard (Simulated - would normally use Keyboard hook)
  const isKeyboardVisible = false; 

  // Device Orientation
  const isPortrait = screenHeight > screenWidth;
  const isLandscape = !isPortrait;

  // Device Type
  const isMobile = screenWidth < 600;
  const isTablet = screenWidth >= 600 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  // Typography Shortcuts (Analogous to Theme.of(context).textTheme)
  const typography = AppStyles;

  return {
    screenWidth,
    screenHeight,
    safeArea,
    isKeyboardVisible,
    isPortrait,
    isLandscape,
    isMobile,
    isTablet,
    isDesktop,
    typography,
  };
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { useAppContext } from './core/utils/extensions_app/useAppContext';
import { Text, View } from 'react-native';

const MyScreen = () => {
  const { isMobile, safeArea, typography } = useAppContext();

  return (
    <View style={{ paddingTop: safeArea.top }}>
      <Text style={typography.headlineLarge}>
        {isMobile ? 'شاشة الهاتف' : 'شاشة كبيرة'}
      </Text>
    </View>
  );
};
*/
