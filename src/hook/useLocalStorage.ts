//generic type with generic initial value
// pass the generic type
// pass the values

import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, init: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null) {
      if (typeof init === "function") {
        return (init as () => T)();
      } else {
        return init;
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
};
