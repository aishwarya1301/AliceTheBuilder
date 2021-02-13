import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import Glass from "../../Solver/Glass";
import Configurator from "./Configurator";

afterEach(cleanup);

test("renders correct amount of balls", () => {
  const glasses = [new Glass(), new Glass()];
  const colors = ["red", "blue"];
  render(<Configurator glasses={glasses} colors={colors} activeGlass={0} />);
  const balls = document.getElementsByClassName("Ball");
  expect(balls.length).toBe(colors.length);
});

test("renders an active tube", () => {
  const glasses = [new Glass(), new Glass()];
  const colors = ["red", "blue"];
  render(<Configurator glasses={glasses} colors={colors} activeGlass={0} />);
  const activeTubes = document.getElementsByClassName("active");
  expect(activeTubes.length).toBe(1);
});

test("trigger onTestTubeClick callback on test tube click", () => {
  const onClickHandler = jest.fn();
  const glasses = [new Glass(), new Glass()];
  const colors = ["red", "blue"];
  const activeGlass = 1;
  render(
    <Configurator
      glasses={glasses}
      colors={colors}
      activeGlass={activeGlass}
      onTestTubeClick={onClickHandler}
    />
  );
  const testTube = document.getElementsByClassName("active")[0];
  fireEvent.click(testTube);
  expect(onClickHandler).toHaveBeenCalledTimes(1);
  expect(onClickHandler).toHaveBeenCalledWith(activeGlass);
});

test("trigger onColorClick callback on ball click", () => {
  const onClickHandler = jest.fn();
  const glasses = [new Glass(), new Glass()];
  const colors = ["red"];
  render(
    <Configurator
      glasses={glasses}
      colors={colors}
      activeGlass={0}
      onColorClick={onClickHandler}
    />
  );
  const ball = document.getElementsByClassName("Ball")[0];
  fireEvent.click(ball);
  expect(onClickHandler).toHaveBeenCalledTimes(1);
  expect(onClickHandler).toHaveBeenCalledWith(colors[0]);
});

function expectRendersButtonWithText(textRegEx) {
  const glasses = [new Glass(), new Glass()];
  const colors = ["red", "blue"];
  const { getByText } = render(
    <Configurator glasses={glasses} colors={colors} activeGlass={0} />
  );
  const buttonElement = getByText(textRegEx);
  expect(buttonElement).toBeInTheDocument();
}

const BUTTON_TEXT_CLEAR = /clear/i;
const BUTTON_TEXT_ADD = /add/i;
const BUTTON_TEXT_REMOVE = /remove/i;
const BUTTON_TEXT_SOLVE = /solve/i;

test("renders clear button", () => {
  expectRendersButtonWithText(BUTTON_TEXT_CLEAR);
});

test("renders add button", () => {
  expectRendersButtonWithText(BUTTON_TEXT_ADD);
});

test("renders remove button", () => {
  expectRendersButtonWithText(BUTTON_TEXT_REMOVE);
});

test("renders solve button", () => {
  expectRendersButtonWithText(BUTTON_TEXT_SOLVE);
});

function expectButtonOnClickToBeTriggered(textRegEx, callbackName) {
  const onClickHandler = jest.fn();
  const glasses = [new Glass(), new Glass()];
  const colors = ["red", "blue"];
  const extraProps = { [callbackName]: onClickHandler };
  const { getByText } = render(
    <Configurator
      glasses={glasses}
      colors={colors}
      activeGlass={0}
      onClear={onClickHandler}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...extraProps}
    />
  );
  const buttonElement = getByText(textRegEx);
  fireEvent.click(buttonElement);
  expect(onClickHandler).toHaveBeenCalledTimes(1);
}

test("trigger onClear callback on clear button click", () => {
  expectButtonOnClickToBeTriggered(BUTTON_TEXT_CLEAR, "onClear");
});

test("trigger onAdd callback on add button click", () => {
  expectButtonOnClickToBeTriggered(BUTTON_TEXT_ADD, "onAdd");
});

test("trigger onRemove callback on remove button click", () => {
  expectButtonOnClickToBeTriggered(BUTTON_TEXT_REMOVE, "onRemove");
});

test("trigger onSolve callback on solve button click", () => {
  expectButtonOnClickToBeTriggered(BUTTON_TEXT_SOLVE, "onSolve");
});
