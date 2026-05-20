import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Loading } from "../Loading";

describe("Loading", () => {
  it("renders without crashing", () => {
    render(<Loading />);
  });
});
