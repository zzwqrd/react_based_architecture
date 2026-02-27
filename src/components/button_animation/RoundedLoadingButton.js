/**
 * RoundedLoadingButton.js
 * Mirrors Flutter's RoundedLoadingButton (rounded_loading_button.dart).
 *
 * A simpler variant — uses AnimatedContainer to morph padding
 * rather than animating width. It does NOT shrink to a circle (no width anim).
 * Useful for compact inline buttons.
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../core/themes/colors';

const RoundedLoadingButton = ({
  children,
  onPress,
  isLoading = false,
  backgroundColor,
  loadingWidget,
  style,
}) => {
  const bgColor = backgroundColor || colors.primary;

  const loaderNode = loadingWidget || (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="small" color={colors.white} />
    </View>
  );

  return (
    <TouchableOpacity
      onPress={isLoading ? undefined : onPress}
      activeOpacity={isLoading ? 1 : 0.8}
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          borderRadius: isLoading ? 100 : scale(5),
          paddingHorizontal: isLoading ? scale(10) : scale(30),
          paddingVertical: scale(10),
        },
        style,
      ]}
    >
      {isLoading ? loaderNode : children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  loaderContainer: {
    width: scale(25),
    height: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RoundedLoadingButton;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import RoundedLoadingButton from './components/button_animation/RoundedLoadingButton';
import { Text } from 'react-native';

const SimpleAction = () => {
  return (
    <RoundedLoadingButton isLoading={true} backgroundColor="#EF233C">
      <Text style={{ color: 'white' }}>حذف الأداة</Text>
    </RoundedLoadingButton>
  );
};
*/
