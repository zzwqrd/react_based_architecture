import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';

/**
 * MainBottomSheet mirrors Flutter's mainBottomSheet method, but implemented
 * as a React Component with a Modal (or can be used with a ref to control visibility).
 * 
 * Usage using ref:
 * <MainBottomSheet ref={sheetRef}>
 *   <YourContent />
 * </MainBottomSheet>
 */
const MainBottomSheet = forwardRef(({ children, onClose }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => {
      setVisible(false);
      if (onClose) onClose();
    },
  }));

  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
        if (onClose) onClose();
      }}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
        />
        <View style={styles.sheetContainer}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.contentContainer}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheetContainer: {
    backgroundColor: colors.background || '#FFFFFF',
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
    maxHeight: verticalScale(700),
    paddingHorizontal: scale(24),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(30) : verticalScale(20),
    width: '100%',
  },
  handleContainer: {
    alignItems: 'center',
    marginVertical: verticalScale(24),
  },
  handle: {
    width: scale(132),
    height: verticalScale(4),
    backgroundColor: colors.hint || '#BDBDBD',
    borderRadius: scale(100),
  },
  contentContainer: {
    paddingBottom: verticalScale(20),
  },
});

export default MainBottomSheet;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import React, { useRef } from 'react';
import { View, Button, Text } from 'react-native';
import MainBottomSheet from './components/MainBottomSheet';

const MyScreen = () => {
  const sheetRef = useRef(null);

  return (
    <View>
      <Button title="افتح القائمة" onPress={() => sheetRef.current?.open()} />
      
      <MainBottomSheet ref={sheetRef} onClose={() => console.log('أُغلقت')}>
        <Text>محتوى القائمة السفلية</Text>
      </MainBottomSheet>
    </View>
  );
};
*/
