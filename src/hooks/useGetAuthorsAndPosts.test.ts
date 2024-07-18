import { renderHook, waitFor } from "@testing-library/react";
import { useGetAuthorsAndPosts } from "./useGetAuthorsAndPosts";

const mockUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const mockPosts = [
  { id: 1, userId: 1, title: "Test Post 1", body: "Body of Test Post 1" },
  { id: 2, userId: 2, title: "Test Post 2", body: "Body of Test Post 2" },
];

describe("useGetAuthorsAndPosts", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches authors and posts correctly", async () => {
    const mockFetch = jest.fn((url) =>
      Promise.resolve({
        ok: true,
        json: async () => (url.includes("users") ? mockUsers : mockPosts),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useGetAuthorsAndPosts(mockFetch));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.authors).toEqual(mockUsers);
    expect(result.current.posts).toEqual([
      {
        id: 1,
        userId: 1,
        title: "Test Post 1",
        body: "Body of Test Post 1",
        name: "John Doe",
      },
      {
        id: 2,
        userId: 2,
        title: "Test Post 2",
        body: "Body of Test Post 2",
        name: "Jane Smith",
      },
    ]);
  });

  it("handles fetch error", async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useGetAuthorsAndPosts(mockFetch));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).not.toBeNull();
    expect(result.current.authors).toEqual([]);
    expect(result.current.posts).toEqual([]);
  });
});
