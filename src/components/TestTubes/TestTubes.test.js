import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import TestTubes from "./TestTubes";
import Glass from "../../Solver/Glass";

afterEach(cleanup);

test("renders correct amount of test tubes", () => {
  const glasses = [new Glass(), new Glass()];
  render(<TestTubes glasses={glasses} />);
  const testTubes = document.getElementsByClassName("TestTube");
  expect(testTubes.length).toBe(glasses.length);
});

test("no active glasses by default", () => {
  const glasses = [new Glass(), new Glass()];
  render(<TestTubes glasses={glasses} />);
  const activeClasses = document.getElementsByClassName("active");
  expect(activeClasses.length).toBe(0);
});

test("marks a single tube as active when provided valid activeGlass", () => {
  const glasses = [new Glass(), new Glass()];
  render(<TestTubes glasses={glasses} activeGlass={0} />);
  const activeClasses = document.getElementsByClassName("active");
  expect(activeClasses.length).toBe(1);
});

test("trigger onClick callback on test tube click", () => {
  const onClickHandler = jest.fn();
  const glasses = [new Glass(), new Glass()];
  const activeGlass = 1;
  render(
    <TestTubes
      glasses={glasses}
      activeGlass={activeGlass}
      onTestTubeClick={onClickHandler}
    />
  );
  const testTube = document.getElementsByClassName("active")[0];
  fireEvent.click(testTube);
  expect(onClickHandler).toHaveBeenCalledTimes(1);
  expect(onClickHandler).toHaveBeenCalledWith(activeGlass);
});
