import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * AnimationHelpers.js
 * Mirrors Flutter's AnimationExtension.
 * Provides easy-to-use hooks for common animations.
 */

export const useFadeIn = (duration = 500) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return { opacity: fadeAnim };
};

export const useScaleIn = (duration = 500, begin = 0.5) => {
  const scaleAnim = useRef(new Animated.Value(begin)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim, duration]);

  return { transform: [{ scale: scaleAnim }] };
};

export const useSlideIn = (duration = 500, fromOffset = { x: 100, y: 0 }) => {
  const slideAnim = useRef(new Animated.ValueXY(fromOffset)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: { x: 0, y: 0 },
      duration,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, duration]);

  return { transform: slideAnim.getTranslateTransform() };
};

export const useRotateIn = (duration = 500) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [rotateAnim, duration]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return { transform: [{ rotate: spin }] };
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { AnimationHelpers } from './core/utils/AnimationHelpers';
import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';

const FadeInScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    AnimationHelpers.fadeIn(fadeAnim, 1000).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Text>هذا النص يظهر بتأثير التلاشي</Text>
    </Animated.View>
  );
};
*/
