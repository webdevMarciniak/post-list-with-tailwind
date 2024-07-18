import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SingleAuthor from "./SingleAuthor";

jest.mock("@headlessui/react", () => ({
  ListboxOption: ({ children, ...props }: any) => (
    <div role="option" aria-selected="false" {...props}>
      {children}
    </div>
  ),
}));

jest.mock("@heroicons/react/20/solid", () => ({
  CheckIcon: () => <div>Check Icon</div>,
}));

describe("SingleAuthor Component", () => {
  it("renders the SingleAuthor component correctly", () => {
    const authorName = "John Doe";

    render(<SingleAuthor name={authorName} />);

    expect(screen.getByText(authorName)).toBeInTheDocument();
    expect(screen.getByText("Check Icon")).toBeInTheDocument();
  });

  it("applies the correct classes to the component", () => {
    const authorName = "Jane Doe";

    render(<SingleAuthor name={authorName} />);

    const listboxOption = screen.getByRole("option");
    expect(listboxOption).toHaveClass(
      "cursor-default select-none py-2 pl-3 pr-9 text-cyan-950 data-[focus]:bg-cyan-600 data-[focus]:text-white"
    );
  });
});
