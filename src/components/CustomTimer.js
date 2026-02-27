import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';

/**
 * Parses seconds into a CustomTimer object (days, hours, minutes, seconds)
 */
const getCustomTimer = (totalSeconds) => {
  let secDuration = totalSeconds;
  const days = Math.floor(secDuration / (24 * 60 * 60));
  secDuration -= days * (24 * 60 * 60);
  
  const hours = Math.floor(secDuration / (60 * 60));
  secDuration -= hours * (60 * 60);

  const minutes = Math.floor(secDuration / 60);
  secDuration -= minutes * 60;

  const seconds = secDuration;

  return { days, hours, minutes, seconds };
};

/**
 * CustomTimer component mirrors flutter's CustomTimerWidget
 * Takes a duration in seconds, an autoStart boolean, a builder function(timerObj),
 * and an onFinish callback.
 */
const CustomTimer = ({
  durationInSeconds,
  autoStart = false,
  builder, // function({ days, hours, minutes, seconds })
  onFinish,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(durationInSeconds);
  const [isActive, setIsActive] = useState(autoStart);

  useEffect(() => {
    let intervalId;

    if (isActive && secondsRemaining > 0) {
      intervalId = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setIsActive(false);
            if (onFinish) onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isActive && secondsRemaining === 0) {
      setIsActive(false);
      if (onFinish) onFinish();
    }

    return () => clearInterval(intervalId);
  }, [isActive, secondsRemaining, onFinish]);

  const timerObject = getCustomTimer(secondsRemaining);

  return (
    <View>
      {builder(timerObject)}
    </View>
  );
};

export default CustomTimer;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import CustomTimer from './components/CustomTimer';
import { Text } from 'react-native';

const MyTimerScreen = () => {
  return (
    <CustomTimer 
      durationInSeconds={120} // دقيقتين
      autoStart={true}
      onFinish={() => console.log('انتهى الوقت')}
      builder={({ minutes, seconds }) => (
        <Text>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</Text>
      )}
    />
  );
};
*/
