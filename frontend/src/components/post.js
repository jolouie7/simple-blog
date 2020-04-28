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
  const { title, tags, html, createdAt } = post.post;
  return (
    <div style={{width:"30%", textAlign:"center"}}>
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <CardTitle>{createdAt}</CardTitle>
          <CardTitle>{tags}</CardTitle>
          <CardText>
            {html}
          </CardText>
          <Button>Go somewhere</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Post;