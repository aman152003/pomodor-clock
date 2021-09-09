import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [breakLength, setBreakLength] = useState(5 * 60);
  const [sessionLength, setSessionLength] = useState(25 * 60);
  const [counter, setCounter] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const formatCounterTime = (time) => {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    return (
      (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs)
    );
  };
  const formatInputTime = (time) => {
    return time / 60;
  };
  return (
    <AppContext.Provider
      value={{
        breakLength,
        setBreakLength,
        sessionLength,
        setSessionLength,
        counter,
        setCounter,
        timerOn,
        setTimerOn,
        isBreak,
        setIsBreak,
        formatCounterTime,
        formatInputTime,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
