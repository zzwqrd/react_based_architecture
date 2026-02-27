import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors } from '../core/themes/colors';

const Shimmer = ({ 
  children, 
  width, 
  height, 
  borderRadius = 4,
  baseColor = colors.hint ? colors.hint + '80' : 'rgba(189, 189, 189, 0.5)', // opacity 0.5
  highlightColor = colors.hint ? colors.hint + '33' : 'rgba(189, 189, 189, 0.2)', // opacity 0.2
  style 
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          })
        ])
      ).start();
    };

    startAnimation();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1], // Pulse effect imitating simple shimmer
  });

  // If children are provided, we wrap them in an animated view that fades
  if (children) {
    return (
      <Animated.View style={[{ opacity }, style]}>
        {children}
      </Animated.View>
    );
  }

  // Otherwise, render a skeleton block
  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, borderRadius, backgroundColor: baseColor, opacity },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
});

export default Shimmer;


// =========================================
// مثال على الاستخدام (Example Usage):
// =========================================
// import Shimmer from './components/Shimmer';
// import { View, Text } from 'react-native';

// const LoadingScreen = () => {
//   return (
//     <View>
//       {/* 1. استخدام كعنصر تحميل هيكلي (Skeleton) */}
//       <Shimmer width={200} height={20} borderRadius={8} style={{ marginBottom: 10 }} />
//       <Shimmer width={150} height={20} borderRadius={8} />

//       {/* 2. استخدام لإضافة تأثير وميض على عنصر موجود */}
//       <Shimmer style={{ marginTop: 30 }}>
//         <Text style={{ fontSize: 18 }}>جاري التحميل...</Text>
//       </Shimmer>
//     </View>
//   );
// };

