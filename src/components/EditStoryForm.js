import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col, Jumbotron } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../store/user/selectors";
import { editSpace } from "../store/user/actions";
import { useHistory } from "react-router-dom";

export default function EditStoryForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(selectUser);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (user.space) {
      const { title, color, backgroundColor, description } = user.space;
      setTitle(title);
      setColor(color);
      setBackgroundColor(backgroundColor);
      setDescription(description);
    }
  }, [user.space]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(
      editSpace(
        user.space.id,
        title,
        description,
        backgroundColor,
        color,
        user.token
      )
    );
  }

  if (!user.token) {
    history.push(`/login`);
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <div>
        <Jumbotron>
          <h1>{user?.space?.title}</h1>
          <h5>{user?.space?.description}</h5>
        </Jumbotron>

        <Container>
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-5">Edit your space</h1>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Background Color</Form.Label>
              <Form.Control
                value={backgroundColor}
                onChange={(event) => setBackgroundColor(event.target.value)}
                type="color"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Text Color</Form.Label>
              <Form.Control
                value={color}
                onChange={(event) => setColor(event.target.value)}
                type="color"
              />
            </Form.Group>

            <Form.Group className="mt-5">
              <Button variant="primary" type="submit" onClick={submitForm}>
                Save changes
              </Button>

              {/* <Alert variant="success">Story created successfully</Alert> */}
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
}
