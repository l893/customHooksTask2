import { useState, useCallback } from 'react';
import type { LocalStorageReturnValue, UseLocalStorage } from '../types/types';

export const useLocalStorage: UseLocalStorage = (
  key: string,
  defaultValue?: string,
) => {
  const [value, setValue] = useState<LocalStorageReturnValue>(() => {
    if (typeof window === 'undefined') {
      return defaultValue ?? null;
    }

    try {
      const stored = window.localStorage.getItem(key);

      // Если значения нет, но есть defaultValue - сохраняем его
      if (stored === null && defaultValue !== undefined) {
        window.localStorage.setItem(key, defaultValue);
        return defaultValue;
      }

      return stored;
    } catch {
      return defaultValue ?? null;
    }
  });

  const setItem = useCallback(
    (newValue: string) => {
      try {
        window.localStorage.setItem(key, newValue);
        setValue(newValue);
      } catch (error) {
        console.error('LocalStorage set error:', error);
      }
    },
    [key],
  );

  const removeItem = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error('LocalStorage remove error:', error);
    }
  }, [key]);

  return [value, { setItem, removeItem }];
};
