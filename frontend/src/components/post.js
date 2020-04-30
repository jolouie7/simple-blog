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

const Post = (props) => {
  console.log(props)
  const { title, tags, html, createdAt, _id, email } = props.post;

  // ! Redirect or refresh the page for the user when the post gets deleted. Only the writer of that post should be able to delete
  // TODO: Add update, account functionality and email with twilio email
  function deletePost() {
    fetch('http://localhost:5000/posts/' + _id, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((res) => console.log(res));
  }

  return (
    <div style={{ width: "30%", textAlign: "center", margin: "1rem auto" }}>
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <CardTitle>{createdAt}</CardTitle>
          <CardTitle>{tags}</CardTitle>
          <CardText>{html}</CardText>
          <CardText>{email}</CardText>
          {/* <CardText>{_id || "------undefined------"}</CardText> */}
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