import React from "react";
import { Jumbotron } from "react-bootstrap";
import { selectUserSpace, selectUser } from "../store/user/selectors";
import Button from "react-bootstrap/Button";
import { deleteStory } from "../store/user/actions";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function MySpace() {
  const userSpace = useSelector(selectUserSpace);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user?.token) {
    history.push(`/login`);
    return <div>loading</div>;
  } else {
    return (
      <div>
        <Jumbotron>
          <h1>{userSpace?.title}</h1>
          <h5>{userSpace?.description}</h5>
        </Jumbotron>
        <div>
          <Link to={"/mySpace/edit"}>
            <Button style={{ margin: "1em" }}>Edit My Space</Button>
          </Link>
          <Link to="/mySpace/newStory">
            <Button>Post a cool story bro</Button>
          </Link>
        </div>
        <div>
          {userSpace?.stories?.map((story) => {
            return (
              <div
                key={story.id}
                style={{
                  border: `${userSpace.backgroundColor} solid 2px`,
                  margin: "1em",
                  padding: "1em",
                }}
              >
                <h6>{story.name}</h6>
                <p>{story.content}</p>
                <Button
                  style={{ marginBottom: "1em", backgroundColor: "red" }}
                  onClick={() => dispatch(deleteStory(story.id))}
                >
                  delete story
                </Button>
                <br />
                <img
                  src={story.imageUrl}
                  alt={story.name}
                  style={{ width: "500px" }}
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
