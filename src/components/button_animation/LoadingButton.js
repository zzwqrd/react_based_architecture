/**
 * LoadingButton.js
 * Mirrors Flutter's LoadingButton widget (LoadingButton.dart).
 *
 * Composed from:
 *  - ButtonAnimation  → handles the width-shrink / grow animation
 *  - LoadingBtn       → the spinner shown inside the button while loading
 *  - MyTextApp        → the label text
 *
 * Props match the Flutter constructor 1-to-1:
 *  title        → label string (required)
 *  onTap        → press callback (required)
 *  isAnimating  → triggers loading animation (required)
 *  color        → background colour (default: primary)
 *  textColor    → label colour (default: white)
 *  borderColor  → border colour (default: transparent)
 *  borderRadius → corner radius (default: 50 = pill)
 *  width        → explicit width (default: 100%)
 *  height       → explicit height (default: 55)
 *  fontSize     → label font size (default: 14)
 *  fontFamily   → custom font family
 *  fontWeight   → label font weight
 *  loader       → custom loader widget (defaults to LoadingBtn spinner)
 *  margin       → outer spacing
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import ButtonAnimation from './ButtonAnimation';
import { LoadingBtn } from './LoadingBtn';
import { colors } from '../../core/themes/colors';
import { FontFamily } from '../../core/themes/typography';

const LoadingButton = ({
  title,
  onTap,
  isAnimating = false,
  color,
  textColor,
  borderColor,
  borderRadius = 100,

  margin,
  width,
  height,
  fontSize,
  fontFamily,
  fontWeight,
  loader,
}) => {
  const resolvedColor = color || colors.primary;
  const resolvedHeight = height || verticalScale(44);

  const labelNode = (
    <Text
      style={[
        styles.label,
        {
          color: textColor || colors.white,
          fontSize: fontSize || scale(14),
          fontFamily: fontFamily || FontFamily.cairoBold,
          fontWeight: fontWeight || '700',
        },
      ]}
      numberOfLines={1}
    >
      {title}
    </Text>
  );

  const loaderNode = loader || (
    <LoadingBtn color={textColor || colors.white} />
  );

  return (
    <View style={[styles.wrapper, margin ? { margin } : null]}>
      <ButtonAnimation
    
        isAnimating={isAnimating}
        onTap={onTap}
        width={width}
        minWidth={resolvedHeight} // shrinks to a circle the same size as height
        height={resolvedHeight}
        color={resolvedColor}
        borderRadius={borderRadius}
        roundLoadingShape
        loader={loaderNode}
        style={
          borderColor
            ? {
                borderWidth: 1,
                borderColor,
              }
            : null
        }
      >
        {labelNode}
      </ButtonAnimation>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
   
    width: '100%',
  },
  label: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default LoadingButton;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import LoadingButton from './components/button_animation/LoadingButton';
import { useState } from 'react';

const SubmitScreen = () => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingButton 
      title="حفظ التغييرات" 
      isAnimating={loading}
      onTap={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
      }}
    />
  );
};
*/
