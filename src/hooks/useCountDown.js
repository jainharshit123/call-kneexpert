import { useState, useEffect } from 'react';

// The total duration for a "new lead" status in milliseconds (e.g., 4 hours)
const NEW_LEAD_DURATION = 4 * 60 * 60 * 1000;

const useCountdown = (creationTime) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const created = new Date(creationTime);
      const elapsedTime = now - created;

      if (elapsedTime >= NEW_LEAD_DURATION) {
        setTimeLeft(null); // Timer has expired
        return;
      }

      const remainingTime = NEW_LEAD_DURATION - elapsedTime;
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      
      // Pad minutes with a leading zero if needed
      const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      setTimeLeft(`${hours}h ${paddedMinutes}m`);
    };

    // Calculate immediately on mount
    calculateTimeLeft();

    // Set up an interval to update the timer every second
    const timerInterval = setInterval(calculateTimeLeft, 1000);

    // Clean up the interval when the component unmounts or the creationTime changes
    return () => clearInterval(timerInterval);
  }, [creationTime]);

  return timeLeft;
};

export default useCountdown;
