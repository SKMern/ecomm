import React from "react";
import { act, fireEvent, render } from "../../Redux/utils-test";
import Register from "./index";
import api from "../../Api";
import { USER_REGISTRATION_SUCCESS } from "../../Redux/ActionTypes";

jest.mock("../../Api", () => ({
  post: jest.fn(), // Mock the post method
}));
jest.useFakeTimers();

describe("Register Page", () => {
  const renderComponent = () => render(<Register />);

  it("submitting_without_data", () => {
    const { getByText } = renderComponent();
    act(() => fireEvent.click(getByText("Register")));

    expect(getByText(/username cannot be empty/i)).toBeInTheDocument();
    expect(getByText(/Email cannot be empty/i)).toBeInTheDocument();
    expect(getByText(/Password cannot be empty/i)).toBeInTheDocument();
  });

  it("submitting_without_valid_formats", () => {
    const { getByText, getByTestId } = renderComponent();

    const userInput = getByTestId("userName");
    const emailInput = getByTestId("email");
    const passwordInput = getByTestId("password");
    const confirmPasswordInput = getByTestId("confirmPassword");

    fireEvent.change(userInput, { target: { value: "te" } });
    fireEvent.change(emailInput, { target: { value: "te" } });
    fireEvent.change(passwordInput, { target: { value: "te" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "tet" } });

    act(() => fireEvent.click(getByText("Register")));

    expect(getByText(/Enter min 3 char/i)).toBeInTheDocument();
    expect(getByText(/Enter valid email/i)).toBeInTheDocument();
    expect(getByText(/Password must contain min 8 char/i)).toBeTruthy();
    expect(getByText(/Password doesn't match/i)).toBeTruthy();
  });

  it("Submitting_with_existing_username_apiResponse_mock", async () => {
    const mockedPost = jest.spyOn(api, "post");
    const message = "Username already exist";
    mockedPost.mockRejectedValue({
      response: { data: { message } },
    });

    const { getByText, getByTestId } = renderComponent();

    const nameInput = getByTestId("name");
    const userInput = getByTestId("userName");
    const emailInput = getByTestId("email");
    const passwordInput = getByTestId("password");
    const confirmPasswordInput = getByTestId("confirmPassword");

    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(userInput, { target: { value: "test" } });
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Test123@" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Test123@" } });

    act(() => fireEvent.click(getByText("Register")));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText(message)).toBeInTheDocument();
  });

  it("Submitting_with_valid_data_and_check_success", async () => {
    const mockedPost = jest.spyOn(api, "post");
    const message = USER_REGISTRATION_SUCCESS;
    mockedPost.mockResolvedValue({
      data: { data: { message } },
    });

    const { getByText, getByTestId, queryByRole, getByRole } =
      renderComponent();
    expect(queryByRole("dialog")).toBeNull();

    const nameInput = getByTestId("name");
    const userInput = getByTestId("userName");
    const emailInput = getByTestId("email");
    const passwordInput = getByTestId("password");
    const confirmPasswordInput = getByTestId("confirmPassword");

    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(userInput, { target: { value: "test" } });
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "Test123@" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Test123@" } });

    act(() => fireEvent.click(getByText("Register")));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(queryByRole("dialog")).toBeInTheDocument();
    expect(getByText(/Resgistration success/i)).toBeInTheDocument();

    fireEvent.click(getByRole("button", { name: "Ok" }));
    expect(window.location.pathname).toBe("/login");
  });
});
