// import React from "react";

// function post(post) {
//   const { title, tags, html, createdAt } = post.post;
//   return (
//     <div className="post">
//       <h1>{title}</h1>
//       {tags.map((tag) => (
//         <h1>{tag}</h1>
//       ))}
//       <h1>{html}</h1>
//       <h1>{createdAt}</h1>
//     </div>
//   );
// }

// export default post;


import React from "react";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

const Post = (post) => {
  console.log(post)
  const { title, tags, html, createdAt, _id } = post.post;

  // ! Fix end of JSON input problem
  // able to delete post but get an error
  function deletePost() {
    fetch('http://localhost:5000/posts/' + _id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => console.log(res));
  }

  return (
    <div style={{ width: "30%", textAlign: "center" }}>
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <CardTitle>{createdAt}</CardTitle>
          <CardTitle>{tags}</CardTitle>
          <CardText>{html}</CardText>
          <CardText>{_id || "------undefined------"}</CardText>
          <Button style={{ margin: "8px" }}>Edit Post</Button>
          <Button style={{ margin: "8px" }} color="danger" onClick={deletePost}>
            Delete Post
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Post;