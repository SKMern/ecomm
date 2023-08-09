import React from "react";
import Header from "./index";
import { render } from "../../Redux/utils-test";

jest.mock("../../Api", () => ({
  getLocalAccessToken: jest.fn(),
}));

describe("Header Component", () => {
  it("Render without error", () => {
    const { getByRole } = render(<Header />);

    expect(getByRole("button", { name: "eComm" })).toBeTruthy();
  });
});
