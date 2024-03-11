import React from "react";

import { render } from "setupTests";
import Error from "./Error";

describe("Error", () => {
  it("renders with default props", () => {
    render(<Error />);
  });
});