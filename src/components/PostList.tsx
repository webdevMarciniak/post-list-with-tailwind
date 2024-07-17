import React, { FC, useState, useEffect, useMemo } from "react";
import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useGetAuthorsAndPosts } from "../hooks/useGetAuthorsAndPosts";
import { Post, Author } from "../interfaces/app_interfaces";
import SingleAuthor from "./SingleAuthor";
import SinglePost from "./SinglePost";

const PostList: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const data = useGetAuthorsAndPosts();

  useEffect(() => {
    const createNewTables = () => {
      const postsArr = data[1].posts ? data[1].posts : [];
      const authorArr = data[0].authors ? data[0].authors : [];

      setAuthors(authorArr);
      setPosts(postsArr);
    };

    createNewTables();
  }, [data, posts, authors]);

  const onDisplayList = useMemo(() => {
    if (selectedAuthor && posts) {
      return posts.filter((item) => item.name === selectedAuthor);
    } else return posts;
  }, [selectedAuthor, posts]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-4">
      <div className="bg-white py-2 mt-2 sm:pb-64 rounded-xl sm:border h-[75vh]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto sm:px-6 sm:py-2">
            <Listbox value={selectedAuthor} onChange={setSelectedAuthor}>
              <ListboxButton className="relative w-full sm:w-64 mt-0 lg:mt-2 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-cyan-950 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {selectedAuthor ? selectedAuthor : "Select author"}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </span>
              </ListboxButton>
              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-64 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {authors &&
                  authors.map(({ id, name }: Author) => (
                    <SingleAuthor key={id} name={name} />
                  ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </div>
        <div className="w-full pt-4 px-4 h-[65vh] overflow-auto scrollbar-thin scrollbar-thumb-cyan-950/30 scrollbar-track-cyan-950/10">
          {onDisplayList &&
            onDisplayList.map(({ id, title, body, name }) => (
              <SinglePost key={id} title={title} body={body} name={name} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
