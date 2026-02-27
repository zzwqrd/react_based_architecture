import { ToastAndroid, Alert, Platform } from 'react-native';

export const MessageType = Object.freeze({
  success: 'success',
  fail: 'fail',
  warning: 'warning',
});

const getBgColor = (type) => {
  switch (type) {
    case MessageType.success:
      return '#53A653';
    case MessageType.warning:
      return '#FFCC00';
    default:
      return '#EF233C';
  }
};

/**
 * Mirrors Flutter's FlashHelper.showToast
 * Uses ToastAndroid on Android, Alert on iOS (can swap for a toast library)
 */
const showToast = (msg, { duration = 2, type = MessageType.fail } = {}) => {
  if (!msg || msg.trim() === '') return;
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    // On iOS, show a simple Alert. Replace with a toast lib like react-native-toast-message for full parity.
    Alert.alert('', msg);
  }
};

const failToast = (msg) => showToast(msg, { type: MessageType.fail });
const successToast = (msg) => showToast(msg, { type: MessageType.success });
const warningToast = (msg) => showToast(msg, { type: MessageType.warning });

export const FlashHelper = {
  showToast,
  failToast,
  successToast,
  warningToast,
};

export default FlashHelper;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import FlashHelper from './core/utils/flashHelper';

const ActionButton = () => {
  const handleSuccess = () => {
    FlashHelper.successToast('تم الحفظ بنجاح!');
  };

  const handleError = () => {
    FlashHelper.failToast('حدث خطأ أثناء الاتصال');
  };
};
*/
