import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import TestTube from "./TestTube";
import Glass from "../../Solver/Glass";

afterEach(cleanup);

test("renders correct amount of balls", () => {
  const glass = new Glass();
  glass.pushArrayOfBalls(["red", "blue"]);
  render(<TestTube glass={glass} />);
  const balls = document.getElementsByClassName("Ball");
  expect(balls.length).toBe(2);
});

test("trigger onClick callback on click", () => {
  const onClickHandler = jest.fn();
  const glass = new Glass();
  render(<TestTube glass={glass} onClick={onClickHandler} />);
  const testTube = document.getElementsByClassName("TestTube")[0];
  fireEvent.click(testTube);
  expect(onClickHandler.mock.calls.length).toBe(1);
});

test("attach active class when active", () => {
  const glass = new Glass();
  render(<TestTube glass={glass} active />);
  const activeClasses = document.getElementsByClassName("active");
  expect(activeClasses.length).toBe(1);
});

test("dont be active by default", () => {
  const glass = new Glass();
  render(<TestTube glass={glass} />);
  const activeClasses = document.getElementsByClassName("active");
  expect(activeClasses.length).toBe(0);
});
