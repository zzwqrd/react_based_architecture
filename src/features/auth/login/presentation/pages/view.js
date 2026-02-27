// ─── LoginScreen (Pure UI) ──────────────────────────────────────────────────
// Mirrors Flutter's LoginView.
// Has ZERO business logic — all state and actions come from useLoginController.

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { useTranslation } from '../../../../../../node_modules/react-i18next';
import { scale, verticalScale } from 'react-native-size-matters';

import AppField from '../../../../../components/AppField';
import AppButton from '../../../../../components/AppButton';
import AppText from '../../../../../components/AppText';
import { colors } from '../../../../../core/themes/colors';
import AppAssets from '../../../../../core/utils/AppAssets';
import useLoginController from '../controller/controller';

const LoginScreen = () => {
  const { t } = useTranslation();

  const {
    email, setEmail,
    password, setPassword,
    loading,
    login,
    loginAsGuest,
  } = useLoginController();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={AppAssets.icons.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          {/* <AppText.Heading title="FAKESTORE" color={colors.primary} /> */}
        </View>

        {/* Email field */}
        <AppField.Email
          hintText={t('auth.email_placeholder')}
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.fieldSpacing} />

        {/* Password field */}
        <AppField.Password
          hintText={t('auth.password_placeholder')}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.buttonSpacing} />

        {/* Login button */}
        <AppButton
          label={t('auth.login_button')}
          onPress={login}
          isLoading={loading}
        />

        <View style={styles.guestSpacing} />

        {/* Guest entry */}
        <TouchableOpacity onPress={loginAsGuest}>
          <AppText
            text="الدخول كا زائر"
            color={colors.textSecondary}
            decoration="underline"
            fontSize={scale(14)}
            align="center"
          />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(32),
  },
  logo: {
    width: scale(100),
    height: scale(100),
    marginBottom: verticalScale(16),
  },
  fieldSpacing: { height: verticalScale(12) },
  buttonSpacing: { height: verticalScale(24) },
  guestSpacing: { height: verticalScale(16) },
});

export default LoginScreen;
