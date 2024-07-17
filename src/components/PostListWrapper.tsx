import React, { FC } from "react";
import PostList from "./PostList";
import Header from "./Header";

const PostListWrapper: FC = () => {
  return (
    <div className="max-h-screen">
      <Header />
      <main>
        <PostList />
      </main>
    </div>
  );
};

export default PostListWrapper;
