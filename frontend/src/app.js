import React, { useState, useEffect } from "react";
import Post from "./components/post"
import NavbarComponent from "./components/navBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    <Router>
      <div>
        <NavbarComponent />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            {posts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </Route>
        </Switch>
        {/* {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))} */}
      </div>
    </Router>

    // <div>
    //   <NavbarComponent />
    //   {posts.map((post, index) => (<Post post={post} key={index} />))}
    // </div>
  );
}

export default App