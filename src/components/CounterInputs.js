import React, { useContext } from "react";

import { AppContext } from "./context";
import "./CounterInputs.scss";

function CounterInputs() {
  const {
    breakLength,
    setBreakLength,
    sessionLength,
    setSessionLength,
    formatInputTime,
    timerOn,
    setCounter,
    isBreak,
  } = useContext(AppContext);

  /* Functions to Increase and Decrease Break length and Session length */

  const changeBreakLength = (type) => {
    if (timerOn === false) {
      switch (type) {
        case "increase":
          breakLength < 3600
            ? setBreakLength((prev) => prev + 60)
            : setBreakLength(breakLength);
          break;
        case "decrease":
          breakLength > 60
            ? setBreakLength((prev) => prev - 60)
            : setBreakLength(breakLength);
          break;
        default:
          break;
      }
    } else {
      return;
    }
  };

  const changeSessionLength = (type) => {
    if (timerOn === false && isBreak === false) {
      switch (type) {
        case "increase":
          sessionLength < 3600
            ? setSessionLength((prev) => prev + 60)
            : setSessionLength(sessionLength);
          if (sessionLength < 3600) {
            setCounter(sessionLength + 60);
          } else {
            setCounter(sessionLength);
          }
          break;
        case "decrease":
          sessionLength > 60
            ? setSessionLength((prev) => prev - 60)
            : setSessionLength(sessionLength);
          if (sessionLength > 60) {
            setCounter(sessionLength - 60);
          } else {
            setCounter(sessionLength);
          }
          break;
        default:
          break;
      }
    } else {
      return;
    }
  };

  return (
    <div className="counter-inputs">
      <div className="input">
        <h2 id="break-label">Break Length</h2>
        <h3 id="break-length">{formatInputTime(breakLength)}</h3>
        <div className="btns">
          <div
            onClick={() => {
              changeBreakLength("decrease");
            }}
            id="break-decrement"
            className="btn"
          >
            <i className="fas fa-minus"></i>
          </div>
          <div
            onClick={() => {
              changeBreakLength("increase");
            }}
            id="break-increment"
            className="btn"
          >
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
      <div className="input">
        <h2 id="session-label">Session Length</h2>
        <h3 id="session-length">{formatInputTime(sessionLength)}</h3>
        <div className="btns">
          <div
            onClick={() => {
              changeSessionLength("decrease");
            }}
            id="session-decrement"
            className="btn"
          >
            <i className="fas fa-minus"></i>
          </div>
          <div
            onClick={() => {
              changeSessionLength("increase");
            }}
            id="session-increment"
            className="btn"
          >
            <i className="fas fa-plus"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounterInputs;
