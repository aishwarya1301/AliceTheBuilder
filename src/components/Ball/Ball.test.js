import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import Ball from "./Ball";

afterEach(cleanup);

test("renders correct tree", () => {
  render(<Ball color="red" />);
  const balls = document.getElementsByClassName("Ball");
  expect(balls.length).toBe(1);
});

test("renders correct background color", () => {
  render(<Ball color="red" />);
  const ball = document.getElementsByClassName("Ball")[0];
  const computedCss = window.getComputedStyle(ball);
  const { backgroundColor } = computedCss;
  expect(backgroundColor).toBe("red");
});

test("trigger onClick callback on click", () => {
  const onClickHandler = jest.fn();
  render(<Ball color="red" onClick={onClickHandler} />);
  const ball = document.getElementsByClassName("Ball")[0];
  fireEvent.click(ball);
  expect(onClickHandler.mock.calls.length).toBe(1);
});
