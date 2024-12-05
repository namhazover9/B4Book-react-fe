import React, { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass  initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to get the value from localStorage
      const item = window.localStorage.getItem(key);

      // If item exists, parse it, otherwise return the initial value
      if (item) {
        return item === 'true'
          ? true
          : item === 'false'
          ? false
          : JSON.parse(item);
      } else {
        return initialValue;
      }
    } catch (error) {
      // If error occurs (e.g. parsing error), return the initial value
      console.log(error);
      return initialValue;
    }
  });

  // useEffect to update localStorage when the state changes
  useEffect(() => {
    try {
      // If storedValue is a function, invoke it, otherwise store the value directly
      const valueToStore =
        typeof storedValue === 'function' ? storedValue(storedValue) : storedValue;

      // Save the value to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Handle any potential errors in saving to localStorage
      console.log(error);
    }
  }, [key, storedValue]);

  // Function to set the value in both state and localStorage
  const setValue = (newValue) => {
    try {
      // If newValue is a function, invoke it, otherwise set the value directly
      const value = typeof newValue === 'function' ? newValue(storedValue) : newValue;

      setStoredValue(value);
    } catch (err) {
      console.error('Error setting value to localStorage:', err);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
