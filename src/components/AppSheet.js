import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';

const AppSheet = ({
  title,
  children,
  minHeight = 0,
  isScrollable = true,
  paddingHorizontal = scale(24),
  style,
}) => {
  // Common content with drag handle and title
  const Content = (
    <View style={[styles.innerContainer, { paddingHorizontal }]}>
      {/* Drag handle */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      {/* Title */}
      {title && title.trim() !== '' && (
        <Text style={styles.title}>{title}</Text>
      )}

      {/* Children */}
      {children}
    </View>
  );

  return (
    <View style={[styles.container, { minHeight }, style]}>
      {isScrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {Content}
        </ScrollView>
      ) : (
        Content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background || '#FFFFFF',
    borderTopLeftRadius: scale(32),
    borderTopRightRadius: scale(32),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(20) : verticalScale(10),
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
  },
  handleContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  handle: {
    height: verticalScale(5),
    width: scale(134),
    backgroundColor: colors.hint || '#BDBDBD',
    borderRadius: scale(4),
  },
  title: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: colors.textPrimary || '#000',
    textAlign: 'left', // Mirrors TextAlign.start
    marginBottom: verticalScale(16),
  },
});

export default AppSheet;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import AppSheet from './components/AppSheet';
import { Text } from 'react-native';

// يمكن وضعه داخل Modal أو كجزء من الشاشة السفلية
const MyBottomSheet = () => {
  return (
    <AppSheet 
      title="اختر خياراً" 
      isScrollable={true} 
      minHeight={300}
    >
      <Text>محتوى الشاشة السفلية هنا...</Text>
      <Text>يمكنك إضافة أي مكونات React Native داخل هذا المكون.</Text>
    </AppSheet>
  );
};
*/
