import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";
import { Col, Jumbotron } from "react-bootstrap";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import { useSelector, useDispatch } from "react-redux";
import { createStory } from "../store/user/actions";
import { selectUser } from "../store/user/selectors";
import { useHistory } from "react-router-dom";

export default function StoryForm() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  function submitForm(event) {
    event.preventDefault();

    dispatch(createStory(name, content, imageUrl, spaceId, user.token));

    setName("");
    setContent("");
    setImageUrl("");
  }
  if (!user.token) {
    history.push(`/login`);
    return <h1>Loading</h1>;
  }
  const spaceId = user.space.id;
  return (
    <div>
      <Jumbotron>
        <h1>{user.space?.title}</h1>
        <h5>{user.space?.description}</h5>
      </Jumbotron>

      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Post a cool story bro</h1>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Name of your story"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              value={content}
              onChange={(event) => setContent(event.target.value)}
              type="text"
              placeholder="tell us what happend"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image url</Form.Label>
            <Form.Control
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              type="text"
              placeholder="A picture says more than 1000 words"
            />
          </Form.Group>

          {imageUrl ? <Image src={imageUrl} rounded fluid /> : <></>}

          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
              Post!
            </Button>

            {/* <Alert variant="success">Story created successfully</Alert> */}
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
