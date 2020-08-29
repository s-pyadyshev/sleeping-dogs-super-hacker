import * as React from "react";
import Scoreboard from "../../components/Scoreboard";

export interface HighScorePageProps {}

const HighScorePage: React.SFC<HighScorePageProps> = () => {
  return <Scoreboard />;
};

export default HighScorePage;
