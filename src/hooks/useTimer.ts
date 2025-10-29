import { useEffect, useState } from "react";

export const useTimer = (
  initialTime: number,
  onFinish: () => void,
  storageKey = "quiz_timer",
) => {
  const [time, setTime] = useState<number>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? parseInt(stored, 10) : initialTime;
  });

  useEffect(() => {
    if (time <= 0) {
      localStorage.removeItem(storageKey);
      onFinish();
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => {
        const next = prev - 1;
        localStorage.setItem(storageKey, next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time, onFinish, storageKey]);

  return time;
};
