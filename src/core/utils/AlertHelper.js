import { Alert } from 'react-native';
import i18next from 'i18next';

/**
 * AlertHelper.js
 * Mirrors Flutter's FlashHelper, DialogExtension, and SheetExtension.
 * Provides unified way to show alerts, toasts, and dialogs.
 */

export const AlertHelper = {
  /**
   * Shows a basic alert (mirrors FlashHelper and DialogExtension)
   */
  showAlert: (message, title = '', onConfirm = null) => {
    if (!message) return;
    
    const buttons = [
      {
        text: i18next.t('CANCEL') || 'Cancel',
        style: 'cancel',
      },
      {
        text: i18next.t('CONFIRM') || 'Confirm',
        onPress: onConfirm,
      }
    ];

    Alert.alert(title, message, onConfirm ? buttons : [{ text: 'OK' }]);
  },

  

  /**
   * Toast equivalents - for now using Alert if no toast library is installed,
   * but providing the same API for future-proofing.
   */
  showToast: (msg) => {
    console.log(`[Toast] ${msg}`);
    // In a real app, use react-native-root-toast or similar
    Alert.alert('', msg);
  },

  successToast: (msg) => AlertHelper.showToast(msg),
  failToast: (msg) => AlertHelper.showToast(msg),
  warningToast: (msg) => AlertHelper.showToast(msg),

  /**
   * Custom dialog with confirm/cancel (mirrors showCustomDialog)
   */
  showCustomDialog: ({ title, content, onConfirm }) => {
    AlertHelper.showAlert(content, title, onConfirm);
  },
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { AlertHelper } from './core/utils/AlertHelper';

const ActionScreen = () => {
  const handleDelete = () => {
    AlertHelper.showConfirmAlert(
      "حذف العنصر", 
      "هل أنت متأكد من الحذف؟", 
      () => console.log('تم تأكيد الحذف'),
      () => console.log('تم الإلغاء')
    );
  };
  // يمكن أيضاً استخدام AlertHelper.showSuccessAlert("تم بنجاح!");
};
*/
