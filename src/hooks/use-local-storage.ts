import { useState, useCallback } from 'react';
import type { LocalStorageReturnValue, UseLocalStorage } from '../types/types';

/**
 * Функция для получения начального значения из localStorage
 * с учетом дефолтного значения и SSR
 */
const getInitialValue = (
  key: string,
  defaultValue?: string,
): LocalStorageReturnValue => {
  // Проверка на серверном рендеринге
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
    // В случае ошибки (например, приватный режим) возвращаем дефолтное значение
    return defaultValue ?? null;
  }
};

export const useLocalStorage: UseLocalStorage = (
  key: string,
  defaultValue?: string,
) => {
  // Инициализация состояния с использованием отдельной функции
  const [value, setValue] = useState<LocalStorageReturnValue>(() =>
    getInitialValue(key, defaultValue),
  );

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
