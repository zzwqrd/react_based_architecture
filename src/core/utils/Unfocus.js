import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet } from 'react-native';

/**
 * Unfocus.js
 * Mirrors Flutter's Unfocus widget.
 * Dismisses the keyboard when clicking outside of inputs.
 */

const Unfocus = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.flex}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default Unfocus;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import Unfocus from './core/utils/Unfocus';
import { TextInput, View } from 'react-native';

const KeyboardScreen = () => {
  return (
    <Unfocus>
      <View style={{ flex: 1, padding: 20 }}>
        <TextInput placeholder="انقر هنا للكتابة ثم انقر بالخارج للإخفاء" />
      </View>
    </Unfocus>
  );
};
*/
