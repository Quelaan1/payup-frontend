import { render, screen, fireEvent } from "@testing-library/react-native";
import CommonButton from "../../../components/common/buttons/commonButton/commonButton";

test("Renders button with props and clicks it", () => {
  const Text: string = "Test";
  const mockHandlePress: jest.Mock<any, any, any> = jest.fn();

  render(<CommonButton onPress={mockHandlePress} text={Text} />);

  const button = screen.getByText(Text);

  expect(button).toBeDefined();

  expect(button).toHaveTextContent("Test");

  fireEvent.press(button);

  expect(mockHandlePress).toHaveBeenCalledTimes(1);
});

test("Renders button styles with type", () => {
  const buttonOneText: string = "One";
  const buttonTwoText: string = "Two";
  const buttonThreeText: string = "Three";

  const mockHandlePress: jest.Mock<any, any, any> = jest.fn();

  render(<CommonButton onPress={mockHandlePress} text={buttonOneText} />);
  const buttonOne = screen.getByText(buttonOneText);
  expect(buttonOne).toBeDefined();
  expect(buttonOne).toHaveStyle({ color: "black" });

  render(
    <CommonButton
      onPress={mockHandlePress}
      text={buttonTwoText}
      type={"Primary"}
    />,
  );
  const buttonTwo = screen.getByText(buttonTwoText);
  expect(buttonTwo).toBeDefined();
  expect(buttonTwo).toHaveStyle({ color: "black" });

  render(
    <CommonButton
      onPress={mockHandlePress}
      text={buttonThreeText}
      type={"Secondary"}
    />,
  );
  const buttonThree = screen.getByText(buttonThreeText);
  expect(buttonThree).toBeDefined();
  expect(buttonThree).toHaveStyle({ color: "white" });
});
