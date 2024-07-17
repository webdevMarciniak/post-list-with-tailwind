import { useState, useEffect } from "react";
import axios from "axios";
import { Post, Author } from "../interfaces/app_interfaces";

export const useGetAuthorsAndPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const endpoints: string[] = [
      "https://jsonplaceholder.typicode.com/users",
      "https://jsonplaceholder.typicode.com/posts",
    ];

    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread(({ data: users }, { data: posts }) => {
        const newList: Post[] = [];
        posts.forEach((post: Post) => {
          users.forEach((user: Author) => {
            if (post.userId === user.id) {
              const obj = {
                userId: post.userId,
                id: post.id,
                title: post.title,
                body: post.body,
                name: user.name,
              };
              obj && newList.push(obj);
            }
          });
        });

        setAuthors(users);
        setPosts(newList);
      }),
      (error) => {
        console.log(error.message);
      }
    );
  }, []);

  return [{ authors: authors }, { posts: posts }];
};
