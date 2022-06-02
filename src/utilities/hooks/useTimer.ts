import { useEffect, useState } from 'react';

export const useTimer = (timerSeconds = 60) => {
  const [secondsLeft, setSecondsLeft] = useState(timerSeconds);
  const [active, setActive] = useState(false);
  const [dirty, setDirty] = useState(false);

  const startTimer = () => {
    if (timerSeconds !== secondsLeft) {
      setSecondsLeft(timerSeconds);
    }
    if (!dirty) {
      setDirty(true);
    }
    setActive(true);
  }

  // Ticks one second away every second
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        if (active) {
          const updatedSeconds = secondsLeft > 0 ? secondsLeft - 1 : 0;
          setSecondsLeft(updatedSeconds);
          setActive(updatedSeconds > 0);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [active, secondsLeft]);

  return { secondsLeft, active, dirty, startTimer };
}

export default useTimer;