import React from "react";
import { act, fireEvent, render } from "../../../Redux/utils-test";
import AddProduct from "../AddProduct";
import api from "../../../Api";

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

jest.mock("../../../Api", () => ({
  post: jest.fn(),
}));
jest.useFakeTimers();

describe("Add/Edit Product", () => {
  const renderComponent = (state = {}) => render(<AddProduct />, state);

  it("Add_product_renders_without_error", () => {
    const { getByText } = renderComponent();
    expect(getByText(/submit/i)).toBeInTheDocument();
  });
  // test for error message when submitting without data
  it("submitting_without_data_to_check_error", () => {
    const { getByText } = renderComponent();
    fireEvent.click(getByText("Submit"));

    expect(getByText(/title cannot be empty/i)).toBeTruthy();
    expect(getByText(/Image url cannot be empty/i)).toBeInTheDocument();
  });

  it("submitting_with_valid_data", async () => {
    const mockedPost = jest.spyOn(api, "post");
    const message = "Product added successfully";
    mockedPost.mockRejectedValue({
      response: { data: { message } },
    });
    const mockedState = {
      Products: { products: [], addMessage: message, loader: false },
    };

    const { getByText, getByTestId, queryByRole } =
      renderComponent(mockedState);

    const titleInput = getByTestId("title");
    const imageInput = getByTestId("image");
    const priceInput = getByTestId("price");
    const descInput = getByTestId("description");

    fireEvent.change(titleInput, { target: { value: "test" } });
    fireEvent.change(imageInput, { target: { value: "test" } });
    fireEvent.change(priceInput, { target: { value: 20 } });
    fireEvent.change(descInput, { target: { value: "test desc" } });

    act(() => fireEvent.click(getByText("Submit")));
    //api response timeout
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(queryByRole("dialog")).toBeInTheDocument();
    expect(getByText(/Product Add success/i)).toBeInTheDocument();
    act(() => fireEvent.click(getByText("Ok")));
    expect(window.location.pathname).toBe("/profile");
  });

  it("Check_edit_product_with_mockdata", () => {
    // Mock window.location.pathname
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/edit/23",
      },
      writable: true,
    });
    const mockedState = {
      Products: { products: [editMockData], loader: false },
    };
    const { getByTestId } = renderComponent(mockedState);

    const nameInput = getByTestId("title").getAttribute("value");
    expect(nameInput).toBe("test one");
  });
});
