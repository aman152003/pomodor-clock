import React from "react";

import "./App.scss";
import CounterInputs from "./components/CounterInputs";
import Counter from "./components/Counter";

const App = () => {
  return (
    <div className="app">
      <div className="clock">
        <CounterInputs />
        <Counter />
      </div>
    </div>
  );
};

export default App;
