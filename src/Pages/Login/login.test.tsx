import React from "react";
import { act, fireEvent, render } from "../../Redux/utils-test";
import Login from "./index";
import api from "../../Api";

jest.mock("../../Api", () => ({
  post: jest.fn(), // Mock the post method
  // interceptors: {
  //   response: {
  //     use: jest.fn(),
  //   },
  //   request: {
  //     use: jest.fn(),
  //   },
  // },
}));
jest.useFakeTimers();

// localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("Login Page", () => {
  const renderComponent = () => render(<Login />);

  it("submitting_without_username_and_password", () => {
    const { getByText } = renderComponent();
    fireEvent.click(getByText("Login"));

    expect(getByText(/Username cannot be empty/i)).toBeTruthy();
    expect(getByText(/password cannot be empty/i)).toBeInTheDocument();
  });

  it("submitting_with_ invalid_username_and_password", async () => {
    const mockedPost = jest.spyOn(api, "post");
    const message = "User not found";
    mockedPost.mockRejectedValue({
      response: { data: { message } },
    });

    const { getByText, getByTestId } = renderComponent();

    const userInput = getByTestId("username-input");
    const passwordInput = getByTestId("password-input");
    fireEvent.change(userInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    act(() => fireEvent.click(getByText("Login")));

    //api response timeout
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(getByText(message)).toBeInTheDocument();
  });

  it("submitting_with_valid_username_password_to_get_accessToken", async () => {
    const mockedPost = jest.spyOn(api, "post");
    const accessTokenMock = "mocked_access_token";
    const refreshTokenMock = "mocked_refresh_token";
    const message = "login successfule";
    mockedPost.mockResolvedValue({
      data: {
        data: { token: accessTokenMock, refreshToken: refreshTokenMock },
        message,
      },
    });

    const { getByText, getByTestId } = renderComponent();

    const userInput = getByTestId("username-input");
    const passwordInput = getByTestId("password-input");
    fireEvent.change(userInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    act(() => fireEvent.click(getByText("Login")));

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(localStorageMock.getItem("accessToken")).toEqual(accessTokenMock);
    expect(localStorageMock.getItem("refreshToken")).toEqual(refreshTokenMock);
  });
});
