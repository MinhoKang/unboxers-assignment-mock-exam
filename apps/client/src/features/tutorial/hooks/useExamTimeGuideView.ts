import { useEffect, useState } from "react";

export const useExamTimeGuideView = () => {
  const [remainingTime, setRemainingTime] = useState(10); // 10초로 시작

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    remainingTime,
  };
};
