import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import Glass from "../../Solver/Glass";
import Move from "../../Solver/Move";
import Solution from "./Solution";

afterEach(cleanup);

function renderSolution(propsToOverride = {}) {
  const defaultProps = {
    glasses: [new Glass(), new Glass()],
    moves: [new Move(0, 1), new Move(0, 1)],
    moveIndex: 0,
    onNext: () => {},
    onPrevious: () => {},
    onRestart: () => {},
  };
  const props = { ...defaultProps, ...propsToOverride };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return render(<Solution {...props} />);
}

test("renders correct amount of test tubes", () => {
  const glasses = [new Glass(), new Glass()];
  renderSolution({ glasses });
  const testTubes = document.getElementsByClassName("TestTube");
  expect(testTubes.length).toBe(glasses.length);
});

test("renders move x out of y", () => {
  const glasses = [new Glass(), new Glass()];
  const moves = [new Move(0, 1), new Move(0, 1)];
  const moveIndex = 1;
  const { getByText } = renderSolution({ glasses, moves, moveIndex });
  expect(getByText("1 / 2")).toBeInTheDocument();
});

function expectRendersButtonWithText(textRegEx) {
  const { getByText } = renderSolution();
  const buttonElement = getByText(textRegEx);
  expect(buttonElement).toBeInTheDocument();
}

const BUTTON_TEXT_NEXT = /next/i;
const BUTTON_TEXT_PREVIOUS = /previous/i;
const BUTTON_TEXT_RESTART = /restart/i;

test("renders next button", () => {
  expectRendersButtonWithText(BUTTON_TEXT_NEXT);
});

test("renders previous button", () => {
  expectRendersButtonWithText(BUTTON_TEXT_PREVIOUS);
});

test("renders restart button", () => {
  expectRendersButtonWithText(BUTTON_TEXT_RESTART);
});

function expectButtonOnClickToBeTriggered(textRegEx, callbackName) {
  const onClickHandler = jest.fn();
  const { getByText } = renderSolution({
    moves: [new Move(0, 1), new Move(0, 1)],
    moveIndex: 1,
    [callbackName]: onClickHandler,
  });
  const buttonElement = getByText(textRegEx);
  fireEvent.click(buttonElement);
  expect(onClickHandler).toHaveBeenCalledTimes(1);
}

test("trigger onNext callback on next button click", () => {
  expectButtonOnClickToBeTriggered(BUTTON_TEXT_NEXT, "onNext");
});

test("trigger onPrevious callback on previous button click", () => {
  expectButtonOnClickToBeTriggered(BUTTON_TEXT_PREVIOUS, "onPrevious");
});

test("trigger onRestart callback on restart button click", () => {
  expectButtonOnClickToBeTriggered(BUTTON_TEXT_RESTART, "onRestart");
});

test("dont trigger onNext callback on next button click and no moves left", () => {
  const onClickHandler = jest.fn();
  const { getByText } = renderSolution({
    moves: [new Move(0, 1), new Move(0, 1)],
    moveIndex: 2,
    onNext: onClickHandler,
  });
  const buttonElement = getByText(BUTTON_TEXT_NEXT);
  fireEvent.click(buttonElement);
  expect(onClickHandler).toHaveBeenCalledTimes(0);
});

test("dont trigger onPrevious callback on previous button click when no previous moves exists", () => {
  const onClickHandler = jest.fn();
  const { getByText } = renderSolution({
    moves: [new Move(0, 1), new Move(0, 1)],
    moveIndex: 0,
    onPrevious: onClickHandler,
  });
  const buttonElement = getByText(BUTTON_TEXT_PREVIOUS);
  fireEvent.click(buttonElement);
  expect(onClickHandler).toHaveBeenCalledTimes(0);
});
