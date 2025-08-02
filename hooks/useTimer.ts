import { useState, useEffect, useRef } from 'react';

export interface TimerState {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isCompleted: boolean;
  totalSeconds: number;
  remainingSeconds: number;
  progress: number;
}

export const useTimer = (initialMinutes: number = 5) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progress = totalSeconds > 0 ? (totalSeconds - remainingSeconds) / totalSeconds : 0;

  const start = () => {
    if (!isRunning && remainingSeconds > 0) {
      setIsRunning(true);
      setIsCompleted(false);
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = (newMinutes?: number) => {
    setIsRunning(false);
    setIsCompleted(false);
    const newTotal = (newMinutes || initialMinutes) * 60;
    setTotalSeconds(newTotal);
    setRemainingSeconds(newTotal);
  };

  const stop = () => {
    setIsRunning(false);
    setIsCompleted(true);
  };

  const addTime = (minutesToAdd: number) => {
    const secondsToAdd = minutesToAdd * 60;
    setTotalSeconds(prev => prev + secondsToAdd);
    setRemainingSeconds(prev => prev + secondsToAdd);
  };

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remainingSeconds]);

  const timerState: TimerState = {
    minutes,
    seconds,
    isRunning,
    isCompleted,
    totalSeconds,
    remainingSeconds,
    progress,
  };

  return {
    ...timerState,
    start,
    pause,
    reset,
    stop,
    addTime,
  };
};
