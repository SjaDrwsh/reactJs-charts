import App from "./App";
import { mount } from "enzyme";

test("renders learn react link", () => {
  const app = mount(<App />);
  expect(app).toBeDefined();
});
