/**
 * ButtonAnimation.js
 * Mirrors Flutter's CustomButtonAnimation (button_animation.dart).
 *
 * Animation behaviour:
 *  - Idle → Busy: button width shrinks to a circle over 450 ms (easeInOutCirc)
 *  - Busy → Idle: circle expands back to full width over 450 ms
 *  - While busy the loader widget is shown instead of the child label
 *  - Taps are blocked while isAnimating == true
 */
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
} from 'react-native';

const DURATION = 450;

const ButtonAnimation = ({
  /** Full width (idle state) */
  width,
  /** Collapsed width when loading (circle diameter, defaults to height) */
  minWidth,
  /** Height of the button */
  height = 40,
  /** Border radius in idle state */

  borderRadius = 100,
  /** Whether to morph to full circle when loading */
  roundLoadingShape = true,
  /** Background colour */
  color,
  /** Shown when idle */
  children,
  /** Shown when loading */
  loader,
  /** Triggers the animation */
  isAnimating = false,
  /** Called when the button is pressed (blocked while loading) */
  onTap,
  /** Optional extra style */
  style,
}) => {
  const animValue = useRef(new Animated.Value(0)).current; // 0 = Idle, 1 = Busy

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isAnimating ? 1 : 0,
      duration: DURATION,
      useNativeDriver: false, // width/borderRadius can't use native driver
      easing: (t) => {
        // Approximate Curves.easeInOutCirc
        if (t < 0.5) return (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2;
        return (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
      },
    }).start();
  }, [isAnimating]);

  const circleSize = minWidth || height;
  const fullWidth = width || '100%';

  // Interpolate width: fullWidth → circleSize (while animating)
  const animatedWidth = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      typeof fullWidth === 'number' ? fullWidth : 500, // fallback numeric
      circleSize,
    ],
  });

  // Interpolate borderRadius: borderRadius → height/2 (full circle)
  const animatedRadius = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [borderRadius, roundLoadingShape ? height / 2 : borderRadius],
  });

  // Fade out bg colour when fully busy (matches Flutter: color.withOpacity(0))
  const animatedOpacity = animValue.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [1, 0.8, 0],
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!isAnimating && onTap) onTap();
      }}
    >
      <Animated.View
        style={[
          styles.base,
          {
            height,
            width: animatedWidth,
            borderRadius: animatedRadius,
            backgroundColor: color,
            opacity: isAnimating ? animatedOpacity : 1,
          },
          style,
        ]}
      >
        {/* Show loader or child based on state */}
        {isAnimating ? loader : children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default ButtonAnimation;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import ButtonAnimation from './components/button_animation/ButtonAnimation';
import { Text } from 'react-native';

const AnimatedScreen = () => {
  return (
    <ButtonAnimation 
      isAnimating={true} 
      width="100%" 
      height={50}
      color="#00A585"
      loader={<Text>جارٍ التحميل...</Text>}
    >
      <Text>اضغط هنا</Text>
    </ButtonAnimation>
  );
};
*/
