import ScreenTemplate from "./ScreenTemplate.screen";
import { render } from "test/setupFilesAfterEnv";
import { describe, it } from "node:test";

describe("ScreenTemplate screen", () => {
  it("renders without crashing", () => {
    render(<ScreenTemplate />);
  });
});
