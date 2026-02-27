import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../themes/colors';
import CustomImage from '../../components/CustomImage';
// Note: Assuming a generic Button component exists in the project; using TouchableOpacity here to match requirements
// import EnhancedButton from '../../components/AppButton'; 

/**
 * OnboardingExtensions mirrors onboarding_extensions.dart from Flutter.
 * Provides helper UI components for the Onboarding flow.
 */

export const onboardingColors = [
  '#FFBC0F',
  '#113342',
  '#00A585',
];

export const BuildPageIndicator = ({ currentIndex, totalPages = 3 }) => {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <View
          key={`indicator-${index}`}
          style={[
            styles.indicatorDot,
            {
              backgroundColor: onboardingColors[currentIndex],
              opacity: index === currentIndex ? 1 : 0.5,
            },
          ]}
        />
      ))}
    </View>
  );
};

export const BuildOnboardingButton = ({
  onPressed,
  title,
  backgroundColor,
  saveArea = false,
}) => {
  return (
    <View style={[styles.buttonWrapper, saveArea && styles.safeAreaPadding]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={onPressed}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const BuildOnboardingImage = ({ imagePath, height, width, child }) => {
  return (
    <View style={{ height, width }}>
      <CustomImage 
        source={typeof imagePath === 'string' ? { uri: imagePath } : imagePath} 
        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
      />
      {child}
    </View>
  );
};

export const BuildOnboardingBottomNavigationBar = ({
  currentIndex,
  onNextPressed,
  onSkipPressed,
  onFinishPressed,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.bottomNavContainer}>
        <BuildPageIndicator currentIndex={currentIndex} totalPages={3} />
        
        <BuildOnboardingButton
          onPressed={currentIndex === 2 ? onFinishPressed : onNextPressed}
          title={currentIndex === 2 ? "الرئيسية" : "التالي"} // Localized generic titles
          backgroundColor={onboardingColors[currentIndex]}
        />
        
        <TouchableOpacity 
          onPress={onSkipPressed} 
          style={[styles.skipButton, { opacity: currentIndex === 2 ? 0 : 1 }]}
          disabled={currentIndex === 2}
        >
          <Text style={styles.skipText}>تخطي</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  indicatorDot: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    marginHorizontal: scale(3),
  },
  buttonWrapper: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(12),
    width: '100%',
  },
  button: {
    width: '100%',
    paddingVertical: verticalScale(14),
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  safeAreaPadding: {
    paddingBottom: verticalScale(30),
  },
  bottomNavContainer: {
    paddingHorizontal: scale(20),
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: verticalScale(10),
  },
  skipText: {
    fontSize: scale(14),
    color: colors.textPrimary || '#333',
    fontWeight: '500',
  },
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { BuildOnboardingBottomNavigationBar } from './core/utils/OnboardingExtensions';
import { useState } from 'react';

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <BuildOnboardingBottomNavigationBar 
        currentIndex={currentIndex}
        onNextPressed={() => setCurrentIndex(prev => prev + 1)}
        onSkipPressed={() => console.log('تم التخطي')}
        onFinishPressed={() => console.log('إنهاء والانتقال للرئيسية')}
      />
    </View>
  );
};
*/
