import React, { useState, useEffect } from "react";
import Post from "./components/post"
import NavbarComponent from "./components/navBar";

function App() {
  const [posts, setPosts] = useState([]);
  // TODO: Implement laoding when refactor
  // const [loading, setLoading] = React.useState("false");

  // ! ordering of the return may not be right.
  // * Is there a way to return without the function call?
  useEffect(() => {
    async function fetchPostList() {
      try {
        // setLoading("true");
        const response = await fetch("http://localhost:5000/posts");
        const json = await response.json()
        setPosts(json.map(post => {
          return post
        }))
      } catch (err) {
        console.error(err)
        // setLoading("null");
      }
    };
    fetchPostList();
    return [posts];
  }, []);


  return (
    <div>
      <NavbarComponent />
      {posts.map((post, index) => (<Post post={post} key={index} />))}
    </div>
  )
}

export default App