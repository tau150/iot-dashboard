import { useEffect, useState, useRef } from "react";

interface UseThrottleParams<T> {
  value: T;
  isImmediateReturn?: boolean;
  interval?: number;
}
export const useThrottle = <T>({
  value,
  isImmediateReturn,
  interval = 1000,
}: UseThrottleParams<T>): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if (isImmediateReturn) {
      setThrottledValue(value);

      return;
    }
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval);

      return () => clearTimeout(timerId);
    }
  }, [value, interval, isImmediateReturn]);

  return throttledValue;
};
