import ScreenTemplate from "./ScreenTemplate.screen";
import { render } from "test/setupFilesAfterEnv";

describe("ScreenTemplate screen", () => {
  it("renders without crashing", () => {
    render(<ScreenTemplate />);
  });
});
