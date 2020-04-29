import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

const CreatePosts = (props) => {
  return (
    <Form style={{width:"50%", marginLeft:"25%"}}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
        />
      </FormGroup>
      <FormGroup>
        <Label for="tags">Tags</Label>
        <Input
          type="text"
          name="tags"
          id="tags"
          placeholder="Tags"
        />
      </FormGroup>
      <FormGroup>
        <Label for="textarea">Text Area</Label>
        <Input type="textarea" name="textarea" id="textarea" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
};

export default CreatePosts;
