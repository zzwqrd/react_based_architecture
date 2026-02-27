import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';
import CustomImage from './CustomImage';

/**
 * SuccessWidget mirroring successfully.dart in Flutter.
 */
const SuccessWidget = ({ title, subTitle, onFinish }) => {
  return (
    <View style={styles.container}>
      {/* Handle mimicking the bottom sheet */}
      <View style={styles.handle} />

      {/* Success Image (Lottie/SVG placeholder logic) */}
      <View style={styles.imageContainer}>
        {/* using CustomImage if it supports local icons, else a generic placeholder */}
        <CustomImage
          source={require('../assets/icons/successfly.png')} // Update path to actual asset if needed
          style={styles.image}
          // onFinishLottie={onFinish} // If passing a lottie
        />
      </View>

      <Text style={styles.title}>{title}</Text>

      {subTitle && (
        <Text style={styles.subTitle}>{subTitle}</Text>
      )}

      {/* Spacing at bottom */}
      <View style={{ height: verticalScale(20) }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background || '#FFFFFF',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingHorizontal: scale(24),
    alignItems: 'center',
  },
  handle: {
    height: verticalScale(5),
    width: scale(134),
    marginTop: verticalScale(21),
    marginBottom: verticalScale(8),
    backgroundColor: colors.hint || '#BDBDBD',
    borderRadius: scale(20),
  },
  imageContainer: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(16),
  },
  image: {
    height: verticalScale(160),
    width: verticalScale(160),
    resizeMode: 'contain',
  },
  title: {
    fontSize: scale(20),
    fontWeight: '600',
    textAlign: 'center',
    color: colors.textPrimary || '#000',
    marginVertical: verticalScale(10),
  },
  subTitle: {
    fontSize: scale(14),
    color: colors.hint || '#BDBDBD',
    textAlign: 'center',
    marginVertical: verticalScale(10),
  },
});

export default SuccessWidget;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import SuccessWidget from './components/SuccessWidget';

const CongratsScreen = () => {
  return (
    <SuccessWidget 
      title="تم بنجاح!" 
      subTitle="تمت العملية بنجاح وسيتم تحويلك قريباً"
      // onFinish={() => navigation.navigate('Home')}
    />
  );
};
*/
