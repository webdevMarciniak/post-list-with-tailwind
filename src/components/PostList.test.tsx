import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Post } from "../interfaces/app_interfaces";
import PostList from "./PostList";

jest.mock("./SinglePost", () => ({
  __esModule: true,
  default: function MockedSinglePost(props: Post) {
    return (
      <div>
        <div>{props.title}</div>
        <div>{props.body}</div>
        <div>{props.name}</div>
      </div>
    );
  },
}));

jest.mock("../hooks/useGetAuthorsAndPosts", () => ({
  useGetAuthorsAndPosts: () => ({
    authors: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ],
    posts: [
      {
        id: 1,
        title: "Test Post 1",
        body: "Body of Test Post 1",
        name: "John Doe",
      },
      {
        id: 2,
        title: "Test Post 2",
        body: "Body of Test Post 2",
        name: "Jane Smith",
      },
    ],
    loading: false,
    error: null,
  }),
}));

describe("PostList Component", () => {
  it("renders the PostList component correctly", async () => {
    render(<PostList />);

    await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
    await waitFor(() => expect(screen.queryByText(/^Error:/)).toBeNull());

    expect(screen.getByText("Body of Test Post 1")).toBeInTheDocument();
    expect(screen.getByText("Body of Test Post 2")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
