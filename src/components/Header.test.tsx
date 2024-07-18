import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

const user = {
  name: "Paulina Marciniak",
  linkedInName: "linkedIn",
  linkedIn: "https://www.linkedin.com/in/webdev-marciniak/",
  imageUrl:
    "https://avatars.githubusercontent.com/u/51324090?s=400&u=3a69a88e30782b226b2450fbc4790e05f0194183&v=4",
};

test("renders the Header component correctly", async () => {
  render(<Header />);

  const profileImage = await screen.findByAltText("Profile");
  expect(profileImage).toBeInTheDocument();

  const userName = screen.getByText(user.name);
  expect(userName).toBeInTheDocument();

  const linkedInLink = screen.getByRole("link", { name: user.linkedInName });
  expect(linkedInLink).toBeInTheDocument();
  expect(linkedInLink).toHaveAttribute("href", user.linkedIn);

  const headerTitle = screen.getByText("Blog posts list");
  expect(headerTitle).toBeInTheDocument();
});
