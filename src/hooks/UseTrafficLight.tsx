const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
  blue: "bg-blue-500 animate-pulse",
};

type trafficLight = keyof typeof colors;

import { useEffect, useState } from "react";

export const UseTrafficLight = () => {
  const [light, setLight] = useState<trafficLight>("red");
  const [countdown, setCountdown] = useState(5);

  // //* countdown effect
  useEffect(() => {
    if (countdown === 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [countdown]);

  // //* change light color effect */
  useEffect(() => {
    if (countdown > 0) return;
    setCountdown(5);
    if (light === "red") {
      setLight("green");
      return;
    }
    if (light === "yellow") {
      setLight("red");
      return;
    }
    if (light === "green") {
      setLight("yellow");
      return;
    }
    return;
  }, [countdown, light]);

  return {
    //props
    countdown,

    //computed
    percentage: (countdown / 5) * 100,
    greenLight: light === "green" ? colors.green : "bg-gray-500",
    yellowLight: light === "yellow" ? colors.yellow : "bg-gray-500",
    redLight: light === "red" ? colors.red : "bg-gray-500",

    //methods
  };
};
