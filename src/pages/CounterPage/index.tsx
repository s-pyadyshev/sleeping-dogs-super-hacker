import * as React from "react";
import Counter from "../../components/Counter";

const CounterPage: React.FC = () => {
  return (
    <div className="card">
      This page is just to test Counter component separately
      <Counter />
    </div>
  );
};

export default CounterPage;
