import React from "react";
import PostList from "./PostList";
import Header from "./Header";

const App = () => {
  return (
    <div className="max-h-screen">
      <Header />
      <main>
        <PostList />
      </main>
    </div>
  );
};

export default App;
