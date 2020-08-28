import * as React from "react";
import Scoreboard from "../../components/Scoreboard";

export interface HighScorePageProps {}

const HighScorePage: React.SFC<HighScorePageProps> = () => {
  return (
    <div>
      <Scoreboard />
    </div>
  );
};

export default HighScorePage;
