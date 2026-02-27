import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';
import AppText from './AppText';
import { CustomProgress } from './Loading';

/**
 * Mirrors Flutter's EnhancedButton widget with all props:
 * - label, onPressed, isLoading, isEnabled, backgroundColor, textColor,
 *   leadingIcon, includeSafeArea, height, width, fontSize, showBorder
 */
const AppButton = ({
  label,
  onPress,
  isLoading = false,
  isEnabled = true,
  backgroundColor,
  textColor,
  leadingIcon,
  includeSafeArea = true,
  height,
  width,
  fontSize,
  showBorder = true,
  style,
}) => {
  const isDisabled = isLoading || !isEnabled;

  const resolvedBg = isDisabled
    ? `${backgroundColor || colors.secondary || '#ccc'}80` // 50% opacity
    : backgroundColor || colors.primary;

  const buttonContent = (
    <TouchableOpacity
      onPress={!isDisabled ? onPress : undefined}
      activeOpacity={isDisabled ? 1 : 0.8}
      style={[
        styles.button,
        {
          height: height || verticalScale(55),
          width: width || '100%',
          backgroundColor: resolvedBg,
          borderWidth: showBorder ? 1 : 0,
          borderColor: textColor || colors.primaryLight || 'transparent',
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {isLoading && (
          <View style={{ marginEnd: 8 }}>
            <CustomProgress size={scale(15)} color={textColor || colors.white} />
          </View>
        )}
        {leadingIcon && !isLoading && (
          <View style={{ marginEnd: scale(4) }}>{leadingIcon}</View>
        )}
        {label && label.trim() !== '' && (
          <AppText.Small
            title={label}
            color={textColor || colors.white}
            fontSize={fontSize || scale(12)}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  if (includeSafeArea) {
    return (
      <SafeAreaView edges={Platform.OS === 'ios' ? ['bottom'] : []}>
        {buttonContent}
      </SafeAreaView>
    );
  }
  return buttonContent;
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
  },
});

export default AppButton;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import AppButton from './components/AppButton';

const LoginScreen = () => {
  return (
    <AppButton 
      title="تسجيل الدخول" 
      onPress={() => console.log('تم الضغط')} 
      isLoading={false}
      style={{ marginTop: 20 }}
    />
  );
};
*/
