import React, { useState, useCallback, createContext, useContext } from 'react';

/**
 * PhoenixHelper.js
 * Mirrors Flutter's Phoenix widget.
 * Provides a way to restart the app (force re-render from root).
 */

const PhoenixContext = createContext(null);

export const Phoenix = ({ children }) => {
  const [key, setKey] = useState(0);

  const rebirth = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  return (
    <PhoenixContext.Provider value={rebirth}>
      <React.Fragment key={key}>
        {children}
      </React.Fragment>
    </PhoenixContext.Provider>
  );
};

export const usePhoenix = () => {
  const rebirth = useContext(PhoenixContext);
  if (!rebirth) {
    throw new Error('usePhoenix must be used within a Phoenix provider');
  }
  return rebirth;
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { Phoenix, usePhoenix } from './core/utils/PhoenixHelper';
import { Button } from 'react-native';

// يجب أن يتم تغليف التطبيق بالكامل بـ Phoenix في index.js أو App.js
// <Phoenix><App /></Phoenix>

const ResetScreen = () => {
  const restartApp = usePhoenix();

  return (
    <Button title="إعادة تشغيل التطبيق" onPress={restartApp} />
  );
};
*/
