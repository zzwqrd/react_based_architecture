import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';

/**
 * PinCode component mirroring the Flutter CustomPinCode widget.
 * A 4-digit OTP/PIN code input using separate text inputs for style parity.
 */
const PinCode = ({ length = 4, onCompleted }) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to next input if not empty
    if (text !== '' && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    // Check if completed
    if (newCode.every((digit) => digit !== '')) {
      if (onCompleted) onCompleted(newCode.join(''));
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => {
        const isActive = digit !== '';
        return (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={[
              styles.input,
              {
                borderColor: isActive ? colors.secondary || '#000' : colors.hover || '#E0E0E0',
                backgroundColor: colors.primaryLight || '#F5F5F5',
              },
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    width: scale(66),
    height: scale(66),
    borderRadius: scale(10),
    borderWidth: scale(1),
    textAlign: 'center',
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PinCode;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import PinCode from './components/PinCode';

const OTPScreen = () => {
  return (
    <PinCode 
      length={4} 
      onCompleted={(code) => console.log('رمز التحقق المُدخل:', code)} 
    />
  );
};
*/
