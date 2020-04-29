import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const CreatePosts = (props) => {
  const [postState, setPost] = useState({
    title: "",
    tags: "",
    html: ""
  });

  const handleChange = (e) => setPost({
    ...postState,
    [e.target.name]: e.target.value
  })

  const createNewPost = () => {
    return fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postState),
    }).then((response) => response.json())
      .then(data => console.log(data))
      .catch(err => {
        console.error("There was an error!", err);
      })
  }

  return (
    <Form style={{ width: "50%", margin: "0 auto" }}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={postState.title}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="tags">Tags</Label>
        <Input
          type="text"
          name="tags"
          id="tags"
          placeholder="Tags"
          value={postState.tag}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="textarea">Text Area</Label>
        <Input
          type="textarea"
          name="html"
          id="textarea"
          value={postState.html}
          onChange={handleChange}
        />
      </FormGroup>
      <Button onClick={createNewPost} value="Submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreatePosts;
