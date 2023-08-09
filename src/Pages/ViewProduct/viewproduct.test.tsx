import React from "react";
import ViewProduct from "./index";
import { render } from "../../Redux/utils-test";

jest.mock("../../Api", () => {});

const editMockData = {
  _id: "64cb437967ff1f001c4369c3",
  id: 23,
  title: "test one",
  description: "test desc",
  category: "bags",
  image: "test",
  rating: 4,
  netWeight: 500,
  grossWeight: 500,
  price: 20,
  discPrice: 500,
  __v: 0,
};

describe("View product", () => {
  Object.defineProperty(window, "location", {
    value: {
      pathname: "/product/23",
    },
    writable: true,
  });
  const mockedState = {
    Products: { products: [editMockData], loader: false },
  };

  it("view product renders without error", () => {
    const { getByText } = render(<ViewProduct />, mockedState);

    expect(getByText("test one")).toBeTruthy();
  });
});
