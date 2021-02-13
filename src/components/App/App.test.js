import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders solve button", () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/solve/i);
  expect(buttonElement).toBeInTheDocument();
});
