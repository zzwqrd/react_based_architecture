import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';
import CustomTimer from './CustomTimer';

/**
 * ResendTimerWidget mirroring the Flutter version.
 * Displays "resend" text acting as a button when timer finishes,
 * alongside a countdown timer.
 */
const ResendTimerWidget = ({ onTap, loading, durationInSeconds = 60 }) => {
  return (
    <View style={styles.container}>
      <CustomTimer
        durationInSeconds={durationInSeconds}
        autoStart={true}
        builder={({ minutes, seconds }) => {
          const isFinished = minutes === 0 && seconds === 0;

          return (
            <View style={styles.row}>
              <TouchableOpacity
                onPress={isFinished ? onTap : undefined}
                disabled={!isFinished || loading}
              >
                <Text style={styles.resendText}>
                  {/* The Flutter app had generic 'resend' text and logic. */}
                  إعادة الإرسال
                  <Text
                    style={[
                      styles.resendAction,
                      { color: isFinished ? (colors.primary || '#000') : (colors.hint || '#BDBDBD') },
                    ]}
                  >
                     تفعيل
                  </Text>
                </Text>
              </TouchableOpacity>

              <View style={styles.spacer} />

              <Text style={styles.timerText}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  resendText: {
    fontSize: scale(14),
    fontWeight: '500',
    color: colors.textPrimary || '#000',
  },
  resendAction: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  spacer: {
    flex: 1,
  },
  timerText: {
    fontSize: scale(14),
    color: colors.hint || '#BDBDBD',
  },
});

export default ResendTimerWidget;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import ResendTimerWidget from './components/ResendTimerWidget';

const OTPScreen = () => {
  return (
    <ResendTimerWidget 
      durationInSeconds={60} 
      loading={false}
      onTap={() => console.log('إعادة إرسال الرمز...')} 
    />
  );
};
*/
