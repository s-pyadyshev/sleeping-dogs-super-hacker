import * as React from "react";
import Counter from "../../components/Counter";

export interface CounterPageProps {}

const CounterPage: React.SFC<CounterPageProps> = () => {
  return (
    <div>
      This page is just to test Counter component separately
      <Counter />
    </div>
  );
};

export default CounterPage;
