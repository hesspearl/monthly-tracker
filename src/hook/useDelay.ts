import { useEffect, useState } from "react";

export const useDelay = (time: number) => {
  const [loadActive, setLoadActive] = useState(false);
  const [startLoadActive, setStartLoadActive] = useState(false);
  useEffect(() => {
    if (startLoadActive) {
      setTimeout(() => {
        setLoadActive(true);
        setStartLoadActive(false);
      }, time);
    }
  }, [startLoadActive, time]);

  return { loadActive, setLoadActive, setStartLoadActive };
};
