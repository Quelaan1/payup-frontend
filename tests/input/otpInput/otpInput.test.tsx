import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OTPInput from "../../../components/common/otpInput/otpInput";

describe("OTPInput", () => {
  it("renders the correct number of input fields", () => {
    const setValueMock = jest.fn();
    const { getAllByTestId } = render(
      <OTPInput digits={4} value="" setValue={setValueMock} error="" />,
    );

    const inputs = getAllByTestId(/otp-input-/);
    expect(inputs).toHaveLength(4);
  });

  it("updates the value on key press", () => {
    const setValueMock = jest.fn();
    const { getByTestId } = render(
      <OTPInput digits={4} value="" setValue={setValueMock} error="" />,
    );

    const thirdInput = getByTestId("otp-input-0");

    fireEvent(thirdInput, "onKeyPress", { nativeEvent: { key: "4" } });

    expect(setValueMock).toHaveBeenCalledWith("4");
  });

  it("handles backspace correctly", () => {
    const setValueMock = jest.fn();
    const { getByTestId } = render(
      <OTPInput digits={4} value="123" setValue={setValueMock} error="" />,
    );

    const thirdInput = getByTestId("otp-input-2");
    fireEvent(thirdInput, "onKeyPress", { nativeEvent: { key: "Backspace" } });

    // Expect the setValue to be called with the previous value minus the last character.
    expect(setValueMock).toHaveBeenCalledWith("12");
  });

  it("ignores non-numeric input", () => {
    const setValueMock = jest.fn();
    const { getByTestId } = render(
      <OTPInput digits={4} value="" setValue={setValueMock} error="" />,
    );

    const firstInput = getByTestId("otp-input-0");
    fireEvent(firstInput, "onKeyPress", { nativeEvent: { key: "a" } });

    // setValue should not be called since 'a' is not a number.
    expect(setValueMock).not.toHaveBeenCalled();
  });
});
