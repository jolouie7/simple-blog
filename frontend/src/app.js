import React, { useState } from 'react';
import Post from "./components/post"
import NavbarComponent from "./components/navBar";

function App() {
  const [posts, setPosts] = useState([
      {
        title: "First Post",
        createdAt: "12/12/2020",
        tags: ["html", "CSS"],
        html: "Hi There!",
      },
      {
        title: "First Post",
        createdAt: "12/12/2020",
        tags: ["html", "CSS"],
        html: "Hi There!",
      },
    ]
  );

  return (
    <div>
      <NavbarComponent />
      {posts.map((post, index) => (<Post post={post} key={index} />))}
    </div>
  )
}

export default App