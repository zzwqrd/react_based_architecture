import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming MaterialIcons is available

const AppCustomForm = ({
  hintText,
  value,
  onChangeText,
  onTap,
  readOnly = false,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={hintText}
        placeholderTextColor={colors.icon || '#999'}
        editable={!readOnly}
        onPressIn={onTap}
        textAlign="right" // Mirrors Flutter's textAlign: TextAlign.right
        style={styles.input}
        {...props}
      />
      <View style={styles.iconContainer}>
        <Icon name="search" size={scale(24)} color={colors.primary || '#000'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(40),
    backgroundColor: colors.white || '#FFF',
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#E0E0E0', // Colors.grey.shade300
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
  },
  input: {
    flex: 1,
    fontSize: scale(14),
    color: colors.textPrimary || '#000',
    paddingVertical: verticalScale(8),
  },
  iconContainer: {
    marginStart: scale(8),
  },
});

export default AppCustomForm;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import AppCustomForm from './components/AppCustomForm';
import { useState } from 'react';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppCustomForm 
      hintText="ابحث عما تريد..." 
      value={searchQuery} 
      onChangeText={setSearchQuery} 
      // onTap={() => console.log('تم الضغط على الحقل')} // يمكن استخدامه لفتح شاشة بحث أخرى
      // readOnly={true} // لمنع الكتابة المباشرة إذا كان الحقل للضغط فقط
    />
  );
};
*/
