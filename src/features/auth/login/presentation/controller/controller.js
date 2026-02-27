// ─── Login Controller (Hook) ────────────────────────────────────────────────
// Mirrors Flutter's LoginCubit (login/presentation/manager/controller.dart)
// Contains ALL business logic. The view has ZERO logic.

import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../../../../../../node_modules/react-i18next';
import { loginStart, loginSuccess, loginFailure } from '../../../../../store/slices/authSlice';
import FlashHelper from '../../../../../core/utils/flashHelper';
import { Routes } from '../../../../../navigation/RootNavigator';
import { CompleteLoginUseCase } from '../../domain/usecases/usecases';
import AuthManager from '../../../../../core/auth/AuthManager';

/**
 * useLoginController
 * Mirrors Flutter's LoginCubit.
 * Holds email, password, loading state, and all action methods.
 * The view only calls these methods — no logic in the view.
 */
const useLoginController = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('ahmed@alicom.com');
  const [password, setPassword] = useState('Password123!');

  /**
   * Mirrors Flutter's login() method in LoginCubit.
   */
  const login = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      FlashHelper.failToast(t('auth.email_required_error') || 'يرجى إدخال البيانات');
      return;
    }

    dispatch(loginStart());

    try {
      const response = await CompleteLoginUseCase({ email: email.trim(), password: password.trim() });

      if (response.isSuccess) {
        const { token, customer } = response.data;

        // 🔐 Save auth data using AuthManager (mirrors Flutter's AuthManager.saveAuthData)
        await AuthManager.saveAuthData({
          token,
          email: email.trim(),
          name: customer?.firstname,
          customerId: customer?.id?.toString(),
        });

        dispatch(loginSuccess({ user: customer, token }));
        navigation.replace(Routes.LAYOUT);

        FlashHelper.successToast('تم تسجيل الدخول بنجاح');
      } else {
        const msg = response.message || t('auth.login_failed') || 'فشل تسجيل الدخول';
        dispatch(loginFailure(msg));
        FlashHelper.failToast(msg);
      }
    } catch (err) {
      const msg = err?.message || t('auth.login_failed') || 'فشل تسجيل الدخول';
      dispatch(loginFailure(msg));
      FlashHelper.failToast(msg);
    }
  }, [email, password, dispatch, navigation, t]);

  /**
   * Mirrors Flutter's guest entry navigation.
   */
  const loginAsGuest = useCallback(() => {
    navigation.replace(Routes.LAYOUT);
  }, [navigation]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    login,
    loginAsGuest,
  };
};

export default useLoginController;
