import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

jest.mock("./Header", () => () => <div>Header</div>);
jest.mock("./PostList", () => () => <div>PostList</div>);

test("renders Header and PostList components", () => {
  render(<App />);

  expect(screen.getByText("Header")).toBeInTheDocument();
  expect(screen.getByText("PostList")).toBeInTheDocument();
});
