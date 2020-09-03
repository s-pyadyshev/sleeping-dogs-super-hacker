import * as React from "react";
import Counter from "../../components/Counter";

const CounterPage: React.SFC = () => {
  return (
    <div className="card">
      This page is just to test Counter component separately
      <Counter />
    </div>
  );
};

export default CounterPage;
