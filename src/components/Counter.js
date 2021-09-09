import React, { useContext, useEffect, useRef } from "react";

import "./Counter.scss";
import { AppContext } from "./context";
import Button from "./Button";
import alarmSound from "../alarm-sound.wav";

function Counter() {
  const {
    counter,
    setIsBreak,
    timerOn,
    breakLength,
    sessionLength,
    isBreak,
    formatCounterTime,
    setTimerOn,
    setCounter,
    setBreakLength,
    setSessionLength,
  } = useContext(AppContext);

  const audio = useRef(null);

  useEffect(() => {
    if (counter <= 0) {
      setIsBreak(true);
      audio.current.play();
    } else if (!timerOn && counter === breakLength) {
      setIsBreak(false);
    }
  }, [counter, isBreak, setIsBreak, timerOn, breakLength, sessionLength]);

  const resetTimer = () => {
    clearInterval(localStorage.getItem("interval-id"));
    setCounter(25 * 60);
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimerOn(false);
    setIsBreak(false);
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  const timerControl = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let isBreakVariable = isBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setCounter((prev) => {
            if (prev <= 0 && !isBreakVariable) {
              audio.current.play();
              isBreakVariable = true;
              return breakLength;
            } else if (prev <= 0 && isBreakVariable) {
              audio.current.play();
              isBreakVariable = false;
              setIsBreak(false);
              return sessionLength;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  return (
    <div className="counter">
      <h2 id="timer-label">{isBreak ? "Break" : "Session"}</h2>
      <h1 id="time-left">{formatCounterTime(counter)}</h1>
      <div className="counter-btns">
        <div onClick={timerControl} id="start_stop">
          {timerOn ? <Button name="Pause" /> : <Button name="Play" />}
        </div>
        <div onClick={resetTimer} id="reset">
          <Button name="Reset" />
        </div>
      </div>
      <audio ref={audio} id="beep">
        <source src={alarmSound} type="audio/wav" />
      </audio>
    </div>
  );
}

export default Counter;
