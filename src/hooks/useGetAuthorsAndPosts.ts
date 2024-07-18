import { useState, useEffect } from "react";
import { Post, Author } from "../interfaces/app_interfaces";

const fetchAuthorsAndPosts = async (fetch: typeof global.fetch) => {
  const [usersResponse, postsResponse] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users"),
    fetch("https://jsonplaceholder.typicode.com/posts"),
  ]);

  if (!usersResponse.ok || !postsResponse.ok) {
    throw new Error("Network error");
  }

  const users: Author[] = await usersResponse.json();
  const posts: Post[] = await postsResponse.json();

  const newList: Post[] = posts.map((post: Post) => {
    const user = users.find((user: Author) => user.id === post.userId);
    return user ? { ...post, name: user.name } : post;
  });

  return { users, newList };
};

export const useGetAuthorsAndPosts = (
  customFetch: typeof global.fetch = global.fetch
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { users, newList } = await fetchAuthorsAndPosts(customFetch);
        setAuthors(users);
        setPosts(newList);
      } catch (error) {
        setError((error as Error).message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customFetch]);

  return { authors, posts, loading, error };
};
