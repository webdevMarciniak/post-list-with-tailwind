import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SinglePost from "./SinglePost";

describe("SinglePost component", () => {
  const post = {
    title: "Test Post",
    body: "This is the body of the test post",
    name: "John Doe",
  };

  test("renders with closed DisclosurePanel by default", () => {
    render(<SinglePost {...post} />);

    expect(screen.queryByText(post.body)).not.toBeInTheDocument();
  });

  test("toggles the DisclosurePanel on button click", () => {
    render(<SinglePost {...post} />);

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(post.body)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByText(post.body)).not.toBeInTheDocument();
  });
});
