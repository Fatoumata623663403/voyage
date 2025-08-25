import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Effet pour synchroniser localStorage quand storedValue change
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // setValue modifie seulement l'état React
  const setValue = (value: T | ((val: T) => T)) => {
    setStoredValue(prev => {
      return value instanceof Function ? value(prev) : value;
    });
  };

  return [storedValue, setValue] as const;
}
