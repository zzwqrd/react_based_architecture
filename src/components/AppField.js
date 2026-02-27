import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';
import { CustomProgress } from './Loading';

/**
 * Unified AppField component mirroring Flutter's AppCustomForm (app_field.dart).
 */
const AppField = ({
  hintText,
  title,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  validator,
  isRequired = true,
  loading = false,
  onTap,    // mirrors onTap (read-only tap)
  onChanged, // for consistency with Flutter naming
  suffixIcon,
  prefixIcon,
  fillColor,
  maxLines = 1,
  withBorder = true,
  editable = true,
  style,
  initialValue,
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);

  const isPassword = keyboardType === 'visible-password' || secureTextEntry;
  const isReadOnly = !!onTap;

  const handleBlur = () => {
    if (validator) {
      const result = validator(value);
      setError(result || null);
    }
  };

  const handleChangeText = (text) => {
    if (onChangeText) onChangeText(text);
    if (onChanged) onChanged(text);
  };

  const renderSuffix = () => {
    if (suffixIcon) return suffixIcon;
    if (loading) return (
      <View style={styles.suffixIconContainer}>
        <CustomProgress size={scale(15)} />
      </View>
    );
    if (isReadOnly)
      return (
        <View style={styles.suffixIconContainer}>
           <Text style={{ fontSize: scale(16), color: "#113342" }}>▼</Text>
        </View>
      );
    if (isPassword)
      return (
        <TouchableOpacity 
           style={styles.suffixIconContainer}
           onPress={() => setShowPass((prev) => !prev)}
        >
          <Text style={{ fontSize: scale(16), color: showPass ? colors.secondary : colors.icon }}>
            {showPass ? '👁' : '🙈'}
          </Text>
        </TouchableOpacity>
      );
    return null;
  };

  return (
    <View style={[styles.container, style]}>
      {title && title.trim() !== '' && (
        <Text style={styles.label}>{title}</Text>
      )}
      <TouchableOpacity
        activeOpacity={isReadOnly ? 0.8 : 1}
        onPress={isReadOnly ? onTap : undefined}
      >
        <View
          style={[
            styles.inputContainer,
            { backgroundColor: fillColor || colors.white },
            withBorder ? styles.border : {},
          ]}
        >
          {prefixIcon && (
            <View style={styles.prefixContainer}>{prefixIcon}</View>
          )}
          <TextInput
            defaultValue={initialValue}
            value={value}
            onChangeText={handleChangeText}
            placeholder={hintText || title || ''}
            placeholderTextColor={colors.icon || '#999'}
            keyboardType={isPassword ? 'default' : keyboardType}
            secureTextEntry={isPassword && !showPass}
            multiline={maxLines > 1}
            numberOfLines={maxLines}
            editable={!isReadOnly && editable && !loading}
            returnKeyType={maxLines === 1 ? 'done' : 'default'}
            onBlur={handleBlur}
            textAlign={props.textAlign || (Platform.OS === 'android' ? 'right' : 'auto')}
            style={[
              styles.input,
              maxLines > 1 && { minHeight: verticalScale(80), textAlignVertical: 'top' },
            ]}
            {...props}
          />
          {renderSuffix()}
        </View>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

// --- Static Factory Methods mirroring AppCustomForm factory constructors ---

AppField.Email = (props) => (
  <AppField
    title={props.title || "البريد الإلكتروني"}
    keyboardType="email-address"
    validator={(v) => {
      if (props.isRequired && (!v || v.trim() === '')) return 'This field is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (v && !emailRegex.test(v)) return 'Invalid email address';
      return null;
    }}
    {...props}
  />
);

AppField.Password = (props) => (
  <AppField
    title={props.title || "كلمة المرور"}
    keyboardType="visible-password"
    secureTextEntry={true}
    validator={(v) => {
      if (!v || v.length < 6) return 'Password must be at least 6 characters';
      return null;
    }}
    {...props}
  />
);

AppField.ConfirmPassword = ({ passwordValue, ...props }) => (
  <AppField
    title={props.title || "تأكيد كلمة المرور"}
    keyboardType="visible-password"
    secureTextEntry={true}
    validator={(v) => {
      if (props.isRequired && (!v || v.trim() === '')) return 'This field is required';
      if (v !== passwordValue) return 'Passwords do not match';
      return null;
    }}
    {...props}
  />
);

AppField.Phone = (props) => (
  <AppField
    title={props.title || "رقم الهاتف"}
    keyboardType="phone-pad"
    {...props}
  />
);

AppField.Text = (props) => (
  <AppField
    keyboardType="default"
    validator={(v) => {
      if (props.isRequired && (!v || v.trim() === '')) return 'This field is required';
      return null;
    }}
    {...props}
  />
);

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: scale(14),
    fontWeight: '500',
    color: colors.textPrimary || '#333',
    marginBottom: verticalScale(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(12),
    paddingHorizontal: scale(16),
    minHeight: verticalScale(55),
  },
  border: {
    borderWidth: 1,
    borderColor: colors.border || '#ddd',
  },
  prefixContainer: {
    marginEnd: scale(10),
  },
  suffixIconContainer: {
    marginStart: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: scale(24),
  },
  input: {
    flex: 1,
    fontSize: scale(15),
    color: colors.textPrimary || '#000',
    paddingVertical: verticalScale(10),
  },
  error: {
    fontSize: scale(12),
    color: colors.error || 'red',
    marginTop: verticalScale(4),
  },
});

export default AppField;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import AppField from './components/AppField';
import { useState } from 'react';

const FormScreen = () => {
  const [email, setEmail] = useState('');

  return (
    <AppField 
      placeholder="البريد الإلكتروني" 
      value={email} 
      onChangeText={setEmail} 
      keyboardType="email-address"
    />
  );
};
*/
