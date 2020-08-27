import * as React from "react";
import Counter from "../../components/Counter";

export interface CounterPageProps {}

const CounterPage: React.SFC<CounterPageProps> = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

export default CounterPage;
