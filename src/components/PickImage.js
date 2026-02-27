import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';
import AppSheet from './AppSheet';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Assume user uses vector icons

/**
 * PickImage component mimicking the Flutter PickImage widget.
 * It uses AppSheet to display a bottom sheet with Camera and Gallery options.
 */
const PickImage = ({ title, onImagePicked }) => {
  const handleCamera = () => {
    // In a real app, use ImagePicker here
    // e.g., launchCamera({ mediaType: 'photo' }, callback)
    if (onImagePicked) onImagePicked({ source: 'camera' });
  };

  const handleGallery = () => {
    // e.g., launchImageLibrary({ mediaType: 'photo' }, callback)
    if (onImagePicked) onImagePicked({ source: 'gallery' });
  };

  return (
    <AppSheet title={title} isScrollable={false}>
      <View style={styles.container}>
        {/* Camera Option */}
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleCamera}>
            <Text style={styles.iconText}>📷</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Camera</Text>
        </View>

        {/* Gallery Option */}
        <View style={styles.optionContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleGallery}>
             <Text style={styles.iconText}>🖼️</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Gallery</Text>
        </View>
      </View>
    </AppSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: verticalScale(32),
    marginBottom: verticalScale(40),
  },
  optionContainer: {
    alignItems: 'center',
    marginRight: scale(30),
  },
  iconButton: {
    padding: scale(12),
    borderRadius: scale(100),
    borderWidth: 1,
    borderColor: colors.hover || '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(60),
    height: scale(60),
  },
  iconText: {
    fontSize: scale(24),
    color: colors.hint || '#BDBDBD',
  },
  label: {
    marginTop: verticalScale(6),
    fontSize: scale(14),
    color: colors.hint || '#BDBDBD',
    textAlign: 'center',
  },
});

export default PickImage;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import PickImage from './components/PickImage';

const MyProfile = () => {
  return (
    <PickImage 
      title="اختر صورة الملف الشخصي" 
      onImagePicked={(file) => console.log('تم اختيار الصورة من:', file.source)} 
    />
  );
};
*/
