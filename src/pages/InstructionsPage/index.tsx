import * as React from "react";
import "./style.scss";

const InstructionsPage: React.FC = () => {
  return (
    <div className="instructions card">
      <p>
        Guess 4 UNIQUE digits. You have 6 attempts only. And the clock is
        ticking!
      </p>
      <p>
        <span className="icon-invalid-placement"></span>
        <span>Invalid placement</span>
      </p>
      <p>
        <span className="icon-invalid-digit"></span>
        <span>Invalid digit</span>
      </p>
      <p>
        <span className="icon-valid-digit"></span>
        <span>Valid digit</span>
      </p>
      <p>
        Use WASD (arrows on mobile) to navigate and increase/decrease digits.
        Press Enter to check validity.
      </p>
    </div>
  );
};

export default InstructionsPage;
